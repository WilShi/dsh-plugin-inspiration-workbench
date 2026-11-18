import test from 'node:test';
import assert from 'node:assert/strict';

import {
  TopologyPlanError,
  computeLayeredLayout,
  ensureTopologyDependencies,
  createFallbackTopology,
  createLocalTaskDraft,
  normalizeTopologyPlan,
  parseAIResponse,
  validateTopologyPlan,
} from '../src/client/task-intelligence.js';

const ticks = String.fromCharCode(96).repeat(3);

function session(id, dependsOn = []) {
  return { id, kind: 'session', title: id, prompt: 'work on ' + id, dependsOn };
}

function note(id, dependsOn = []) {
  return { id, kind: 'note', title: id, note: 'results', dependsOn };
}

function basicPlan() {
  return {
    title: '发布插件',
    goal: '完成并验证发布',
    nodes: [session('research'), session('build', ['research']), note('result', ['build'])],
  };
}

function errorCodes(plan) {
  return validateTopologyPlan(plan).errors.map((error) => error.code);
}

test('parseAIResponse parses raw JSON with a BOM', () => {
  const value = { title: '计划', nodes: [session('a')] };
  assert.deepEqual(parseAIResponse('\uFEFF' + JSON.stringify(value)), value);
});

test('parseAIResponse parses fenced JSON surrounded by prose', () => {
  const value = {
    title: '含 braces 的文本',
    nodes: [{ id: 'a', kind: 'session', prompt: 'output { "valid": true }', dependsOn: [] }],
  };
  const response = '这是计划：\n' + ticks + 'json\n' + JSON.stringify(value) + '\n' + ticks + '\n请确认。';
  assert.deepEqual(parseAIResponse(response), value);
});

test('parseAIResponse handles same-line fences and embedded JSON', () => {
  assert.deepEqual(parseAIResponse(ticks + '{"ok":true}' + ticks), { ok: true });
  assert.deepEqual(parseAIResponse('前缀 { "nodes": [], "text": "]" } 后缀'), { nodes: [], text: ']' });
});

test('parseAIResponse rejects empty, non-string, and malformed responses', () => {
  assert.throws(() => parseAIResponse(''), /empty/);
  assert.throws(() => parseAIResponse(null), /string/);
  assert.throws(() => parseAIResponse(ticks + 'json\n{not json}\n' + ticks), /valid JSON/);
});

test('normalizeTopologyPlan canonicalizes wrappers, aliases, and duplicate edges', () => {
  const normalized = normalizeTopologyPlan({
    plan: {
      name: '规范化',
      objective: '测试',
      nodes: [
        { key: 'a', type: 'session', name: '研究', instruction: '调研' },
        { id: 'b', type: 'note', content: '结论', dependsOn: 'a' },
      ],
      edges: [{ source: 'b', target: 'a' }, { from: 'b', to: 'a' }],
    },
  });
  assert.equal(normalized.title, '规范化');
  assert.equal(normalized.goal, '测试');
  assert.equal(normalized.nodes[0].prompt, '调研');
  assert.equal(normalized.nodes[1].note, '结论');
  assert.deepEqual(normalized.nodes[1].dependsOn, ['a']);
  assert.deepEqual(normalized.edges, [{ from: 'b', to: 'a' }]);
  assert.equal(validateTopologyPlan(normalized).valid, true);
});

test('normalizeTopologyPlan accepts Markdown directly and rejects malformed shapes', () => {
  const plan = basicPlan();
  const normalized = normalizeTopologyPlan(ticks + 'json\n' + JSON.stringify(plan) + '\n' + ticks);
  assert.equal(normalized.nodes.length, 3);
  assert.throws(() => normalizeTopologyPlan({ nodes: 'not-an-array' }), /nodes array/);
  assert.equal(validateTopologyPlan(null).valid, false);
  assert.deepEqual(errorCodes(null), ['INVALID_PLAN']);
});

test('normalization and layout do not mutate their input', () => {
  const plan = basicPlan();
  const snapshot = structuredClone(plan);
  normalizeTopologyPlan(plan);
  computeLayeredLayout(plan);
  assert.deepEqual(plan, snapshot);
});

test('validateTopologyPlan accepts one through six well-formed nodes', () => {
  for (let count = 1; count <= 12; count += 1) {
    const nodes = Array.from({ length: count }, (_, index) => session('s' + index, index ? ['s' + (index - 1)] : []));
    const result = validateTopologyPlan({ nodes });
    assert.equal(result.valid, true, JSON.stringify(result.errors));
    assert.deepEqual(result.errors, []);
  }
});

test('validateTopologyPlan rejects zero and thirteen nodes', () => {
  assert.ok(errorCodes({ nodes: [] }).includes('NODE_COUNT'));
  assert.ok(errorCodes({ nodes: [] }).includes('NO_SESSION'));
  const nodes = Array.from({ length: 13 }, (_, index) => session('s' + index));
  assert.ok(errorCodes({ nodes }).includes('NODE_COUNT'));
});


