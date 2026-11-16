import test from 'node:test';
import assert from 'node:assert/strict';
import { createTaskStore } from '../src/client/task-store.js';

function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) || null,
    setItem: (key, value) => data.set(key, value),
    data,
  };
}

test('restores local tasks and merges newer Host state without losing flow events', async () => {
  const storage = memoryStorage();
  storage.setItem('dsh.inspiration-workbench.tasks.v1', JSON.stringify({ tasks: [{ id: 'local' }], flowEvents: [], updatedAt: 2 }));
  const store = createTaskStore({
    storage,
    fetchRemote: async () => ({ tasks: [{ id: 'remote' }], flowEvents: [{ id: 'event' }], updatedAt: 3, rev: 4 }),
    subscribe: () => () => {},
  });
  const snapshot = await store.load();
  assert.equal(snapshot.tasks[0].id, 'remote');
  assert.equal(snapshot.flowEvents[0].id, 'event');
  store.dispose();
});

test('updates tasks immutably, notifies listeners and flushes tasks with flow events', async () => {
  const pushed = [];
  const store = createTaskStore({
    storage: memoryStorage(),
    fetchRemote: async () => null,
    pushRemote: async (tasks, flowEvents, clientId) => {
      pushed.push({ tasks, flowEvents, clientId });
      return { rev: 8, updatedAt: 99 };
    },
    subscribe: () => () => {},
    clientId: 'client-a',
  });
  let notifications = 0;
  store.subscribe(() => { notifications += 1; });
  store.setTasks([{ id: 'a', title: 'old' }]);
  store.updateTask('a', { title: 'new' });
  store.setFlowEvents([{ id: 'flow' }]);
  await store.flush();
  assert.equal(pushed.length, 1);
  assert.equal(pushed[0].tasks[0].title, 'new');
  assert.equal(pushed[0].flowEvents[0].id, 'flow');
  assert.equal(pushed[0].clientId, 'client-a');
  assert.equal(notifications, 3);
  store.dispose();
});

test('does not adopt a remote echo while a local save is pending', async () => {
  let remoteListener;
  const store = createTaskStore({
    storage: memoryStorage(),
    fetchRemote: async () => null,
    pushRemote: async () => ({}),
    subscribe: (listener) => { remoteListener = listener; return () => {}; },
    clientId: 'client-a',
  });
  await store.load();
  store.setTasks([{ id: 'pending' }]);
  remoteListener(12, 'client-a');
  assert.equal(store.snapshot().tasks[0].id, 'pending');
  store.dispose();
});
