import { useListData } from '@/presentation/hooks/list/useListData';
import { useRepositoryListMethod } from '@/presentation/hooks/list/useRepositoryListMethod';

interface UseListFetcherOptions<Q, R extends object> {
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
 * SRP 준수: Repository 메서드 호출 로직을 별도 훅에 위임
 */
export function useListFetcher<
  T,
  Q,
  R extends object,
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
  const fetchFunction = useRepositoryListMethod<T, Q, R, Response>(repository, method);

  const resolvedCacheKey = cacheKey || `${repository.constructor.name}-${String(method)}-${JSON.stringify(query)}`;

  return useListData<T, Q, Response>(fetchFunction, query, dependencies, errorMessage, {
    cacheKey: resolvedCacheKey,
    cacheTime,
  });
}