test('ensureTopologyDependencies connects independent sessions to the final integrator', () => {
  const plan = ensureTopologyDependencies({
    nodes: [session('a'), session('b'), session('integrate'), note('result', ['integrate'])],
  });
  assert.deepEqual(plan.nodes.find((node) => node.id === 'a').dependsOn, []);
  assert.deepEqual(plan.nodes.find((node) => node.id === 'b').dependsOn, []);
  assert.deepEqual(plan.nodes.find((node) => node.id === 'integrate').dependsOn, ['a', 'b']);
  assert.deepEqual(plan.nodes.find((node) => node.id === 'result').dependsOn, ['integrate']);
  assert.equal(validateTopologyPlan(plan).valid, true);
});

test('ensureTopologyDependencies chooses the last session when no sink is named', () => {
  const plan = ensureTopologyDependencies({ nodes: [session('a'), session('b'), note('result')] });
  assert.deepEqual(plan.nodes.find((node) => node.id === 'b').dependsOn, ['a']);
  assert.deepEqual(plan.nodes.find((node) => node.id === 'result').dependsOn, ['b']);
  assert.equal(validateTopologyPlan(plan).valid, true);
});

test('ensureTopologyDependencies preserves explicit dependencies', () => {
  const original = { nodes: [session('a'), session('b', ['a']), note('result', ['b'])] };
  const plan = ensureTopologyDependencies(original);
  assert.deepEqual(plan.nodes.find((node) => node.id === 'b').dependsOn, ['a']);
});

test('validateTopologyPlan rejects missing and self dependencies', () => {
  assert.ok(errorCodes({ nodes: [session('a', ['missing'])] }).includes('UNKNOWN_DEPENDENCY'));
  const codes = errorCodes({ nodes: [session('a', ['a'])] });
  assert.ok(codes.includes('SELF_DEPENDENCY'));
  assert.ok(codes.includes('CYCLE'));
});

test('validateTopologyPlan rejects direct and indirect cycles', () => {
  const nodes = [session('a', ['c']), session('b', ['a']), session('c', ['b'])];
  assert.ok(errorCodes({ nodes }).includes('CYCLE'));
});

test('validateTopologyPlan requires notes to be sinks', () => {
  const codes = errorCodes({ nodes: [note('n'), session('s', ['n'])] });
  assert.ok(codes.includes('NOTE_NOT_SINK'));
});

test('validateTopologyPlan requires at least one session', () => {
  assert.ok(errorCodes({ nodes: [note('n')] }).includes('NO_SESSION'));
});

test('validateTopologyPlan rejects duplicate ids and unknown node kinds', () => {
  assert.ok(errorCodes({ nodes: [session('a'), session('a')] }).includes('DUPLICATE_NODE_ID'));
  const codes = errorCodes({ nodes: [{ id: 'x', kind: 'robot', dependsOn: [] }] });
  assert.ok(codes.includes('INVALID_NODE_KIND'));
  assert.ok(codes.includes('NO_SESSION'));
});

test('validateTopologyPlan reports unknown explicit edge endpoints', () => {
  const codes = errorCodes({ nodes: [session('a')], edges: [{ from: 'ghost', to: 'also-ghost' }] });
  assert.ok(codes.includes('UNKNOWN_EDGE_SOURCE'));
  assert.ok(codes.includes('UNKNOWN_DEPENDENCY'));
});

test('createLocalTaskDraft maps cards, sessions, and existing pipelines deterministically', () => {
  const input = {
    goal: '发布插件',
    cards: [
      {
        id: 'c1',
        sessionId: 's1',
        title: '调研',
        workspace: '/repo',
        pipeline: { targets: [{ kind: 'session', id: 's2' }, { kind: 'note', id: 'n1' }] },
      },
      { id: 'c2', sessionId: 's2', title: '实现' },
      { id: 'n1', kind: 'note', title: '结论', note: '已有内容' },
    ],
    sessions: [{ id: 's3', title: '验证' }],
  };
  const snapshot = structuredClone(input);
  const draft = createLocalTaskDraft(input);
  assert.deepEqual(createLocalTaskDraft(input), draft);
  assert.deepEqual(input, snapshot);
  assert.equal(validateTopologyPlan(draft).valid, true);
  assert.deepEqual(draft.nodes.map((node) => node.id), ['session-1', 'session-2', 'session-3', 'note-1']);
  assert.equal(draft.nodes[0].sessionId, 's1');
  assert.equal(draft.nodes[0].workspace, '/repo');
  assert.equal(draft.nodes[0].prompt, '发布插件');
  assert.deepEqual(draft.nodes[1].dependsOn, ['session-1']);
  assert.deepEqual(draft.nodes[3].dependsOn, ['session-1']);
  assert.equal(draft.nodes[3].note, '已有内容');
});

