import { useMemo } from 'react';
import { warn } from '@/shared/utils/logger';

/**
 * sessionStorage에서 폼 데이터를 복원하는 훅
 * @param storageKey sessionStorage 키
 * @param initialState 기본 초기 상태
 */
export const useFormStorageRestore = <T>(
  storageKey: string | undefined,
  initialState: T
): T | null => {
  return useMemo(() => {
    if (!storageKey || typeof window === 'undefined') {
      return null;
    }

    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch (error) {
      warn('useFormStorageRestore', `Failed to restore form state from sessionStorage (${storageKey}):`, error);
    }

    return null;
  }, [storageKey]);
};

