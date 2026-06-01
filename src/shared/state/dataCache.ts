type CacheEntry<T> = {
  value: T;
  expiry?: number;
};

const cacheStore = new Map<string, CacheEntry<unknown>>();

export const dataCache = {
  get<T>(key?: string): T | null {
    if (!key) return null;
    const entry = cacheStore.get(key);
    if (!entry) return null;
    if (entry.expiry && entry.expiry < Date.now()) {
      cacheStore.delete(key);
      return null;
    }
    return entry.value as T;
  },

  set<T>(key?: string, value?: T, ttlMs?: number) {
    if (!key || value === undefined) return;
    cacheStore.set(key, {
      value,
      expiry: ttlMs ? Date.now() + ttlMs : undefined,
    });
  },

  delete(key?: string) {
    if (!key) return;
    cacheStore.delete(key);
  },

  deleteByPrefix(prefix: string) {
    if (!prefix) return;
    for (const key of cacheStore.keys()) {
      if (key.startsWith(prefix)) {
        cacheStore.delete(key);
      }
    }
  },

  clear() {
    cacheStore.clear();
  },
};

