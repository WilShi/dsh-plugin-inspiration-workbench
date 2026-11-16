import test from 'node:test';
import assert from 'node:assert/strict';
import { createFlowRecorder } from '../src/client/flow-recorder.js';

test('records actual delivery state and projects the latest event per edge', () => {
  let now = 100;
  const recorder = createFlowRecorder({ now: () => now++ });
  recorder.record({ sourceSessionId: 'a', targetId: 'b', status: 'delivering' });
  recorder.record({ sourceSessionId: 'a', targetId: 'b', status: 'delivered' });
  recorder.record({ sourceSessionId: 'a', targetId: 'note', targetKind: 'note', status: 'drafted' });
  assert.equal(recorder.latestByEdge().get('a=>session:b').status, 'delivered');
  assert.equal(recorder.events().length, 3);
});

test('persists canvas association and bounds history without losing recent events', () => {
  const recorder = createFlowRecorder({ now: () => 42, limit: 2 });
  for (const status of ['waiting', 'delivering', 'delivered']) {
    recorder.record({ sourceSessionId: 'a', targetId: status, canvasId: 'canvas-1', status });
  }
  assert.deepEqual(recorder.events().map((event) => event.status), ['delivering', 'delivered']);
  assert.equal(recorder.forCanvas('canvas-1').length, 2);
  assert.equal(recorder.forCanvas('other').length, 0);
});

test('ignores incomplete events and emits copies to subscribers', () => {
  let emitted = 0;
  const recorder = createFlowRecorder({ onChange: (events) => { emitted = events.length; } });
  assert.equal(recorder.record({}), null);
  recorder.record({ sourceSessionId: 'a', targetId: 'b' });
  const snapshot = recorder.events();
  snapshot.push({ id: 'mutated' });
  assert.equal(emitted, 1);
  assert.equal(recorder.events().length, 1);
});
