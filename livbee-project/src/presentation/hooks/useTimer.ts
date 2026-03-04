import { useState, useEffect, useCallback } from 'react';

/**
 * 카운트다운 타이머 훅
 * @param initialSeconds 초기 초 (기본 180 = 3분)
 * @returns secondsLeft, isRunning, start, reset
 */
export function useTimer(initialSeconds = 180) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, secondsLeft]);

  const start = useCallback(() => {
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  return { secondsLeft, isRunning, start, reset };
}
