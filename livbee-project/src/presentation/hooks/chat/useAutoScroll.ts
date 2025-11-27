import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAutoScrollParams {
  observe?: unknown;
}

export const useAutoScroll = ({ observe }: UseAutoScrollParams = {}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
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

