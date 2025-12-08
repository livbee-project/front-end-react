import { useCallback } from 'react';

/**
 * Repository 목록 메서드를 호출하는 함수를 생성하는 훅
 * SRP 준수: Repository 메서드 호출 로직만 담당
 */
export const useRepositoryListMethod = <T, Q, R extends object, Response extends { items: T[]; currentPage?: number; totalPages?: number }>(
  repository: R,
  method: keyof R
) => {
  return useCallback(
    (request: Q, signal?: AbortSignal) => {
      const fetchMethod = repository[method];
      if (typeof fetchMethod !== 'function') {
        return Promise.reject(new Error(`Repository method ${String(method)} is not a function`));
      }

      return (fetchMethod as (query: Q, signal?: AbortSignal) => Promise<Response>).call(repository, request, signal);
    },
    [repository, method]
  );
};

