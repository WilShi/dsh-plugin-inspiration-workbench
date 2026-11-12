/**
 * Client half of the Host-backed board layout.
 *
 * The Host exposes `/api/inspiration-workbench/{layout,events}`; this module is a
 * thin, failure-tolerant wrapper. Every call resolves to "nothing" when the Host
 * half is absent (older build, plain static server, offline), so callers can keep
 * treating localStorage as the working copy.
 */

const BASE = '/api/inspiration-workbench';

async function request(path, init) {
  const response = await fetch(BASE + path, { credentials: 'same-origin', ...init });
  if (!response.ok) throw new Error('layout ' + response.status);
  return response;
}

export async function fetchRemoteLayout() {
  try {
    const response = await request('/layout', { method: 'GET' });
    const body = await response.json();
    if (!body || typeof body !== 'object' || !body.layout) return null;
    return { rev: Number(body.rev) || 0, updatedAt: Number(body.updatedAt) || 0, layout: body.layout };
  } catch {
    return null;
  }
}

export async function pushRemoteLayout(layout, clientId) {
  try {
    const response = await request('/layout', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ layout, clientId }),
    });
    const body = await response.json().catch(() => ({}));
    return { rev: Number(body?.rev) || 0, updatedAt: Number(body?.updatedAt) || 0 };
  } catch {
    return null;
  }
}

/**
 * Subscribe to layout revisions from other windows.
 * @param listener - called with the new revision number.
 * @returns unsubscribe function; a no-op when EventSource is unavailable.
 */
export function subscribeRemoteLayout(listener) {
  if (typeof EventSource === 'undefined') return () => {};
  let source;
  try {
    source = new EventSource(BASE + '/events', { withCredentials: true });
  } catch {
    return () => {};
  }
  const onMessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload && typeof payload.rev === 'number') {
        listener(payload.rev, typeof payload.clientId === 'string' ? payload.clientId : '');
      }
    } catch {
      /* ignore malformed frames */
    }
  };
  source.addEventListener('message', onMessage);
  return () => {
    source.removeEventListener('message', onMessage);
    source.close();
  };
}

/** Named board snapshots, stored on the Host next to the working layout. */
export async function fetchCanvases() {
  try {
    const response = await request('/canvases', { method: 'GET' });
    const body = await response.json();
    return {
      canvases: Array.isArray(body?.canvases) ? body.canvases : [],
      activeCanvas: typeof body?.activeCanvas === 'string' ? body.activeCanvas : null,
    };
  } catch {
    return null;
  }
}

export async function pushCanvases(canvases, activeCanvas) {
  try {
    const response = await request('/canvases', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ canvases, activeCanvas }),
    });
    return await response.json().catch(() => ({}));
  } catch {
    return null;
  }
}
