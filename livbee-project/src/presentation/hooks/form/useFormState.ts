import { useCallback, useState } from 'react';
import { useFormStorageRestore } from './useFormStorageRestore';
import { useFormStorageSave } from './useFormStorageSave';

/**
 * 범용 폼 상태를 관리하는 훅
 * 상태 관리만 담당하며, sessionStorage 로직은 별도 훅에 위임
 * @param initialState 초기 상태
 * @param storageKey sessionStorage에 저장할 키 (선택적, 제공 시 자동 저장/복원)
 */
export const useFormState = <T>(initialState: T, storageKey?: string) => {
  // sessionStorage에서 복원된 상태 또는 초기 상태 사용
  const restoredState = useFormStorageRestore(storageKey, initialState);
  const [formData, setFormData] = useState<T>(restoredState ?? initialState);

  // sessionStorage 동기화 (formData 변경 시 자동 저장)
  const { clearStorage } = useFormStorageSave(storageKey, formData);

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
    clearStorage();
  }, [initialState, clearStorage]);

  return {
    formData,
    setFormData,
    updateField,
    updateArrayField,
    resetForm,
    clearStorage,
  };
};

