/**
 * Inline approval hub.
 *
 * The shipped approval UI answers the `approval/request` client waterfall and
 * delegates (`next()`) whenever the conversation view that owns the listener is
 * not mounted — which is exactly the workbench case: the main panel shows the
 * board, so no native conversation scope exists for the card's session.
 *
 * This hub only ever takes requests whose session is on the board, and only
 * while the feature is switched on. Everything else is passed straight through
 * to the native listener, so behaviour without the workbench is unchanged.
 */

const OUTCOME_ALLOW = 'allowed-once';
const OUTCOME_REJECT = 'rejected';
const OUTCOME_CANCELLED = 'cancelled';

export function createApprovalHub() {
  const pending = new Map();
  const listeners = new Set();
  const openSessions = new Set();
  let enabled = false;
  let nextId = 0;

  const notify = () => {
    for (const listener of listeners) {
      try {
        listener();
      } catch {
        /* a broken view must not break the waterfall */
      }
    }
  };

  function settle(id, outcome) {
    const entry = pending.get(id);
    if (!entry) return false;
    pending.delete(id);
    notify();
    try {
      entry.resolve(outcome);
    } catch {
      /* resolving twice is harmless */
    }
    return true;
  }

  /** Hand a live waterfall request to the board; resolves with the outcome. */
  function request(sessionId, raw) {
    nextId += 1;
    const id = raw?.callId ? String(raw.callId) : 'approval-' + nextId;
    return new Promise((resolve) => {
      const entry = {
        id,
        sessionId,
        toolName: raw?.toolName || '',
        reason: raw?.displayReason || raw?.reason || '',
        resolve,
      };
      pending.set(id, entry);
      notify();
      const signal = raw?.signal;
      if (signal && typeof signal.addEventListener === 'function') {
        signal.addEventListener('abort', () => settle(id, OUTCOME_CANCELLED), { once: true });
      }
    });
  }

  return {
    OUTCOME_ALLOW,
    OUTCOME_REJECT,
    get enabled() {
      return enabled;
    },
    setEnabled(value) {
      enabled = Boolean(value);
      if (!enabled) {
        // Never leave a host-side waterfall hanging once the feature is off.
        for (const id of [...pending.keys()]) settle(id, OUTCOME_CANCELLED);
      }
      notify();
    },
    setOpenSessions(ids) {
      openSessions.clear();
      for (const id of ids || []) openSessions.add(id);
    },
    hasSession(id) {
      return openSessions.has(id);
    },
    list(sessionId) {
      return [...pending.values()].filter((entry) => entry.sessionId === sessionId);
    },
    size() {
      return pending.size;
    },
    settle,
    /**
     * Settle the request that matches a session event's approval id. Event ids
     * and waterfall callIds are usually identical; when they are not, a single
     * pending request for that session is still unambiguous.
     */
    settleFor(sessionId, approvalId, outcome) {
      if (approvalId && pending.has(String(approvalId))) return settle(String(approvalId), outcome);
      const candidates = [...pending.values()].filter((entry) => entry.sessionId === sessionId);
      if (candidates.length === 1) return settle(candidates[0].id, outcome);
      return false;
    },
    hasFor(sessionId, approvalId) {
      if (approvalId && pending.has(String(approvalId))) return true;
      return [...pending.values()].some((entry) => entry.sessionId === sessionId);
    },
    request,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
