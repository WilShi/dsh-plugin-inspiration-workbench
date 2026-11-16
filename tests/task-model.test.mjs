import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ACCEPTANCE_STATUSES,
  EXECUTION_STATUSES,
  TASK_STATUSES,
  deriveTaskStatus,
  normalizeFlowEvent,
  normalizeTask,
  projectFlowEvents,
  projectFlowStates,
  sortTasks,
} from '../src/client/task-model.js';

test('exports the canonical status sets', () => {
  assert.deepEqual(EXECUTION_STATUSES, ['idle', 'running', 'needs_input', 'blocked', 'done']);
  assert.deepEqual(ACCEPTANCE_STATUSES, ['pending', 'review', 'accepted', 'rejected']);
  assert.deepEqual(TASK_STATUSES, ['needs_input', 'blocked', 'review', 'running', 'idle', 'done']);
});

test('normalizeTask trims fields, supports nested aliases, and preserves other data', () => {
  const source = {
    id: ' task-1 ',
    title: '  Investigate  ',
    description: '  inspect logs\n',
    execution: { status: 'waiting-input' },
    acceptance: { status: 'approved' },
    sessionId: 'session-1',
    custom: { retained: true },
  };
  const snapshot = structuredClone(source);
  const normalized = normalizeTask(source);

  assert.equal(normalized.id, 'task-1');
  assert.equal(normalized.title, 'Investigate');
  assert.equal(normalized.description, 'inspect logs');
  assert.equal(normalized.executionStatus, 'needs_input');
  assert.equal(normalized.acceptanceStatus, 'accepted');
  assert.equal(normalized.status, 'needs_input');
  assert.equal(normalized.sessionId, 'session-1');
  assert.deepEqual(normalized.custom, { retained: true });
  assert.deepEqual(source, snapshot);
  assert.notEqual(normalized, source);
});

test('normalizeTask handles empty input and infers legacy overall status', () => {
  assert.deepEqual(normalizeTask(null), {
    id: '',
    title: '',
    description: '',
    executionStatus: 'idle',
    acceptanceStatus: 'pending',
    status: 'idle',
  });
  assert.equal(normalizeTask({ status: 'done' }).status, 'done');
  assert.equal(normalizeTask({ status: 'review' }).status, 'review');
  assert.equal(normalizeTask({ status: 'in progress' }).status, 'running');
});

test('deriveTaskStatus keeps execution and acceptance independent', () => {
  const cases = [
    [{ executionStatus: 'needs_input', acceptanceStatus: 'review' }, 'needs_input'],
    [{ executionStatus: 'blocked', acceptanceStatus: 'review' }, 'blocked'],
    [{ executionStatus: 'done', acceptanceStatus: 'review' }, 'review'],
    [{ executionStatus: 'running', acceptanceStatus: 'accepted' }, 'running'],
    [{ executionStatus: 'idle', acceptanceStatus: 'accepted' }, 'idle'],
    [{ executionStatus: 'done', acceptanceStatus: 'accepted' }, 'done'],
    [{ executionStatus: 'done', acceptanceStatus: 'pending' }, 'review'],
    [{ executionStatus: 'done', acceptanceStatus: 'rejected' }, 'idle'],
  ];
  for (const [task, expected] of cases) {
    assert.equal(deriveTaskStatus(task), expected, JSON.stringify(task));
  }
});

test('sortTasks prioritizes actionable work with deterministic ties and no mutation', () => {
  const source = [
    { id: 'done', status: 'done' },
    { id: 'idle-b', executionStatus: 'idle' },
    { id: 'review', executionStatus: 'done', acceptanceStatus: 'review' },
    { id: 'running', executionStatus: 'running' },
    { id: 'blocked', executionStatus: 'blocked' },
    { id: 'input-b', executionStatus: 'needs_input', order: 2 },
    { id: 'input-a', executionStatus: 'needs_input', order: 1 },
    { id: 'idle-a', executionStatus: 'idle' },
  ];
  const snapshot = structuredClone(source);
  const sorted = sortTasks(source);

  assert.deepEqual(sorted.map((task) => task.id), [
    'input-a',
    'input-b',
    'blocked',
    'review',
    'running',
    'idle-a',
    'idle-b',
    'done',
  ]);
  assert.deepEqual(source, snapshot);
  assert.notEqual(sorted, source);
  assert.deepEqual(sortTasks(source).map((task) => task.id), sorted.map((task) => task.id));
  assert.deepEqual(sortTasks(null), []);
});

test('normalizeFlowEvent canonicalizes aliases and rejects incomplete events', () => {
  const source = {
    eventId: ' event-1 ',
    edgeKey: ' session-a->session-b ',
    status: ' completed ',
    at: '2026-11-13T00:00:00.000Z',
    seq: '4',
    payload: { retained: true },
  };
  const snapshot = structuredClone(source);
  const event = normalizeFlowEvent(source);

  assert.equal(event.id, 'event-1');
  assert.equal(event.edgeKey, 'session-a->session-b');
  assert.equal(event.state, 'completed');
  assert.equal(event.timestamp, Date.parse('2026-11-13T00:00:00.000Z'));
  assert.equal(event.sequence, 4);
  assert.deepEqual(event.payload, { retained: true });
  assert.deepEqual(source, snapshot);

  assert.equal(normalizeFlowEvent(null), null);
  assert.equal(normalizeFlowEvent({ state: 'done' }), null);
  assert.equal(normalizeFlowEvent({ edgeKey: 'a->b' }), null);
  assert.equal(normalizeFlowEvent({ edgeKey: 'a->b', state: 'done', timestamp: 'bad' }).timestamp, 0);
});

test('projectFlowEvents selects newest timestamps independently of input order', () => {
  const events = [
    { id: 'new', edgeKey: 'a->b', state: 'running', timestamp: 200, sequence: 1 },
    { id: 'old', edgeKey: 'a->b', state: 'idle', timestamp: 100, sequence: 99 },
    { id: 'other', edgeKey: 'c->d', state: 'done', timestamp: 50 },
    { edgeKey: '', state: 'ignored' },
  ];
  const snapshot = structuredClone(events);
  const projected = projectFlowEvents(events);

  assert.deepEqual(Object.keys(projected), ['a->b', 'c->d']);
  assert.equal(projected['a->b'].id, 'new');
  assert.equal(projected['a->b'].state, 'running');
  assert.equal(projected['c->d'].id, 'other');
  assert.deepEqual(events, snapshot);
});

test('flow projection breaks timestamp ties by sequence, then input order', () => {
  const events = [
    { edgeKey: 'a->b', state: 'idle', timestamp: 100, sequence: 1 },
    { edgeKey: 'a->b', state: 'running', timestamp: 100, sequence: 2 },
    { edgeKey: 'a->b', state: 'done', timestamp: 100, sequence: 2 },
  ];
  assert.equal(projectFlowEvents(events)['a->b'].state, 'done');
  assert.deepEqual(projectFlowStates(events), { 'a->b': 'done' });
  assert.deepEqual(projectFlowEvents(null), {});
  assert.deepEqual(projectFlowStates(null), {});
});
