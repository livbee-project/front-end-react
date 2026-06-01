import { useCallback } from 'react';
import { useToast } from '@/presentation/contexts/ToastContext';

/**
 * 에러 처리를 담당하는 훅
 * SRP 준수: 에러 처리 로직만 담당
 */
export const useErrorHandler = (errorMessage?: string) => {
  const { showToast } = useToast();

  return useCallback(
    (message: string) => {
      showToast(message || errorMessage || '오류가 발생했습니다.', undefined, 'error');
    },
    [showToast, errorMessage]
  );
};

