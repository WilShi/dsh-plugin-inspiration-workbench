import test from 'node:test';
import assert from 'node:assert/strict';
import { assistantTextFromView, runTaskAnalysis } from '../src/client/task-ai.js';

function adapterWithViews(views) {
  const state = { views: views.slice(), stopped: false, cancelled: false, prompted: false };
  return {
    state,
    async createSession() { return 'planning-session'; },
    open() { return () => { state.stopped = true; }; },
    async waitForReady() { return true; },
    async prompt() { state.prompted = true; },
    read() { return state.views.length ? state.views.shift() : state.last; },
    async cancel() { state.cancelled = true; },
  };
}

test('extracts the latest assistant answer from a session projection', () => {
  assert.equal(assistantTextFromView({ items: [{ k: 'assistant', text: 'first' }, { k: 'user', text: 'next' }] }), 'first');
  assert.equal(assistantTextFromView({ items: [] }), '');
});

test('runs planning through a real session and releases the retained binding', async () => {
  const adapter = adapterWithViews([
    { running: true, items: [] },
    { running: false, items: [{ k: 'assistant', text: '{"tasks":[]}' }] },
  ]);
  const result = await runTaskAnalysis({ adapter, prompt: 'analyze', pollMs: 1 });
  assert.equal(result.sessionId, 'planning-session');
  assert.equal(result.text, '{"tasks":[]}');
  assert.equal(adapter.state.prompted, true);
  assert.equal(adapter.state.stopped, true);
});

test('times out without hanging and cancels the planning turn', async () => {
  const adapter = adapterWithViews([{ running: true, items: [] }]);
  adapter.read = () => ({ running: true, items: [] });
  await assert.rejects(
    runTaskAnalysis({ adapter, prompt: 'analyze', timeoutMs: 12, pollMs: 2 }),
    /超时/
  );
  assert.equal(adapter.state.cancelled, true);
  assert.equal(adapter.state.stopped, true);
});

test('surfaces a real model error with its planning session id', async () => {
  const adapter = adapterWithViews([{ running: false, lastError: 'model unavailable', items: [] }]);
  await assert.rejects(
    runTaskAnalysis({ adapter, prompt: 'analyze', pollMs: 1 }),
    (error) => error.message === 'model unavailable' && error.sessionId === 'planning-session'
  );
});
