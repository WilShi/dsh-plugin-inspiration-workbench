/**
 * Deterministic task-draft and topology helpers.
 *
 * This module deliberately has no model, host, or DOM dependency. AI output is
 * treated as untrusted data: parse it, normalize it, then validate it before
 * using the plan or computing a layout.
 */

const MAX_NODES = 6;
const DEFAULT_TITLE = '任务计划';

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function cleanText(value, fallback = '') {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'bigint') return String(value);
  return fallback;
}

function unique(values) {
  return [...new Set(values)];
}

function shortTitle(value, fallback) {
  const firstLine = cleanText(value).split(/\r?\n/, 1)[0];
  if (!firstLine) return fallback;
  return [...firstLine].slice(0, 60).join('');
}

/** Parse the first complete JSON value at the current cursor, if any. */
function scanJson(source) {
  for (let start = 0; start < source.length; start += 1) {
    if (source[start] !== '{' && source[start] !== '[') continue;
    const stack = [];
    let quoted = false;
    let escaped = false;

    for (let cursor = start; cursor < source.length; cursor += 1) {
      const char = source[cursor];
      if (quoted) {
        if (escaped) escaped = false;
        else if (char === '\\') escaped = true;
        else if (char === '"') quoted = false;
        continue;
      }
      if (char === '"') {
        quoted = true;
        continue;
      }
      if (char === '{' || char === '[') {
        stack.push(char === '{' ? '}' : ']');
        continue;
      }
      if (char !== '}' && char !== ']') continue;
      if (stack.pop() !== char) break;
      if (stack.length) continue;

      const candidate = source.slice(start, cursor + 1);
      try {
        return { found: true, value: JSON.parse(candidate) };
      } catch {
        // A prose brace or a malformed outer object need not hide a later,
        // well-formed JSON value. Continue at the next possible start.
        break;
      }
    }
  }
  return { found: false, value: undefined };
}

/**
 * Parse raw JSON, fenced Markdown JSON, or JSON embedded in explanatory prose.
 * Returns the parsed value and throws a descriptive error when none is valid.
 */
export function parseAIResponse(response) {
  if (typeof response !== 'string') {
    throw new TypeError('AI response must be a string');
  }
  const source = response.replace(/^\uFEFF/, '').trim();
  if (!source) throw new SyntaxError('AI response is empty');

  try {
    return JSON.parse(source);
  } catch {
    // Try fenced blocks and embedded JSON below.
  }

  // Accept json, unlabelled, and same-line fences. For another info string,
  // retain it as content so a same-line JSON object is not accidentally lost.
  const ticks = String.fromCharCode(96).repeat(3);
  const fence = new RegExp(ticks + '([^\r\n]*)\r?\n?([\s\S]*?)' + ticks, 'g');
  for (let match = fence.exec(source); match; match = fence.exec(source)) {
    const info = match[1].trim();
    const block = /^(?:json)?$/i.test(info) ? match[2] : match[1] + '\n' + match[2];
    try {
      return JSON.parse(block.trim());
    } catch {
      const scanned = scanJson(block);
      if (scanned.found) return scanned.value;
    }
  }

  const scanned = scanJson(source);
  if (scanned.found) return scanned.value;
  throw new SyntaxError('AI response does not contain valid JSON');
}

function rawDependencies(node) {
  const value = node.dependsOn ?? node.dependencies ?? node.deps ?? [];
  const list = Array.isArray(value) ? value : [value];
  return unique(list.map((dependency) => {
    if (isRecord(dependency)) return cleanText(dependency.id ?? dependency.nodeId);
    return cleanText(dependency);
  }).filter(Boolean));
}

function rawEdges(plan) {
  if (!Array.isArray(plan.edges)) return [];
  return plan.edges.map((edge) => {
    const value = isRecord(edge) ? edge : {};
    return {
      from: cleanText(value.from ?? value.source ?? value.sourceId),
      to: cleanText(value.to ?? value.target ?? value.targetId),
    };
  });
}

/**
 * Convert AI-friendly shapes into one canonical plan without hiding semantic
 * errors. Unknown dependencies, duplicate ids, cycles, and invalid node kinds
 * are intentionally retained for validateTopologyPlan to report.
 *
 * Canonical node: { id, kind, title, dependsOn, prompt|note, ...binding }.
 * Canonical edge: { from, to }, where from depends on to.
 */
