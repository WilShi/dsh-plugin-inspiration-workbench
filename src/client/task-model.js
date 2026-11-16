/**
 * Pure task-domain helpers. This module deliberately has no DOM, clock, or
 * storage dependencies so persisted data can be normalized deterministically.
 */

export const EXECUTION_STATUSES = Object.freeze([
  'idle',
  'running',
  'needs_input',
  'blocked',
  'done',
]);

export const ACCEPTANCE_STATUSES = Object.freeze([
  'pending',
  'review',
  'accepted',
  'rejected',
]);

export const TASK_STATUSES = Object.freeze([
  'needs_input',
  'blocked',
  'review',
  'running',
  'idle',
  'done',
]);

const STATUS_RANK = Object.freeze({
  needs_input: 0,
  blocked: 1,
  review: 2,
  running: 3,
  idle: 4,
  done: 5,
});

const EXECUTION_ALIASES = Object.freeze({
  idle: 'idle',
  pending: 'idle',
  queued: 'idle',
  waiting: 'idle',
  cancelled: 'idle',
  canceled: 'idle',
  running: 'running',
  active: 'running',
  in_progress: 'running',
  needs_input: 'needs_input',
  need_input: 'needs_input',
  waiting_input: 'needs_input',
  awaiting_input: 'needs_input',
  question: 'needs_input',
  approval: 'needs_input',
  blocked: 'blocked',
  failed: 'blocked',
  failure: 'blocked',
  error: 'blocked',
  done: 'done',
  complete: 'done',
  completed: 'done',
  succeeded: 'done',
});

const ACCEPTANCE_ALIASES = Object.freeze({
  pending: 'pending',
  none: 'pending',
  not_submitted: 'pending',
  review: 'review',
  in_review: 'review',
  awaiting_review: 'review',
  accepted: 'accepted',
  accept: 'accepted',
  approved: 'accepted',
  passed: 'accepted',
  not_required: 'accepted',
  rejected: 'rejected',
  denied: 'rejected',
  changes_requested: 'rejected',
});

function object(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function text(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return '';
}

function token(value) {
  return text(value).toLowerCase().replace(/[\s-]+/g, '_');
}

function executionStatus(value) {
  return EXECUTION_ALIASES[token(value)] || 'idle';
}

function acceptanceStatus(value) {
  return ACCEPTANCE_ALIASES[token(value)] || 'pending';
}

function statusesOf(value) {
  const task = object(value);
  const execution = object(task.execution);
  const acceptance = object(task.acceptance);
  const executionValue = task.executionStatus ?? execution.status;
  const acceptanceValue = task.acceptanceStatus ?? acceptance.status;
  const overall = token(task.status);

  let normalizedExecution;
  if (executionValue != null) {
    normalizedExecution = executionStatus(executionValue);
  } else if (overall === 'review' || overall === 'done') {
    normalizedExecution = 'done';
  } else {
    normalizedExecution = executionStatus(overall);
  }

  let normalizedAcceptance;
  if (acceptanceValue != null) {
    normalizedAcceptance = acceptanceStatus(acceptanceValue);
  } else if (overall === 'review') {
    normalizedAcceptance = 'review';
  } else if (overall === 'done') {
    normalizedAcceptance = 'accepted';
  } else {
    normalizedAcceptance = 'pending';
  }

  return {
    executionStatus: normalizedExecution,
    acceptanceStatus: normalizedAcceptance,
  };
}

/**
 * Derive the single display/work-queue status without collapsing the two
 * persisted dimensions. Completed work is reviewed until explicitly accepted;
 * rejected work returns to idle for another execution cycle.
 */
export function deriveTaskStatus(task) {
  const { executionStatus: execution, acceptanceStatus: acceptance } = statusesOf(task);
  if (execution === 'needs_input') return 'needs_input';
  if (execution === 'blocked') return 'blocked';
  if (acceptance === 'review') return 'review';
  if (execution === 'running') return 'running';
  if (execution === 'done' && acceptance === 'accepted') return 'done';
  if (execution === 'done' && acceptance !== 'rejected') return 'review';
  return 'idle';
}

/** Normalize one task while preserving domain fields owned by other modules. */
export function normalizeTask(value) {
  const task = object(value);
  const statuses = statusesOf(task);
  return {
    ...task,
    id: text(task.id),
    title: text(task.title),
    description: text(task.description),
    ...statuses,
    status: deriveTaskStatus(statuses),
  };
}

function compareText(left, right) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function numericOrder(task) {
  const value = Number(task.order);
  return task.order !== '' && task.order != null && Number.isFinite(value) ? value : 0;
}

/**
 * Return normalized tasks in work-queue order. Actionable states come first;
 * explicit order, id, title, then original position provide deterministic ties.
 * Neither the input array nor any task object is mutated.
 */
export function sortTasks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((task, index) => ({ task: normalizeTask(task), index }))
    .sort((left, right) => {
      const a = left.task;
      const b = right.task;
      return (STATUS_RANK[a.status] - STATUS_RANK[b.status])
        || (numericOrder(a) - numericOrder(b))
        || compareText(a.id, b.id)
        || compareText(a.title, b.title)
        || (left.index - right.index);
    })
    .map(({ task }) => task);
}

function timestamp(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const raw = text(value);
  if (!raw) return 0;
  if (Number.isFinite(Number(raw))) return Number(raw);
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sequence(value, fallback) {
  const parsed = Number(value);
  return value !== '' && value != null && Number.isFinite(parsed) ? parsed : fallback;
}

/**
 * Normalize a flow event. Missing/invalid timestamps become zero rather than
 * the current time, keeping replay pure. Invalid events return null.
 */
export function normalizeFlowEvent(value, fallbackSequence = 0) {
  const event = object(value);
  const edgeKey = text(event.edgeKey);
  const state = text(event.state ?? event.status ?? event.toStatus ?? event.to);
  if (!edgeKey || !state) return null;
  return {
    ...event,
    id: text(event.id ?? event.eventId),
    edgeKey,
    state,
    timestamp: timestamp(event.timestamp ?? event.at ?? event.updatedAt ?? event.createdAt ?? event.time),
    sequence: sequence(event.sequence ?? event.seq, fallbackSequence),
  };
}

/**
 * Project the newest normalized event for every edgeKey. Timestamp wins, then
 * explicit sequence, then input order. Invalid events are ignored.
 */
export function projectFlowEvents(value) {
  if (!Array.isArray(value)) return {};
  const latest = new Map();
  value.forEach((raw, index) => {
    const event = normalizeFlowEvent(raw, index);
    if (!event) return;
    const previous = latest.get(event.edgeKey);
    const newer = !previous
      || event.timestamp > previous.event.timestamp
      || (event.timestamp === previous.event.timestamp && event.sequence > previous.event.sequence)
      || (event.timestamp === previous.event.timestamp
        && event.sequence === previous.event.sequence
        && index > previous.index);
    if (newer) latest.set(event.edgeKey, { event, index });
  });
  return Object.fromEntries(
    [...latest.entries()]
      .sort(([left], [right]) => compareText(left, right))
      .map(([edgeKey, { event }]) => [edgeKey, event]),
  );
}

/** Project only the newest state string for every edgeKey. */
export function projectFlowStates(events) {
  return Object.fromEntries(
    Object.entries(projectFlowEvents(events)).map(([edgeKey, event]) => [edgeKey, event.state]),
  );
}
