import test from 'node:test';
import assert from 'node:assert/strict';
import { createTaskController } from '../src/client/task-controller.js';
import { runTaskAnalysis } from '../src/client/task-ai.js';
import { createFlowRecorder } from '../src/client/flow-recorder.js';

function harness() {
  const state = {
    tasks: [],
    cards: [],
    canvases: [],
    activeCanvas: null,
    prompted: [],
    nextSession: 1,
  };
  const taskStore = {
    snapshot: () => ({ tasks: state.tasks.slice(), flowEvents: [] }),
    setTasks(next) { state.tasks = next.slice(); },
    addTasks(next) {
      const byId = new Map(state.tasks.map((task) => [task.id, task]));
      for (const task of next) byId.set(task.id, task);
      state.tasks = [...byId.values()];
    },
    updateTask(id, patch) {
      state.tasks = state.tasks.map((task) => task.id === id ? { ...task, ...patch } : task);
    },
    removeTask(id) { state.tasks = state.tasks.filter((task) => task.id !== id); },
    setFlowEvents() {},
  };
  const flow = createFlowRecorder({});
  const adapter = {
    listRecentSessions: () => [{ sessionId: 'existing', title: '现有会话', workspace: 'Code', activityAt: 1 }],
    titleOf: (id) => id === 'existing' ? '现有会话' : '新会话 ' + id,
    listWorkspaces: () => [{ id: 'ws', title: 'Code' }],
    open: () => () => {},
    waitForReady: async () => true,
    read: () => ({ ready: true, running: false, items: [{ k: 'assistant', text: '已经完成的结论' }] }),
    workspaceOf: () => ({ title: 'Code' }),
    createSession: async () => 'session-' + state.nextSession++,
    prompt: async (id, text) => { state.prompted.push({ id, text }); },
  };
  const bridge = {
    getCards: () => state.cards,
    getCanvases: () => state.canvases,
    getActiveCanvas: () => state.activeCanvas,
    requestNewBlankCanvas: async () => { state.cards = []; state.activeCanvas = null; },
    requestSwitchCanvas: async (id) => { state.activeCanvas = id; },
    saveCanvasAs(name) {
      const canvas = { id: 'canvas-' + state.canvases.length + 1, name, layout: { cards: state.cards.slice() } };
      state.canvases.push(canvas);
      state.activeCanvas = canvas.id;
      return true;
    },
    storeCanvases() {},
    addSession({ sessionId, title, x, y }) {
      const card = { id: 'card-' + sessionId, kind: 'session', sessionId, title, x, y, pipeline: null, composerDraft: '' };
      state.cards.push(card);
      return card;
    },
    addNote({ title, note, x, y }) {
      const card = { id: 'note-' + state.cards.length, kind: 'note', title, note, x, y, pipeline: null };
      state.cards.push(card);
      return card;
    },
    setPipeTargets(card, targets) { card.pipeline = targets.length ? { targets } : null; },
    renderFoot() {},
    fitView: async () => {},
    centerCard() {},
    flash() {},
    switchCanvas() {},
    setMode(mode) { state.mode = mode; },
    save() {},
    schedulePipelines() {},
    recordFlow(card, target, status, extra) {
      return flow.record({ sourceSessionId: card.sessionId, targetId: target.id, targetKind: target.kind, status, ...extra });
    },
  };
  const controller = createTaskController({ adapter, taskStore, flow, t: (key) => key, toast: () => {}, bridge });
  return { state, taskStore, flow, adapter, bridge, controller };
}

test('local session scan produces reviewable task drafts with evidence and linked sessions', async () => {
  const { controller } = harness();
  const drafts = await controller.scan({ sessionIds: ['existing'], useAI: false });
  assert.equal(drafts.length, 1);
  assert.equal(drafts[0].sessionIds[0], 'existing');
  assert.equal(drafts[0].executionStatus, 'done');
  assert.equal(drafts[0].deliverables.length, 1);
  assert.equal(drafts[0].summary, '已经完成的结论');
  await controller.addTasks(drafts);
  const snapshot = controller.snapshot();
  assert.equal(snapshot.tasks[0].status, 'review');
});

test('materializing a fallback topology creates drafts and a note sink without starting work', async () => {
  const { controller, state } = harness();
  const plan = await controller.plan({ requirement: '实现任务模式并验证', workspaceId: 'ws', useAI: false });
  const result = await controller.materializePlan(plan, { start: false });
  assert.ok(result.taskId);
  assert.equal(state.cards.filter((card) => card.kind === 'session').length, 1);
  assert.equal(state.cards.filter((card) => card.kind === 'note').length, 1);
  assert.equal(state.prompted.length, 0);
  const session = state.cards.find((card) => card.kind === 'session');
  assert.ok(session.composerDraft.includes('实现任务模式'));
  assert.equal(session.pipeline.targets[0].kind, 'note');
  const task = state.tasks.find((item) => item.id === result.taskId);
  assert.equal(task.executionStatus, 'idle');
  assert.equal(task.acceptanceCriteria.length, 1);
});

test('explicit start only prompts root nodes and acceptance remains a separate action', async () => {
  const { controller, state } = harness();
  const plan = await controller.plan({ requirement: '验证启动边界', workspaceId: 'ws', useAI: false });
  const result = await controller.materializePlan(plan, { start: true });
  assert.equal(state.prompted.length, 1);
  assert.equal(state.prompted[0].id, 'session-1');
  const task = state.tasks.find((item) => item.id === result.taskId);
  assert.equal(task.executionStatus, 'running');
  assert.equal(task.acceptanceStatus, 'pending');
  await controller.reviewTask(task, true);
  const reviewed = state.tasks.find((item) => item.id === result.taskId);
  assert.equal(reviewed.acceptanceStatus, 'accepted');
  assert.equal(reviewed.executionStatus, 'done');
});


