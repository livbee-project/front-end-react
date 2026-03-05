import { useEffect } from 'react';
import { useToast } from '@/presentation/contexts/ToastContext';
import { subscribeApiErrorEvent } from '@/shared/utils/apiEvents';

export const ApiErrorToastListener: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    return subscribeApiErrorEvent(({ message, status, context }) => {
      // 카카오 로그인에서 USER_NOT_FOUND(404)인 경우에는
      // 가입 플로우를 모달로 안내하므로 토스트는 표시하지 않음
      if (context === '카카오 로그인' && status === 404) {
        return;
      }

      showToast(message, undefined, 'error');
    });
  }, [showToast]);

  return null;
};

