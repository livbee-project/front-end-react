import { useCallback, useState } from 'react';

/**
 * 범용 폼 상태를 관리하는 훅
 */
export const useFormState = <T>(initialState: T) => {
  const [formData, setFormData] = useState<T>(initialState);

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
  }, [initialState]);

  return {
    formData,
    setFormData,
    updateField,
    updateArrayField,
    resetForm,
  };
};

