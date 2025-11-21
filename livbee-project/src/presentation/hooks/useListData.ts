import { useState, useEffect } from 'react';

/**
 * 목록 데이터 조회를 위한 커스텀 훅
 * 
 * @template T - 목록 아이템 타입
 * @template Q - 쿼리 타입
 * @template Response - API 응답 타입 (items, currentPage, totalPages 포함)
 * 
 * @param fetchFunction - 데이터 조회 함수
 * @param query - 조회 쿼리
 * @param dependencies - useEffect 의존성 배열
 * @param errorMessage - 에러 발생 시 표시할 메시지
 * 
 * @returns { data, loading, error, currentPage, totalPages, setCurrentPage, setTotalPages }
 */
export function useListData<T, Q, Response extends { items: T[]; currentPage?: number; totalPages?: number }>(
  fetchFunction: (query: Q, signal?: AbortSignal) => Promise<Response>,
  query: Q,
  dependencies: any[],
  errorMessage: string = '데이터를 불러오는 중 오류가 발생했습니다.'
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const loadData = async () => {
      try {
        if (!isCancelled) {
          setLoading(true);
          setError(null);
        }

        const response = await fetchFunction(query, abortController.signal);

        if (!isCancelled && !abortController.signal.aborted) {
          setData(response.items);
          if (response.currentPage !== undefined) {
            setCurrentPage(response.currentPage);
          }
          if (response.totalPages !== undefined) {
            setTotalPages(response.totalPages);
          }
        }
      } catch (err) {
        // AbortError는 무시 (요청이 취소된 경우)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!isCancelled && !abortController.signal.aborted) {
          console.error('목록 조회 실패:', err);
          setError(errorMessage);
          setData([]);
        }
      } finally {
        if (!isCancelled && !abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // cleanup 함수: 컴포넌트가 언마운트되거나 의존성이 변경되면 이전 요청을 취소
    return () => {
      isCancelled = true;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
  };
}

