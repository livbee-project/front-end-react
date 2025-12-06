import { useCallback, useState } from 'react';

/**
 * 스크랩 토글 상태를 관리하는 공통 훅
 * 여러 목록 페이지에서 동일한 스크랩 토글 로직을 공유합니다.
 */
export const useScrapToggle = () => {
  const [scrapMap, setScrapMap] = useState<Record<string, boolean>>({});

  const handleScrapToggle = useCallback((id: string) => {
    setScrapMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const isScrapped = useCallback((id: string) => {
    return Boolean(scrapMap[id]);
  }, [scrapMap]);

  const resetScrapMap = useCallback(() => {
    setScrapMap({});
  }, []);

  return {
    scrapMap,
    handleScrapToggle,
    isScrapped,
    resetScrapMap,
  };
};

