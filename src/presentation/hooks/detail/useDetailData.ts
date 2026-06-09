import { useState, useEffect, useCallback } from 'react';
import { error as logError } from '@/shared/utils/logger';
import { dataCache } from '@/shared/state/dataCache';

/**
 * 상세 데이터 조회를 위한 커스텀 훅
 * 
 * @template T - 상세 데이터 타입
 * 
 * @param fetchFunction - 데이터 조회 함수
 * @param id - 조회할 ID
 * @param errorMessage - 에러 발생 시 표시할 메시지
 * 
 * @returns { data, loading, error, setData }
 */
interface DetailDataOptions {
  cacheKey?: string;
  cacheTime?: number;
  onError?: (message: string) => void;
  /** false면 API 호출 없이 loading만 해제 */
  enabled?: boolean;
}

export function useDetailData<T>(
  fetchFunction: (id: string, signal?: AbortSignal) => Promise<T>,
  id: string | undefined,
  errorMessage: string = '데이터를 불러오는데 실패했습니다.',
  options: DetailDataOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { cacheKey, cacheTime = 5 * 60 * 1000, onError, enabled = true } = options;

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      setError(null);
      return;
    }

    const abortController = new AbortController();
    let isCancelled = false;

    const loadData = async () => {
      if (!id) {
        if (!isCancelled) {
          setError('ID가 없습니다.');
          setLoading(false);
        }
        return;
      }

      try {
        if (!isCancelled) {
          const cachedValue = dataCache.get<T>(cacheKey ? `${cacheKey}:${id}` : undefined);
          if (cachedValue) {
            setData(cachedValue);
            setLoading(false);
          } else {
            setLoading(true);
            setError(null);
          }
        }

        const result = await fetchFunction(id, abortController.signal);

        if (!isCancelled && !abortController.signal.aborted) {
          setData(result);
          dataCache.set(cacheKey ? `${cacheKey}:${id}` : undefined, result, cacheTime);
        }
      } catch (err) {
        // AbortError는 무시 (요청이 취소된 경우)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!isCancelled && !abortController.signal.aborted) {
          const errorMsg = err instanceof Error ? err.message : errorMessage;
          setError(errorMsg);
          onError?.(errorMsg);
          logError('useDetailData', '상세 조회 실패:', err);
        }
      } finally {
        if (!isCancelled && !abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // cleanup 함수: 컴포넌트가 언마운트되거나 id가 변경되면 이전 요청을 취소
    return () => {
      isCancelled = true;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, enabled]);

  const updateData = useCallback(
    (updater: React.SetStateAction<T | null>) => {
      setData((prev) => {
        const next = typeof updater === 'function' ? (updater as (prevState: T | null) => T | null)(prev) : updater;
        if (next) {
          dataCache.set(cacheKey ? `${cacheKey}:${id}` : undefined, next, cacheTime);
        } else {
          dataCache.delete(cacheKey ? `${cacheKey}:${id}` : undefined);
        }
        return next;
      });
    },
    [cacheKey, cacheTime, id]
  );

  return {
    data,
    loading,
    error,
    setData: updateData,
  };
}

