import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';

import { apply, createStore } from '../src/host/index.js';
import { fetchTaskState, pushTaskState } from '../src/client/persistence.js';

const SAVE_WAIT_MS = 325;

async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'iwb-host-store-'));
  const filePath = join(dir, 'inspiration-workbench-layout.json');
  t.after(() => rm(dir, { recursive: true, force: true }));
  return { dir, filePath };
}

function trackStore(t, filePath) {
  const store = createStore(filePath);
  t.after(() => store.dispose());
  return store;
}

async function waitForSave() {
  await new Promise((resolve) => setTimeout(resolve, SAVE_WAIT_MS));
}

test('task writes are bounded, broadcast, and share the legacy JSON document', async (t) => {
  const { filePath } = await fixture(t);
  const store = trackStore(t, filePath);
  const layout = { cards: [{ sessionId: 'session-1' }], stacks: [] };
  const canvases = [{ id: 'cv1', name: 'Canvas', layout }];

  await store.put(layout, 'layout-client');
  await store.putCanvases(canvases, 'cv1');

  const frames = [];
  const listener = { write: (chunk) => frames.push(chunk), end() {} };
  store.subscribe(listener);
  const tasks = Array.from({ length: 205 }, (_, index) => ({ id: 'task-' + index }));
  const flowEvents = Array.from({ length: 505 }, (_, index) => ({ id: 'event-' + index }));
  const result = await store.putTasks(tasks, flowEvents, 'task-client');

  assert.equal(result.rev, 3);
  assert.equal(store.snapshot().rev, 3);
  assert.equal(store.taskState().tasks.length, 200);
  assert.equal(store.taskState().tasks[0].id, 'task-5');
  assert.equal(store.taskState().flowEvents.length, 500);
  assert.equal(store.taskState().flowEvents[0].id, 'event-5');

  const event = JSON.parse(frames.at(-1).replace(/^data: /, ''));
  assert.equal(event.rev, result.rev);
  assert.equal(event.updatedAt, result.updatedAt);
  assert.equal(event.clientId, 'task-client');

  await waitForSave();
  const saved = JSON.parse(await readFile(filePath, 'utf8'));
  assert.deepEqual(saved.layout, layout);
  assert.deepEqual(saved.canvases, canvases);
  assert.equal(saved.activeCanvas, 'cv1');
  assert.equal(saved.tasks.length, 200);
  assert.equal(saved.flowEvents.length, 500);

  const reloaded = trackStore(t, filePath);
  await reloaded.ensureLoaded();
  assert.equal(reloaded.snapshot().rev, result.rev);
  assert.equal(reloaded.snapshot().updatedAt, result.updatedAt);
  assert.deepEqual(reloaded.snapshot().layout, layout);
  assert.deepEqual(reloaded.canvases(), canvases);
  assert.equal(reloaded.active(), 'cv1');
  assert.equal(reloaded.taskState().tasks.at(-1).id, 'task-204');
  assert.equal(reloaded.taskState().flowEvents.at(-1).id, 'event-504');
});

test('legacy and task-only documents load without losing revisions', async (t) => {
  const legacy = await fixture(t);
  await writeFile(
    legacy.filePath,
    JSON.stringify({
      rev: 9,
      updatedAt: 90,
      layout: { cards: [{ sessionId: 'legacy' }] },
      canvases: [],
      activeCanvas: null,
    })
  );
  const legacyStore = trackStore(t, legacy.filePath);
  await legacyStore.ensureLoaded();
  assert.equal(legacyStore.snapshot().rev, 9);
  assert.equal(legacyStore.snapshot().updatedAt, 90);
  assert.equal(legacyStore.snapshot().layout.cards[0].sessionId, 'legacy');
  assert.deepEqual(legacyStore.taskState(), { tasks: [], flowEvents: [] });

  const taskOnly = await fixture(t);
  await writeFile(
    taskOnly.filePath,
    JSON.stringify({
      rev: 4,
      updatedAt: 40,
      layout: null,
      tasks: [{ id: 'task-only' }],
      flowEvents: [{ id: 'flow-only' }],
    })
  );
  const taskStore = trackStore(t, taskOnly.filePath);
  await taskStore.ensureLoaded();
  assert.equal(taskStore.snapshot().rev, 4);
  assert.equal(taskStore.snapshot().updatedAt, 40);
  assert.deepEqual(taskStore.taskState(), {
    tasks: [{ id: 'task-only' }],
    flowEvents: [{ id: 'flow-only' }],
  });
});