test('createLocalTaskDraft supports legacy pipeline targets', () => {
  const draft = createLocalTaskDraft({
    cards: [
      { sessionId: 'a', pipeline: { targetSessionId: 'b' } },
      { sessionId: 'b' },
    ],
  });
  assert.deepEqual(draft.nodes[1].dependsOn, ['session-1']);
  assert.equal(validateTopologyPlan(draft).valid, true);
});

test('createLocalTaskDraft replaces cyclic imported edges with a linear backbone', () => {
  const draft = createLocalTaskDraft({
    cards: [
      { sessionId: 'a', pipeline: { targets: [{ id: 'b' }] } },
      { sessionId: 'b', pipeline: { targets: [{ id: 'a' }] } },
      { id: 'n', kind: 'note' },
    ],
  });
  assert.equal(validateTopologyPlan(draft).valid, true);
  assert.deepEqual(draft.nodes[0].dependsOn, []);
  assert.deepEqual(draft.nodes[1].dependsOn, ['session-1']);
  assert.deepEqual(draft.nodes[2].dependsOn, ['session-2']);
});

test('createLocalTaskDraft caps drafts at twelve unique sessions', () => {
  const sessions = Array.from({ length: 14 }, (_, index) => ({ id: 's' + index }));
  const draft = createLocalTaskDraft({ sessions: [...sessions, sessions[0]] });
  assert.equal(draft.nodes.length, 12);
  assert.equal(new Set(draft.nodes.map((node) => node.sessionId)).size, 12);
  assert.equal(validateTopologyPlan(draft).valid, true);
});

test('createLocalTaskDraft uses the basic fallback without a usable session', () => {
  const draft = createLocalTaskDraft({ goal: '整理结论', cards: [{ id: 'n', kind: 'note' }] });
  assert.equal(validateTopologyPlan(draft).valid, true);
  assert.deepEqual(draft.nodes.map((node) => node.kind), ['session', 'note']);
  assert.deepEqual(draft.nodes[1].dependsOn, ['session-1']);
  assert.equal(draft.nodes[0].prompt, '整理结论');
});

test('createFallbackTopology is valid and preserves an existing session binding', () => {
  const fallback = createFallbackTopology({
    goal: '修复问题',
    sessions: [{ id: 'existing', title: '调试', workspace: '/project' }],
  });
  assert.equal(validateTopologyPlan(fallback).valid, true);
  assert.equal(fallback.nodes[0].sessionId, 'existing');
  assert.equal(fallback.nodes[0].workspace, '/project');
  assert.equal(fallback.nodes[0].prompt, '修复问题');
  assert.deepEqual(fallback.edges, [{ from: 'note-1', to: 'session-1' }]);
});

test('computeLayeredLayout calculates horizontal layers and coordinates', () => {
  const layout = computeLayeredLayout(basicPlan());
  assert.deepEqual(layout.layers, [['research'], ['build'], ['result']]);
  assert.deepEqual(layout.nodes.map(({ id, x, y }) => ({ id, x, y })), [
    { id: 'research', x: 40, y: 40 },
    { id: 'build', x: 440, y: 40 },
    { id: 'result', x: 840, y: 40 },
  ]);
  assert.equal(layout.width, 1200);
  assert.equal(layout.height, 280);
});

test('computeLayeredLayout uses the longest dependency path for fan-in', () => {
  const plan = {
    nodes: [session('a'), session('b'), session('c', ['a']), session('d', ['b', 'c'])],
  };
  const layout = computeLayeredLayout(plan);
  assert.deepEqual(layout.layers, [['a', 'b'], ['c'], ['d']]);
  assert.equal(layout.nodes.find((node) => node.id === 'd').layer, 2);
});

test('computeLayeredLayout supports vertical output and custom spacing', () => {
  const layout = computeLayeredLayout(basicPlan(), {
    direction: 'vertical',
    originX: 0,
    originY: 0,
    nodeWidth: 100,
    nodeHeight: 50,
    layerGap: 20,
    nodeGap: 10,
  });
  assert.deepEqual(layout.nodes.map(({ id, x, y }) => ({ id, x, y })), [
    { id: 'research', x: 0, y: 0 },
    { id: 'build', x: 0, y: 70 },
    { id: 'result', x: 0, y: 140 },
  ]);
  assert.equal(layout.width, 100);
  assert.equal(layout.height, 190);
});

test('computeLayeredLayout rejects invalid plans and options', () => {
  assert.throws(
    () => computeLayeredLayout({ nodes: [session('a', ['a'])] }),
    (error) => error instanceof TopologyPlanError && error.errors.some((item) => item.code === 'CYCLE'),
  );
  assert.throws(() => computeLayeredLayout(basicPlan(), { direction: 'diagonal' }), /direction/);
  assert.throws(() => computeLayeredLayout(basicPlan(), { nodeWidth: 0 }), /greater than zero/);
});
