import { useCallback } from 'react';

/**
 * Repository 메서드를 호출하는 함수를 생성하는 훅
 * SRP 준수: Repository 메서드 호출 로직만 담당
 */
export const useRepositoryMethod = <T, R extends object>(
  repository: R,
  method: keyof R
) => {
  return useCallback(
    (targetId: string, signal?: AbortSignal) => {
      const fetchMethod = repository[method];
      if (typeof fetchMethod !== 'function') {
        return Promise.reject(new Error(`Repository method ${String(method)} is not a function`));
      }

      return (fetchMethod as (id: string, signal?: AbortSignal) => Promise<T>).call(repository, targetId, signal);
    },
    [repository, method]
  );
};

