import { useCallback, useLayoutEffect, useRef, useState } from 'react';

interface UseAutoScrollParams {
  observe?: unknown;
}

export const useAutoScroll = ({ observe }: UseAutoScrollParams = {}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      // requestAnimationFrame을 사용하여 DOM 업데이트 후 스크롤 실행
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }
  }, []);

  // useLayoutEffect를 사용하여 렌더링 직후에 스크롤 실행
  useLayoutEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [autoScroll, scrollToBottom, observe]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isBottom = scrollHeight - (scrollTop + clientHeight) < 60;
    setAutoScroll(isBottom);
  }, []);

  return {
    scrollRef,
    autoScroll,
    setAutoScroll,
    handleScroll,
    scrollToBottom,
  };
};

