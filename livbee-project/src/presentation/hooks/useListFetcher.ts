import { useCallback } from 'react';
import { useListData } from './useListData';

interface UseListFetcherOptions<Q, R extends Record<string, unknown>> {
  repository: R;
  method: keyof R;
  query: Q;
  dependencies: ReadonlyArray<unknown>;
  errorMessage?: string;
  cacheKey?: string;
  cacheTime?: number;
}

/**
 * Repository 메서드를 이용해 목록 데이터를 조회하는 공통 훅
 */
export function useListFetcher<
  T,
  Q,
  R extends Record<string, unknown>,
  Response extends { items: T[]; currentPage?: number; totalPages?: number }
>({
  repository,
  method,
  query,
  dependencies,
  errorMessage,
  cacheKey,
  cacheTime,
}: UseListFetcherOptions<Q, R>) {
  const fetchFunction = useCallback(
    (request: Q, signal?: AbortSignal) => {
      const fetchMethod = repository[method];
      if (typeof fetchMethod !== 'function') {
        return Promise.reject(new Error(`Repository method ${String(method)} is not a function`));
      }

      return (fetchMethod as (query: Q, signal?: AbortSignal) => Promise<Response>).call(repository, request, signal);
    },
    [repository, method]
  );

  const resolvedCacheKey = cacheKey || `${repository.constructor.name}-${String(method)}-${JSON.stringify(query)}`;

  return useListData<T, Q, Response>(fetchFunction, query, dependencies, errorMessage, {
    cacheKey: resolvedCacheKey,
    cacheTime,
  });
}