test('persisted runtime survives when a session is not currently open', () => {
  const { controller, state } = harness();
  state.tasks.push({
    id: 'persisted', title: 'Persisted task', sessionIds: ['offline'],
    sessionStates: { offline: { done: true } },
    executionStatus: 'done', acceptanceStatus: 'review',
  });
  assert.equal(controller.snapshot().tasks[0].status, 'review');
});

test('a later successful delivery clears an earlier edge failure', () => {
  const { controller, state, flow } = harness();
  state.tasks.push({ id: 'flow-task', title: 'Flow task', canvasIds: ['canvas-1'], executionStatus: 'idle' });
  flow.record({ sourceSessionId: 'a', targetId: 'b', canvasId: 'canvas-1', status: 'failed' });
  flow.record({ sourceSessionId: 'a', targetId: 'b', canvasId: 'canvas-1', status: 'delivered' });
  assert.notEqual(controller.snapshot().tasks[0].status, 'blocked');
});


test('a missing workspace id falls back to the first workspace', async () => {
  const { controller } = harness();
  const plan = await controller.plan({ requirement: '使用默认工作区', useAI: false });
  assert.equal(plan.workspaceId, 'ws');
});

test('materialize fails clearly instead of creating an ungrouped session', async () => {
  const { controller, adapter } = harness();
  adapter.listWorkspaces = () => [];
  const plan = await controller.plan({ requirement: '没有工作区', useAI: false });
  await assert.rejects(
    controller.materializePlan(plan, { start: false }),
    /没有可用工作区/
  );
});


test('task snapshot exposes node-level completion and note delivery', async () => {
  const { controller, state, flow } = harness();
  const plan = await controller.plan({ requirement: '验证节点状态', workspaceId: 'ws', useAI: false });
  const result = await controller.materializePlan(plan, { start: false });
  for (const card of state.cards) {
    if (card.kind === 'session') {
      card.view = { ready: true, running: false, items: [{ k: 'assistant', text: '完成' }] };
      controller.noteSessionRuntime(card);
    }
  }
  flow.record({ sourceSessionId: 'session-1', targetId: 'note-1', targetKind: 'note', status: 'delivered' });
  const task = controller.snapshot().tasks.find((item) => item.id === result.taskId);
  assert.equal(task.nodes.length, 2);
  assert.equal(task.nodes[0].status, 'done');
  assert.equal(task.nodes[1].status, 'done');
});


test('runtime state is persisted independently for every session', async () => {
  const { controller, state } = harness();
  const plan = await controller.plan({ requirement: '多会话状态保存', workspaceId: 'ws', useAI: false });
  const result = await controller.materializePlan(plan, { start: false });
  const sessions = state.cards.filter((card) => card.kind === 'session');
  for (const card of sessions) {
    card.view = { ready: true, running: false, items: [{ k: 'assistant', text: '完成' }] };
    controller.noteSessionRuntime(card);
  }
  await new Promise((resolve) => setTimeout(resolve, 750));
  const task = controller.snapshot().tasks.find((item) => item.id === result.taskId);
  assert.equal(Object.keys(task.sessionStates).length, sessions.length);
  for (const card of sessions) assert.equal(task.sessionStates[card.sessionId].done, true);
});

test('model catalog returns selectable models and current default', async () => {
  const { controller, adapter } = harness();
  adapter.modelCatalog = async () => ({
    groups: [{ models: [{ id: 'model-a', name: 'Model A', provider: 'provider-a', reasoning: { defaultEffort: 'low' } }] }],
  });
  adapter.selectionOf = () => ({ model: 'model-a', provider: 'provider-a' });
  const result = await controller.listModels();
  assert.equal(result.models.length, 1);
  assert.equal(result.models[0].name, 'Model A');
  assert.equal(result.defaultModel.model, 'model-a');
});


test('planning maps selected model id into DSH selectModel request', async () => {
  let selected;
  const adapter = {
    createSession: async () => 'session-plan',
    open: () => () => {},
    waitForReady: async () => true,
    selectModel: async (sessionId, selection) => { selected = { sessionId, ...selection }; },
    prompt: async () => {},
    read: () => ({ running: false, items: [{ k: 'assistant', text: '{"title":"T","nodes":[]}' }] }),
  };
  await runTaskAnalysis({
    adapter,
    prompt: 'plan',
    selection: { id: 'model-a', provider: 'provider-a', reasoningEffort: 'low' },
  });
  assert.equal(selected.model, 'model-a');
  assert.equal(selected.provider, 'provider-a');
  assert.equal(selected.reasoningEffort, 'low');
});

test('continue creates an inspectable draft instead of auto-sending it', async () => {
  const { controller, state } = harness();
  const plan = await controller.plan({ requirement: '验证续做', workspaceId: 'ws', useAI: false });
  const result = await controller.materializePlan(plan, { start: false });
  const task = state.tasks.find((item) => item.id === result.taskId);
  await controller.continueTask(task);
  const session = state.cards.find((card) => card.kind === 'session');
  assert.ok(session.composerDraft.includes('请继续这项任务'));
  assert.equal(state.prompted.length, 0);
});
