import { promises as fs } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

/**
 * Host half of the Inspiration Workbench.
 *
 * The board layout lives in the browser, so two windows (or two devices on the
 * same Host) would drift apart and clearing site data would lose the layout.
 * This half owns a single JSON document plus a Server-Sent-Events channel so
 * every open workbench converges on the same layout:
 *
 *   GET  /api/inspiration-workbench/layout   → { rev, updatedAt, layout }
 *   PUT  /api/inspiration-workbench/layout   → store layout, bump rev, broadcast
 *   GET  /api/inspiration-workbench/events   → SSE { rev } on every change
 *
 * Failure policy: every endpoint degrades to "no answer" (404/500) and the
 * client simply keeps using its localStorage copy, so a Host without a web
 * server, a missing file, or a corrupt document never breaks the workbench.
 */

const API_PREFIX = '/api/inspiration-workbench';

/** The Host exposes the web server through a Cordis service; declare it up front. */
export const inject = ['webServer'];
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const SAVE_DEBOUNCE_MS = 250;

function dataFilePath() {
  const home = process.env.DSH_HOME || join(homedir(), '.dsh');
  return join(home, 'inspiration-workbench-layout.json');
}

function createStore() {
  let layout = null;
  let updatedAt = 0;
  let rev = 0;
  let clientId = '';
  /** Named board snapshots: [{ id, name, savedAt, layout }] */
  let canvases = [];
  let activeCanvas = null;
  const listeners = new Set();
  let saveTimer = null;
  let loading = null;

  /** Read the document once; later reads must not reuse this snapshot. */
  async function ensureLoaded() {
    if (!loading) {
      loading = (async () => {
        try {
          const text = await fs.readFile(dataFilePath(), 'utf8');
          const parsed = JSON.parse(text);
          if (parsed && typeof parsed === 'object' && parsed.layout) {
            layout = parsed.layout;
            updatedAt = Number(parsed.updatedAt) || 0;
            rev = Number(parsed.rev) || 0;
          }
          if (parsed && Array.isArray(parsed.canvases)) canvases = parsed.canvases;
          if (parsed && typeof parsed.activeCanvas === 'string') activeCanvas = parsed.activeCanvas;
        } catch {
          /* first run, or the document is unreadable: start empty */
        }
      })();
    }
    return loading;
  }

  function snapshot() {
    return { layout, updatedAt, rev };
  }

  /**
   * Full canvases, layouts included: the client keeps them in memory so it can
   * switch boards without another round-trip, and a reload must be able to
   * restore any saved canvas, not just its name.
   */
  function canvasList() {
    return canvases;
  }

  async function putCanvases(next, active) {
    await ensureLoaded();
    canvases = Array.isArray(next) ? next : [];
    activeCanvas = typeof active === 'string' ? active : null;
    updatedAt = Date.now();
    rev += 1;
    scheduleSave();
    broadcast();
    return { rev, updatedAt };
  }

  function scheduleSave() {
    if (saveTimer) return;
    saveTimer = setTimeout(async () => {
      saveTimer = null;
      try {
        await fs.mkdir(join(dataFilePath(), '..'), { recursive: true });
        await fs.writeFile(
          dataFilePath(),
          JSON.stringify({ rev, updatedAt, layout, canvases, activeCanvas }),
          'utf8'
        );
      } catch {
        /* a read-only Host keeps the invariant in memory only */
      }
    }, SAVE_DEBOUNCE_MS);
    saveTimer.unref?.();
  }

  function broadcast() {
    const payload = 'data: ' + JSON.stringify({ rev, updatedAt, clientId }) + '\n\n';
    for (const res of [...listeners]) {
      try {
        res.write(payload);
      } catch {
        listeners.delete(res);
      }
    }
  }

  async function put(nextLayout, sourceClientId) {
    await ensureLoaded();
    layout = nextLayout;
    clientId = typeof sourceClientId === 'string' ? sourceClientId : '';
    updatedAt = Date.now();
    rev += 1;
    scheduleSave();
    broadcast();
    return { rev, updatedAt };
  }

  return {
    ensureLoaded,
    snapshot,
    canvases: () => canvasList(),
    active: () => activeCanvas,
    put,
    putCanvases,
    subscribe(res) {
      listeners.add(res);
      return () => listeners.delete(res);
    },
    dispose() {
      if (saveTimer) clearTimeout(saveTimer);
      for (const res of listeners) {
        try {
          res.end();
        } catch {
          /* ignore */
        }
      }
      listeners.clear();
    },
  };
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

/** The workbench panel is only reachable from an authenticated page. */
function authorize(ctx, req, res) {
  let connection;
  try {
    connection = ctx.get?.('connection');
  } catch {
    connection = undefined;
  }
  const rejection = connection?.requestRejection?.(req);
  if (rejection === undefined) return true;
  res.writeHead(rejection, { 'content-type': 'text/plain' }).end(rejection === 401 ? 'Unauthorized' : 'Forbidden');
  return false;
}

export function apply(ctx) {
  const server = ctx.webServer;
  if (!server?.register) return;

  const store = createStore();
  const disposers = [];

  disposers.push(
    server.register({
      kind: 'prefix',
      path: API_PREFIX,
      handler: (req, res) => {
        if (!authorize(ctx, req, res)) return;
        const url = new URL(req.url || '/', 'http://inspiration-workbench.invalid');
        const route = url.pathname.slice(API_PREFIX.length) || '/';

        if (route === '/layout' || route === '/layout/') {
          if (req.method === 'GET') {
            res.setHeader('content-type', 'application/json');
            res.setHeader('cache-control', 'no-store');
            store
              .ensureLoaded()
              .then(() => {
                const current = store.snapshot();
                res.end(
                  JSON.stringify({ rev: current.rev, updatedAt: current.updatedAt, layout: current.layout })
                );
              })
              .catch(() => res.writeHead(500).end());
            return;
          }
          if (req.method === 'PUT' || req.method === 'POST') {
            readBody(req, MAX_BODY_BYTES)
              .then(async (text) => {
                const parsed = JSON.parse(text);
                if (!parsed || typeof parsed !== 'object' || !parsed.layout) {
                  res.writeHead(400).end('bad layout');
                  return;
                }
                const result = await store.put(parsed.layout, parsed.clientId);
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(result));
              })
              .catch(() => res.writeHead(400).end('bad request'));
            return;
          }
          res.writeHead(405, { allow: 'GET, PUT' }).end();
          return;
        }

        if (route === '/canvases' || route === '/canvases/') {
          if (req.method === 'GET') {
            res.setHeader('content-type', 'application/json');
            res.setHeader('cache-control', 'no-store');
            store
              .ensureLoaded()
              .then(() => store.snapshot())
              .then(() => {
                res.end(JSON.stringify({ canvases: store.canvases(), activeCanvas: store.active() }));
              })
              .catch(() => res.writeHead(500).end());
            return;
          }
          if (req.method === 'PUT' || req.method === 'POST') {
            readBody(req, MAX_BODY_BYTES)
              .then(async (text) => {
                const parsed = JSON.parse(text);
                if (!parsed || !Array.isArray(parsed.canvases)) {
                  res.writeHead(400).end('bad canvases');
                  return;
                }
                const result = await store.putCanvases(parsed.canvases, parsed.activeCanvas);
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(result));
              })
              .catch(() => res.writeHead(400).end('bad request'));
            return;
          }
          res.writeHead(405, { allow: 'GET, PUT' }).end();
          return;
        }

        if (route === '/events' || route === '/events/') {
          if (req.method !== 'GET') {
            res.writeHead(405, { allow: 'GET' }).end();
            return;
          }
          res.writeHead(200, {
            'content-type': 'text/event-stream',
            'cache-control': 'no-store',
            connection: 'keep-alive',
          });
          res.write('retry: 3000\n\n');
          store.ensureLoaded().then(() => {
            res.write('data: ' + JSON.stringify({ rev: store.snapshot().rev, clientId: '' }) + '\n\n');
          });
          const unsubscribe = store.subscribe(res);
          const ping = setInterval(() => {
            try {
              res.write(': ping\n\n');
            } catch {
              clearInterval(ping);
            }
          }, 25000);
          ping.unref?.();
          req.on('close', () => {
            clearInterval(ping);
            unsubscribe();
          });
          return;
        }

        res.writeHead(404).end();
      },
    })
  );

  ctx.effect(
    () => () => {
      store.dispose();
      for (const dispose of disposers) {
        try {
          dispose?.();
        } catch {
          /* ignore */
        }
      }
    },
    'inspiration-workbench: host layout store'
  );
}
