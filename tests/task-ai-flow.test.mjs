import test from 'node:test';
import assert from 'node:assert/strict';
import { createTaskController } from '../src/client/task-controller.js';

function aiHarness(answer) {
  let planning = false;
  let reads = 0;
  const adapter = {
    listRecentSessions: () => [{ sessionId: 'existing', title: 'Existing task', workspace: 'Code', activityAt: 1 }],
    titleOf: () => 'Existing task',
    listWorkspaces: () => [{ id: 'ws', title: 'Code' }],
    workspaceOf: () => ({ title: 'Code' }),
    open: () => () => {},
    waitForReady: async () => true,
    createSession: async () => { planning = true; reads = 0; return 'planning'; },
    prompt: async () => {},
    read() {
      if (!planning) return { ready: true, running: false, items: [{ k: 'assistant', text: 'Existing result' }] };
      reads += 1;
      if (reads === 1) return { running: true, items: [] };
      return { running: false, items: [{ k: 'assistant', text: answer }] };
    },
  };
  const taskStore = {
    snapshot: () => ({ tasks: [], flowEvents: [] }),
    setTasks() {},
  };
  const flow = { events: () => [] };
  const bridge = {
    getCards: () => [],
    getCanvases: () => [],
    getActiveCanvas: () => null,
  };
  return createTaskController({ adapter, taskStore, flow, t: (key) => key, toast: () => {}, bridge });
}

test('AI scan parses and associates proposed tasks with real session ids', async () => {
  const controller = aiHarness(JSON.stringify({
    tasks: [{ title: 'AI organized task', summary: 'Grouped result', sessionIds: ['existing'], pending: ['Review output'], priority: 'high' }],
  }));
  const drafts = await controller.scan({ sessionIds: ['existing'], useAI: true });
  assert.equal(drafts.length, 1);
  assert.equal(drafts[0].title, 'AI organized task');
  assert.equal(drafts[0].sessionIds[0], 'existing');
  assert.equal(drafts[0].source, 'scan-ai');
});

test('AI planning validates structured topology and preserves acceptance criteria', async () => {
  const controller = aiHarness(JSON.stringify({
    title: 'AI plan',
    goal: 'Build and verify',
    acceptanceCriteria: ['Validated output'],
    nodes: [
      { id: 'work', kind: 'session', title: 'Work', prompt: 'Do work', dependsOn: [] },
      { id: 'result', kind: 'note', title: 'Result', note: '# Result', dependsOn: ['work'] },
    ],
  }));
  const plan = await controller.plan({ requirement: 'Build and verify', workspaceId: 'ws', useAI: true });
  assert.equal(plan.title, 'AI plan');
  assert.equal(plan.nodes.length, 2);
  assert.equal(plan.nodes[1].dependsOn[0], 'work');
  assert.deepEqual(plan.acceptanceCriteria, ['Validated output']);
});