function dispatch(handler, method, body, suffix = '/tasks') {
  return new Promise((resolve) => {
    const req = new Readable({ read() {} });
    req.method = method;
    req.url = '/api/inspiration-workbench' + suffix;
    process.nextTick(() => {
      if (body !== undefined) req.push(body);
      req.push(null);
    });

    const chunks = [];
    const headers = {};
    const res = {
      statusCode: 200,
      setHeader(name, value) {
        headers[name.toLowerCase()] = value;
      },
      writeHead(status, extra = {}) {
        this.statusCode = status;
        Object.assign(headers, extra);
        return this;
      },
      write(chunk) {
        chunks.push(Buffer.from(chunk));
        return true;
      },
      end(chunk) {
        if (chunk) chunks.push(Buffer.from(chunk));
        resolve({
          status: this.statusCode,
          headers,
          text: Buffer.concat(chunks).toString('utf8'),
        });
      },
    };
    handler(req, res);
  });
}

test('tasks HTTP API supports GET/PUT and rejects malformed payloads', async (t) => {
  const { dir, filePath } = await fixture(t);
  const previousHome = process.env.DSH_HOME;
  process.env.DSH_HOME = dir;
  t.after(() => {
    if (previousHome === undefined) delete process.env.DSH_HOME;
    else process.env.DSH_HOME = previousHome;
  });

  let handler;
  let teardown;
  const ctx = {
    webServer: {
      register(route) {
        handler = route.handler;
        return () => {};
      },
    },
    effect(fn) {
      teardown = fn();
      return teardown;
    },
  };
  apply(ctx);
  t.after(() => teardown?.());

  const empty = await dispatch(handler, 'GET');
  assert.equal(empty.status, 200);
  assert.equal(empty.headers['cache-control'], 'no-store');
  assert.deepEqual(JSON.parse(empty.text), { rev: 0, updatedAt: 0, tasks: [], flowEvents: [] });

  const tasks = [{ id: 'api-task', title: 'Persist me' }];
  const flowEvents = [{ id: 'api-event', status: 'done' }];
  const put = await dispatch(
    handler,
    'PUT',
    JSON.stringify({ tasks, flowEvents, clientId: 'api-client' })
  );
  assert.equal(put.status, 200);
  assert.equal(JSON.parse(put.text).rev, 1);

  const fetched = await dispatch(handler, 'GET');
  const state = JSON.parse(fetched.text);
  assert.equal(state.rev, 1);
  assert.deepEqual(state.tasks, tasks);
  assert.deepEqual(state.flowEvents, flowEvents);

  const invalid = await dispatch(handler, 'PUT', JSON.stringify({ tasks }));
  assert.equal(invalid.status, 400);
  assert.equal(invalid.text, 'bad tasks');

  await waitForSave();
  assert.deepEqual(JSON.parse(await readFile(filePath, 'utf8')).tasks, tasks);
});

test('client task helpers serialize state and degrade to null', async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    if (init.method === 'GET') {
      return new Response(
        JSON.stringify({ rev: 7, updatedAt: 70, tasks: [{ id: 't1' }], flowEvents: [{ id: 'e1' }] }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
    }
    return new Response(JSON.stringify({ rev: 8, updatedAt: 80 }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  };

  assert.deepEqual(await fetchTaskState(), {
    rev: 7,
    updatedAt: 70,
    tasks: [{ id: 't1' }],
    flowEvents: [{ id: 'e1' }],
  });
  assert.deepEqual(await pushTaskState([{ id: 't2' }], [{ id: 'e2' }], 'client-2'), {
    rev: 8,
    updatedAt: 80,
  });
  assert.equal(calls[0].url, '/api/inspiration-workbench/tasks');
  assert.equal(calls[0].init.credentials, 'same-origin');
  assert.equal(calls[1].init.method, 'PUT');
  assert.deepEqual(JSON.parse(calls[1].init.body), {
    tasks: [{ id: 't2' }],
    flowEvents: [{ id: 'e2' }],
    clientId: 'client-2',
  });

  globalThis.fetch = async () => {
    throw new Error('offline');
  };
  assert.equal(await fetchTaskState(), null);
  assert.equal(await pushTaskState([], []), null);

  globalThis.fetch = async () => new Response('not found', { status: 404 });
  assert.equal(await fetchTaskState(), null);
  assert.equal(await pushTaskState([], []), null);

  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  assert.equal(await fetchTaskState(), null);
});