export function normalizeTopologyPlan(value) {
  let input = typeof value === 'string' ? parseAIResponse(value) : value;
  if (isRecord(input) && !Array.isArray(input.nodes)) {
    if (isRecord(input.plan)) input = input.plan;
    else if (isRecord(input.topology)) input = input.topology;
  }
  if (!isRecord(input) || !Array.isArray(input.nodes)) {
    throw new TypeError('Topology plan must be an object with a nodes array');
  }

  const nodes = input.nodes.map((value, index) => {
    const raw = isRecord(value) ? value : {};
    const id = cleanText(raw.id ?? raw.key);
    const kind = cleanText(raw.kind ?? raw.type, 'session').toLowerCase();
    const node = {
      id,
      kind,
      title: cleanText(raw.title ?? raw.name) || (kind === 'note' ? '便签 ' : '会话 ') + (index + 1),
      dependsOn: rawDependencies(raw),
    };
    if (kind === 'note') {
      node.note = cleanText(raw.note ?? raw.content);
    } else {
      node.prompt = cleanText(raw.prompt ?? raw.instruction ?? raw.task);
    }
    const sessionId = cleanText(raw.sessionId);
    const workspace = cleanText(raw.workspace);
    if (sessionId) node.sessionId = sessionId;
    if (workspace) node.workspace = workspace;
    return node;
  });

  // Edges are accepted as a convenience for AI responses, but dependencies are
  // the source of truth. Merge both forms and de-duplicate them deterministically.
  const explicitEdges = rawEdges(input);
  for (const edge of explicitEdges) {
    const source = nodes.find((node) => node.id === edge.from);
    if (source && edge.to) source.dependsOn = unique([...source.dependsOn, edge.to]);
  }

  const edgeMap = new Map();
  const addEdge = (from, to) => {
    const key = from + '\u0000' + to;
    if (!edgeMap.has(key)) edgeMap.set(key, { from, to });
  };
  for (const node of nodes) {
    for (const dependency of node.dependsOn) addEdge(node.id, dependency);
  }
  for (const edge of explicitEdges) addEdge(edge.from, edge.to);

  return {
    title: cleanText(input.title ?? input.name) || DEFAULT_TITLE,
    goal: cleanText(input.goal ?? input.objective ?? input.brief),
    nodes,
    edges: [...edgeMap.values()],
  };
}

