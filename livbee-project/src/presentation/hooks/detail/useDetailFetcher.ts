import { useDetailData } from '@/presentation/hooks/detail/useDetailData';
import { useRepositoryMethod } from '@/presentation/hooks/detail/useRepositoryMethod';
import { useErrorHandler } from '@/presentation/hooks/detail/useErrorHandler';

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
 * SRP 준수: Repository 메서드 호출과 에러 처리를 각각의 훅에 위임
 */
export function useDetailFetcher<T, R extends object>({
  repository,
  method,
  id,
  errorMessage,
  cacheKey,
  cacheTime,
}: UseDetailFetcherOptions<R>) {
  const fetchFunction = useRepositoryMethod<T, R>(repository, method);
  const handleError = useErrorHandler(errorMessage);

  const resolvedCacheKey = cacheKey || `${repository.constructor.name}-${String(method)}`;

  return useDetailData<T>(fetchFunction, id, errorMessage, {
    cacheKey: resolvedCacheKey,
    cacheTime,
    onError: handleError,
  });
}

