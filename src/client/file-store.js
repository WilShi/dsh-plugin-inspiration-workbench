/** Binary file persistence for canvas cards. Metadata stays in layout JSON; blobs live in IndexedDB. */
const DB_NAME = 'inspiration-workbench-files';
const STORE_NAME = 'files';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function createFileStore() {
  const memory = new Map();
  let databasePromise = null;
  const database = () => {
    if (typeof indexedDB === 'undefined') return null;
    databasePromise ||= openDatabase().catch(() => null);
    return databasePromise;
  };

  return {
    async put(file) {
      const id = file.id || 'file-' + crypto.randomUUID();
      const record = {
        id,
        name: file.name || '未命名文件',
        type: file.type || 'application/octet-stream',
        size: Number(file.size) || 0,
        lastModified: Number(file.lastModified) || Date.now(),
        blob: file.blob || file,
      };
      memory.set(id, record);
      const db = await database();
      if (db) {
        await new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE_NAME, 'readwrite');
          transaction.objectStore(STORE_NAME).put(record);
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error);
        });
      }
      return id;
    },
    async get(id) {
      const db = await database();
      if (db) {
        const stored = await new Promise((resolve, reject) => {
          const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(id);
          request.onsuccess = () => resolve(request.result || null);
          request.onerror = () => reject(request.error);
        });
        if (stored) return stored;
      }
      return memory.get(id) || null;
    },
    async remove(id) {
      memory.delete(id);
      const db = await database();
      if (db) {
        await new Promise((resolve, reject) => {
          const transaction = db.transaction(STORE_NAME, 'readwrite');
          transaction.objectStore(STORE_NAME).delete(id);
          transaction.oncomplete = resolve;
          transaction.onerror = () => reject(transaction.error);
        });
      }
    },
  };
}