/** Validate all topology invariants and return machine-readable errors. */
export function validateTopologyPlan(value) {
  let plan;
  try {
    plan = normalizeTopologyPlan(value);
  } catch (error) {
    return {
      valid: false,
      errors: [{ code: 'INVALID_PLAN', message: error.message || '拓扑计划格式无效' }],
    };
  }

  const errors = [];
  const add = (code, message, details = {}) => errors.push({ code, message, ...details });
  if (plan.nodes.length < 1 || plan.nodes.length > MAX_NODES) {
    add('NODE_COUNT', '拓扑计划必须包含 1-6 个节点', { count: plan.nodes.length });
  }

  const counts = new Map();
  for (const node of plan.nodes) counts.set(node.id, (counts.get(node.id) || 0) + 1);
  const byId = new Map();
  for (const node of plan.nodes) {
    if (!node.id) add('INVALID_NODE_ID', '每个节点都必须有非空 id');
    else if (counts.get(node.id) > 1) add('DUPLICATE_NODE_ID', '节点 id 不能重复：' + node.id, { nodeId: node.id });
    if (!byId.has(node.id)) byId.set(node.id, node);
    if (node.kind !== 'session' && node.kind !== 'note') {
      add('INVALID_NODE_KIND', '节点类型必须是 session 或 note', { nodeId: node.id, kind: node.kind });
    }
  }
  if (!plan.nodes.some((node) => node.kind === 'session')) {
    add('NO_SESSION', '拓扑计划至少需要一个会话节点');
  }

  for (const node of plan.nodes) {
    for (const dependency of node.dependsOn) {
      if (dependency === node.id) {
        add('SELF_DEPENDENCY', '节点不能依赖自身：' + node.id, { nodeId: node.id });
      }
      if (!byId.has(dependency)) {
        add('UNKNOWN_DEPENDENCY', '依赖节点不存在：' + dependency, { nodeId: node.id, dependencyId: dependency });
      }
    }
  }
  for (const edge of plan.edges) {
    const source = byId.get(edge.from);
    if (!source) {
      add('UNKNOWN_EDGE_SOURCE', '连线上游节点不存在：' + edge.from, { nodeId: edge.from });
      if (!byId.has(edge.to)) {
        add('UNKNOWN_DEPENDENCY', '依赖节点不存在：' + edge.to, { nodeId: edge.from, dependencyId: edge.to });
      }
    }
    const dependency = byId.get(edge.to);
    if (dependency?.kind === 'note') {
      add('NOTE_NOT_SINK', '便签只能作为汇点，不能有下游节点：' + dependency.id, { nodeId: dependency.id });
    }
  }

  // Kahn's algorithm over unique, known nodes. Other errors are still returned
  // alongside a cycle so callers can show all actionable feedback at once.
  const ids = plan.nodes.filter((node) => node.id && counts.get(node.id) === 1).map((node) => node.id);
  const idSet = new Set(ids);
  const indegree = new Map(ids.map((id) => [id, 0]));
  const downstream = new Map(ids.map((id) => [id, []]));
  for (const node of plan.nodes) {
    if (!idSet.has(node.id)) continue;
    for (const dependency of node.dependsOn) {
      if (!idSet.has(dependency)) continue;
      indegree.set(node.id, indegree.get(node.id) + 1);
      downstream.get(dependency).push(node.id);
    }
  }
  const queue = ids.filter((id) => indegree.get(id) === 0);
  let visited = 0;
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const id = queue[cursor];
    visited += 1;
    for (const target of downstream.get(id)) {
      indegree.set(target, indegree.get(target) - 1);
      if (indegree.get(target) === 0) queue.push(target);
    }
  }
  if (visited < ids.length) add('CYCLE', '拓扑依赖不能成环');

  return { valid: errors.length === 0, errors };
}

/** Error raised by operations that require a valid topology. */
export class TopologyPlanError extends Error {
  constructor(errors) {
    super('Invalid topology plan: ' + errors.map((error) => error.code).join(', '));
    this.name = 'TopologyPlanError';
    this.errors = errors;
  }
}

function validPlan(value) {
  const plan = normalizeTopologyPlan(value);
  const validation = validateTopologyPlan(plan);
  if (!validation.valid) throw new TopologyPlanError(validation.errors);
  return plan;
}

const LAYOUT_DEFAULTS = {
  direction: 'horizontal',
  originX: 40,
  originY: 40,
  nodeWidth: 320,
  nodeHeight: 200,
  layerGap: 80,
  nodeGap: 24,
};

function layoutOptions(options) {
  if (!isRecord(options)) throw new TypeError('Layout options must be an object');
  const result = { ...LAYOUT_DEFAULTS, ...options };
  if (result.direction !== 'horizontal' && result.direction !== 'vertical') {
    throw new RangeError('Layout direction must be horizontal or vertical');
  }
  for (const key of ['originX', 'originY', 'nodeWidth', 'nodeHeight', 'layerGap', 'nodeGap']) {
    if (typeof result[key] !== 'number' || !Number.isFinite(result[key]) || result[key] < 0) {
      throw new RangeError(key + ' must be a finite non-negative number');
    }
  }
  if (!result.nodeWidth || !result.nodeHeight) {
    throw new RangeError('Node width and height must be greater than zero');
  }
  return result;
}

/**
 * Compute longest-path dependency layers and deterministic canvas coordinates.
 * The returned layout does not mutate or implicitly get attached to the plan.
 */
