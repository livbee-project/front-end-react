import { useCallback } from 'react';
import { useDetailData } from '@/presentation/hooks/detail/useDetailData';
import { useToast } from '@/presentation/contexts/ToastContext';

interface UseDetailFetcherOptions<R extends object> {
  repository: R;
  method: keyof R;
  id: string | undefined;
  errorMessage?: string;
  cacheKey?: string;
  cacheTime?: number;
}

/**
 * Repository 메서드를 이용해 상세 데이터를 조회하는 공통 훅
 */
export function useDetailFetcher<T, R extends object>({
  repository,
  method,
  id,
  errorMessage,
  cacheKey,
  cacheTime,
}: UseDetailFetcherOptions<R>) {
  const { showToast } = useToast();
  const fetchFunction = useCallback(
    (targetId: string, signal?: AbortSignal) => {
      const fetchMethod = repository[method];
      if (typeof fetchMethod !== 'function') {
        return Promise.reject(new Error(`Repository method ${String(method)} is not a function`));
      }

      return (fetchMethod as (id: string, signal?: AbortSignal) => Promise<T>).call(repository, targetId, signal);
    },
    [repository, method]
  );

  const resolvedCacheKey = cacheKey || `${repository.constructor.name}-${String(method)}`;

  return useDetailData<T>(fetchFunction, id, errorMessage, {
    cacheKey: resolvedCacheKey,
    cacheTime,
    onError: (message) => showToast(message, undefined, 'error'),
  });
}

