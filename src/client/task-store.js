import { fetchTaskState, pushTaskState, subscribeRemoteLayout } from './persistence.js';

const TASK_STORAGE_KEY = 'dsh.inspiration-workbench.tasks.v1';

/** Task metadata + flow history, with an offline local copy and Host convergence. */
export function createTaskStore(options = {}) {
  const clientId = options.clientId || Math.random().toString(36).slice(2) + Date.now().toString(36);
  const storage = options.storage || (typeof window !== 'undefined' ? window.localStorage : null);
  const fetchRemote = options.fetchRemote || fetchTaskState;
  const pushRemote = options.pushRemote || pushTaskState;
  const subscribe = options.subscribe || subscribeRemoteLayout;
  const listeners = new Set();
  let tasks = [];
  let flowEvents = [];
  let updatedAt = 0;
  let rev = 0;
  let saveTimer = 0;
  let disposed = false;
  let stopSync = null;

  function snapshot() {
    return { tasks: tasks.slice(), flowEvents: flowEvents.slice(), updatedAt, rev };
  }
  function notify() {
    const value = snapshot();
    for (const listener of listeners) listener(value);
  }
  function readLocal() {
    try {
      const parsed = JSON.parse(storage?.getItem(TASK_STORAGE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object') return null;
      return {
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
        flowEvents: Array.isArray(parsed.flowEvents) ? parsed.flowEvents : [],
        updatedAt: Number(parsed.updatedAt) || 0,
      };
    } catch { return null; }
  }
  function writeLocal() {
    try { storage?.setItem(TASK_STORAGE_KEY, JSON.stringify({ tasks, flowEvents, updatedAt })); } catch { /* Host may still save */ }
  }
  function adopt(value) {
    tasks = Array.isArray(value?.tasks) ? value.tasks : [];
    flowEvents = Array.isArray(value?.flowEvents) ? value.flowEvents : [];
    updatedAt = Number(value?.updatedAt) || 0;
    rev = Number(value?.rev) || rev;
    writeLocal();
    notify();
  }

  async function load() {
    const local = readLocal();
    if (local) adopt(local);
    const remote = await fetchRemote();
    if (remote && Number(remote.updatedAt) >= updatedAt) adopt(remote);
    if (!stopSync) {
      stopSync = subscribe((nextRev, sourceId) => {
        if (disposed || nextRev === rev || (sourceId && sourceId === clientId) || saveTimer) return;
        rev = nextRev;
        void fetchRemote().then((remoteState) => {
          if (remoteState && Number(remoteState.updatedAt) > updatedAt && !saveTimer) adopt(remoteState);
        });
      });
    }
    return snapshot();
  }

  function saveSoon() {
    if (disposed) return;
    updatedAt = Date.now();
    writeLocal();
    notify();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      saveTimer = 0;
      const result = await pushRemote(tasks, flowEvents, clientId);
      if (result?.rev) rev = result.rev;
      if (result?.updatedAt) updatedAt = result.updatedAt;
    }, 220);
  }

  return {
    snapshot,
    load,
    saveSoon,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setTasks(next) { tasks = Array.isArray(next) ? next : []; saveSoon(); },
    addTasks(next) {
      const additions = Array.isArray(next) ? next : [];
      if (!additions.length) return;
      const byId = new Map(tasks.map((task) => [task.id, task]));
      for (const task of additions) byId.set(task.id, { ...byId.get(task.id), ...task });
      tasks = [...byId.values()];
      saveSoon();
    },
    updateTask(id, patch) {
      tasks = tasks.map((task) => task.id === id ? { ...task, ...patch, id, updatedAt: Date.now() } : task);
      saveSoon();
    },
    removeTask(id) { tasks = tasks.filter((task) => task.id !== id); saveSoon(); },
    setFlowEvents(next) { flowEvents = Array.isArray(next) ? next.slice(-500) : []; saveSoon(); },
    async flush() {
      clearTimeout(saveTimer);
      saveTimer = 0;
      return await pushRemote(tasks, flowEvents, clientId);
    },
    dispose() {
      disposed = true;
      clearTimeout(saveTimer);
      stopSync?.();
      stopSync = null;
      listeners.clear();
    },
  };
}