export function computeLayeredLayout(value, options = {}) {
  const plan = validPlan(value);
  const config = layoutOptions(options);
  const nodes = plan.nodes;
  const indexOf = new Map(nodes.map((node, index) => [node.id, index]));
  const layerOf = new Map(nodes.map((node) => [node.id, 0]));
  const indegree = new Map(nodes.map((node) => [node.id, node.dependsOn.length]));
  const downstream = new Map(nodes.map((node) => [node.id, []]));
  for (const node of nodes) {
    for (const dependency of node.dependsOn) downstream.get(dependency).push(node.id);
  }

  const queue = nodes.filter((node) => indegree.get(node.id) === 0).map((node) => node.id);
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const id = queue[cursor];
    for (const target of downstream.get(id)) {
      layerOf.set(target, Math.max(layerOf.get(target), layerOf.get(id) + 1));
      indegree.set(target, indegree.get(target) - 1);
      if (indegree.get(target) === 0) queue.push(target);
    }
  }

  const layers = [];
  for (const id of queue) {
    const layer = layerOf.get(id);
    if (!layers[layer]) layers[layer] = [];
    layers[layer].push(id);
  }
  for (const layer of layers) {
    layer.sort((left, right) => indexOf.get(left) - indexOf.get(right));
  }

  const positions = [];
  layers.forEach((ids, layer) => {
    ids.forEach((id, column) => {
      const horizontal = config.direction === 'horizontal';
      positions.push({
        id,
        layer,
        column,
        x: config.originX + (horizontal ? layer * (config.nodeWidth + config.layerGap) : column * (config.nodeWidth + config.nodeGap)),
        y: config.originY + (horizontal ? column * (config.nodeHeight + config.nodeGap) : layer * (config.nodeHeight + config.layerGap)),
        w: config.nodeWidth,
        h: config.nodeHeight,
      });
    });
  });

  const layerCount = layers.length;
  const largestLayer = Math.max(...layers.map((layer) => layer.length));
  const horizontal = config.direction === 'horizontal';
  return {
    direction: config.direction,
    layers,
    nodes: positions,
    width: config.originX * 2 + (horizontal
      ? layerCount * config.nodeWidth + (layerCount - 1) * config.layerGap
      : largestLayer * config.nodeWidth + (largestLayer - 1) * config.nodeGap),
    height: config.originY * 2 + (horizontal
      ? largestLayer * config.nodeHeight + (largestLayer - 1) * config.nodeGap
      : layerCount * config.nodeHeight + (layerCount - 1) * config.layerGap),
  };
}

function sessionCandidate(value) {
  const raw = typeof value === 'string' ? { sessionId: value } : value;
  if (!isRecord(raw) || raw.kind === 'note' || raw.type === 'note') return null;
  const sessionId = cleanText(raw.sessionId ?? raw.id);
  if (!sessionId) return null;
  return {
    key: sessionId,
    sessionId,
    title: cleanText(raw.title ?? raw.name),
    workspace: cleanText(raw.workspace),
    prompt: cleanText(raw.prompt ?? raw.instruction ?? raw.composerDraft ?? raw.draft),
    pipeline: raw.pipeline,
  };
}

function noteCandidate(value, index) {
  if (!isRecord(value) || (value.kind !== 'note' && value.type !== 'note')) return null;
  return {
    key: cleanText(value.id ?? value.noteId, 'anonymous-note-' + (index + 1)),
    title: cleanText(value.title ?? value.name),
    note: cleanText(value.note ?? value.content),
  };
}

function pipelineTargets(pipeline) {
  if (!isRecord(pipeline)) return [];
  if (Array.isArray(pipeline.targets)) return pipeline.targets.filter(isRecord);
  if (pipeline.targetSessionId) {
    return [{ kind: 'session', id: pipeline.targetSessionId, targetSessionId: pipeline.targetSessionId }];
  }
  return [];
}

/**
 * Create a deterministic local draft from board cards and/or known sessions.
 * Existing pipelines become dependencies. If they are malformed or cyclic, the
 * same nodes fall back to a simple session chain with notes at the sink.
 */
