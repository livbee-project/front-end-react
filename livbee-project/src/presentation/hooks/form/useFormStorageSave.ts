import { useEffect, useRef, useCallback } from 'react';
import { warn } from '@/shared/utils/logger';

/**
 * sessionStorage에 폼 데이터를 저장하는 훅
 * @param storageKey sessionStorage 키
 * @param formData 저장할 폼 데이터
 */
export const useFormStorageSave = <T>(
  storageKey: string | undefined,
  formData: T
) => {
  const isInitialMountRef = useRef(true);

  // 초기 마운트 완료 표시
  useEffect(() => {
    isInitialMountRef.current = false;
  }, []);

  // sessionStorage에 저장 (초기 마운트 제외, 실제 변경 시에만 저장)
  useEffect(() => {
    if (isInitialMountRef.current || !storageKey || typeof window === 'undefined') {
      return;
    }

    try {
      const currentStored = sessionStorage.getItem(storageKey);
      const newValue = JSON.stringify(formData);

      // 이전 값과 다를 때만 저장 (불필요한 저장 방지)
      if (currentStored !== newValue) {
        sessionStorage.setItem(storageKey, newValue);
      }
    } catch (error) {
      warn('useFormStorageSave', `Failed to save form state to sessionStorage (${storageKey}):`, error);
    }
  }, [formData, storageKey]);

  /**
   * sessionStorage에서 폼 데이터를 삭제합니다.
   */
  const clearStorage = useCallback(() => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(storageKey);
      } catch (error) {
        warn('useFormStorageSave', `Failed to clear form state from sessionStorage (${storageKey}):`, error);
      }
    }
  }, [storageKey]);

  return {
    clearStorage,
  };
};

