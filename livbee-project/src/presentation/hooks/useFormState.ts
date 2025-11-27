import { useCallback, useState, useEffect } from 'react';
import { warn } from '@/shared/utils/logger';

/**
 * 범용 폼 상태를 관리하는 훅
 * @param initialState 초기 상태
 * @param storageKey sessionStorage에 저장할 키 (선택적, 제공 시 자동 저장/복원)
 */
export const useFormState = <T>(initialState: T, storageKey?: string) => {
  // sessionStorage에서 복원 또는 초기 상태 사용
  const getInitialState = useCallback((): T => {
    if (!storageKey || typeof window === 'undefined') {
      return initialState;
    }
    
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored) as T;
      }
    } catch (error) {
      warn('useFormState', `Failed to restore form state from sessionStorage (${storageKey}):`, error);
    }
    
    return initialState;
  }, [initialState, storageKey]);

  const [formData, setFormData] = useState<T>(getInitialState);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // 초기 마운트 시에는 저장하지 않음 (복원만 수행)
  useEffect(() => {
    setIsInitialMount(false);
  }, []);

  // sessionStorage에 저장 (초기 마운트 제외, 실제 변경 시에만 저장)
  useEffect(() => {
    if (isInitialMount || !storageKey || typeof window === 'undefined') {
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
      warn('useFormState', `Failed to save form state to sessionStorage (${storageKey}):`, error);
    }
  }, [formData, storageKey, isInitialMount]);

  /**
   * 필드 값을 업데이트합니다.
   */
  const updateField = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  /**
   * 배열 필드의 특정 인덱스를 업데이트합니다.
   * 객체 배열의 경우 subField를 전달하여 부분 업데이트가 가능합니다.
   */
  const updateArrayField = useCallback(
    <K extends keyof T>(field: K, index: number, value: unknown, subField?: string) => {
      setFormData((prev) => {
        const currentValue = prev[field];
        if (!Array.isArray(currentValue)) {
          return prev;
        }

        const nextArray = currentValue.map((item, idx) => {
          if (idx !== index) {
            return item;
          }

          if (subField && typeof item === 'object' && item !== null) {
            return {
              ...item,
              [subField]: value,
            };
          }

          return value;
        });

        return {
          ...prev,
          [field]: nextArray as T[K],
        };
      });
    },
    []
  );

  /**
   * 폼을 초기 상태로 되돌립니다.
   */
  const resetForm = useCallback(() => {
    setFormData(initialState);
    if (storageKey && typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(storageKey);
      } catch (error) {
        warn('useFormState', `Failed to remove form state from sessionStorage (${storageKey}):`, error);
      }
    }
  }, [initialState, storageKey]);

  /**
   * sessionStorage에서 폼 데이터를 삭제합니다.
   */
  const clearStorage = useCallback(() => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(storageKey);
      } catch (error) {
        warn('useFormState', `Failed to clear form state from sessionStorage (${storageKey}):`, error);
      }
    }
  }, [storageKey]);

  return {
    formData,
    setFormData,
    updateField,
    updateArrayField,
    resetForm,
    clearStorage,
  };
};