export function createLocalTaskDraft(value = {}) {
  const options = Array.isArray(value) ? { cards: value } : (isRecord(value) ? value : {});
  const cards = Array.isArray(options.cards) ? options.cards : [];
  const sessions = Array.isArray(options.sessions) ? options.sessions : [];
  const goal = cleanText(options.goal ?? options.objective ?? options.brief);
  const title = cleanText(options.title) || shortTitle(goal, '画布任务草案');

  const sessionMap = new Map();
  for (const raw of [...cards, ...sessions]) {
    const candidate = sessionCandidate(raw);
    if (candidate && !sessionMap.has(candidate.key)) sessionMap.set(candidate.key, candidate);
  }
  const noteMap = new Map();
  cards.forEach((raw, index) => {
    const candidate = noteCandidate(raw, index);
    if (candidate && !noteMap.has(candidate.key)) noteMap.set(candidate.key, candidate);
  });

  const sessionCandidates = [...sessionMap.values()];
  if (!sessionCandidates.length) {
    return createFallbackTopology({ title, goal, sessions });
  }
  const selectedSessions = sessionCandidates.slice(0, MAX_NODES);
  const selectedNotes = [...noteMap.values()].slice(0, MAX_NODES - selectedSessions.length);

  const nodes = [];
  const sessionIds = new Map();
  const noteIds = new Map();
  selectedSessions.forEach((candidate, index) => {
    const id = 'session-' + (index + 1);
    sessionIds.set(candidate.key, id);
    const nodeTitle = candidate.title || '会话 ' + (index + 1);
    const node = {
      id,
      kind: 'session',
      title: nodeTitle,
      prompt: goal || candidate.prompt || '围绕「' + nodeTitle + '」继续工作，给出结论、依据和下一步。',
      dependsOn: [],
      sessionId: candidate.sessionId,
    };
    if (candidate.workspace) node.workspace = candidate.workspace;
    nodes.push(node);
  });
  selectedNotes.forEach((candidate, index) => {
    const id = 'note-' + (index + 1);
    noteIds.set(candidate.key, id);
    nodes.push({
      id,
      kind: 'note',
      title: candidate.title || '便签 ' + (index + 1),
      note: candidate.note,
      dependsOn: [],
    });
  });

  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  selectedSessions.forEach((candidate, index) => {
    const from = 'session-' + (index + 1);
    for (const target of pipelineTargets(candidate.pipeline)) {
      const targetKey = cleanText(target.id ?? target.targetSessionId ?? target.targetNoteId);
      const to = target.kind === 'note'
        ? noteIds.get(targetKey)
        : (sessionIds.get(targetKey) || noteIds.get(targetKey));
      if (to) nodeById.get(to).dependsOn.push(from);
    }
  });

  const draft = normalizeTopologyPlan({ title, goal, nodes });
  if (validateTopologyPlan(draft).valid) return draft;

  // A local draft must always be usable. Preserve the selected cards but replace
  // broken imported edges with a transparent, deterministic linear backbone.
  nodes.forEach((node) => { node.dependsOn = []; });
  const sessionNodes = nodes.filter((node) => node.kind === 'session');
  const noteNodes = nodes.filter((node) => node.kind === 'note');
  for (let index = 1; index < sessionNodes.length; index += 1) {
    sessionNodes[index].dependsOn = [sessionNodes[index - 1].id];
  }
  for (const note of noteNodes) note.dependsOn = [sessionNodes[sessionNodes.length - 1].id];
  return normalizeTopologyPlan({ title, goal, nodes });
}

/** A minimal, always-valid fallback: one session writes one result note. */
export function createFallbackTopology(value = {}) {
  const options = typeof value === 'string' ? { goal: value } : (isRecord(value) ? value : {});
  const goal = cleanText(options.goal ?? options.objective ?? options.brief);
  const sessions = Array.isArray(options.sessions) ? options.sessions : [];
  const cards = Array.isArray(options.cards) ? options.cards : [];
  const existing = [...sessions, ...cards].map(sessionCandidate).find(Boolean);
  const sessionTitle = cleanText(options.sessionTitle) || existing?.title || '执行任务';
  const session = {
    id: 'session-1',
    kind: 'session',
    title: sessionTitle,
    prompt: goal || existing?.prompt || '明确目标与约束，执行任务，并汇报可验证的结果。',
    dependsOn: [],
  };
  if (existing?.sessionId) session.sessionId = existing.sessionId;
  if (existing?.workspace) session.workspace = existing.workspace;

  return normalizeTopologyPlan({
    title: cleanText(options.title) || shortTitle(goal, '基础任务'),
    goal,
    nodes: [
      session,
      {
        id: 'note-1',
        kind: 'note',
        title: cleanText(options.noteTitle) || '结果汇总',
        note: cleanText(options.note) || '# 结果汇总',
        dependsOn: ['session-1'],
      },
    ],
  });
}
