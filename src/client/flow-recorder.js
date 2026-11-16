/** Bounded, append-only record of actual pipeline delivery attempts. */
export function createFlowRecorder({ initialEvents, onChange, now = () => Date.now(), limit = 500 }) {
  let events = (Array.isArray(initialEvents) ? initialEvents : []).filter((event) => event && typeof event === 'object').slice(-limit);
  let sequence = events.length;

  function notify() {
    onChange?.(events.slice());
  }

  function record(input) {
    const sourceSessionId = String(input?.sourceSessionId || '');
    const targetId = String(input?.targetId || '');
    if (!sourceSessionId || !targetId) return null;
    const targetKind = input?.targetKind === 'note' ? 'note' : 'session';
    const event = {
      id: String(input?.id || 'flow-' + now().toString(36) + '-' + (++sequence).toString(36)),
      at: Number(input?.at) || now(),
      canvasId: String(input?.canvasId || ''),
      taskId: String(input?.taskId || ''),
      sourceSessionId,
      targetId,
      targetKind,
      edgeKey: String(input?.edgeKey || sourceSessionId + '=>' + targetKind + ':' + targetId),
      status: String(input?.status || 'waiting'),
      mode: input?.mode === 'draft' ? 'draft' : 'send',
      message: String(input?.message || '').slice(0, 500),
      fingerprint: String(input?.fingerprint || '').slice(0, 180),
    };
    events = [...events, event].slice(-limit);
    notify();
    return event;
  }

  return {
    record,
    events: () => events.slice(),
    latestByEdge() {
      const latest = new Map();
      for (const event of events) {
        const previous = latest.get(event.edgeKey);
        if (!previous || event.at >= previous.at) latest.set(event.edgeKey, event);
      }
      return latest;
    },
    forCanvas(canvasId) {
      if (!canvasId) return [];
      return events.filter((event) => event.canvasId === canvasId);
    },
    replace(next) {
      events = (Array.isArray(next) ? next : []).filter((event) => event && typeof event === 'object').slice(-limit);
      sequence = events.length;
    },
    clear() {
      events = [];
      notify();
    },
  };
}
