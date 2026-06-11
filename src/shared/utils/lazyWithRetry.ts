import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { error as logError } from '@/shared/utils/logger';

const CHUNK_RELOAD_KEY = 'livbee:chunk-reload';

const isChunkLoadError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }
  const message = error.message.toLowerCase();
  return (
    message.includes('failed to fetch dynamically imported module') ||
    message.includes('loading chunk') ||
    message.includes('loading css chunk') ||
    message.includes('importing a module script failed')
  );
};

const reloadOnceForChunkError = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
    return false;
  }
  sessionStorage.setItem(CHUNK_RELOAD_KEY, '1');
  window.location.reload();
  return true;
};

/**
 * 동적 import 실패 시 1회 재시도 + 배포 후 구버전 chunk 404면 페이지 새로고침
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lazyWithRetry = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): LazyExoticComponent<T> => {
  const load = (): Promise<{ default: T }> =>
    importFn().catch((error) => {
      logError('lazyWithRetry', 'Failed to load module:', error);

      if (isChunkLoadError(error) && reloadOnceForChunkError()) {
        return new Promise(() => {});
      }

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          importFn()
            .then((module) => {
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem(CHUNK_RELOAD_KEY);
              }
              resolve(module);
            })
            .catch((retryError) => {
              logError('lazyWithRetry', 'Retry failed:', retryError);
              if (isChunkLoadError(retryError) && reloadOnceForChunkError()) {
                return;
              }
              reject(retryError);
            });
        }, 1000);
      });
    });

  return lazy(load);
};
