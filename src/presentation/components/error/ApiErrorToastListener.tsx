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

      // 앱 초기화 시 토큰 검증 — GetCurrentUserUseCase에서 조용히 처리
      if (context === '내 정보 조회' && (status === 401 || status === 404)) {
        return;
      }

      // 404는 목록·상세 페이지 ErrorState에서 안내 — 전역 토스트 중복 방지
      if (status === 404) {
        return;
      }

      showToast(message, undefined, 'error');
    });
  }, [showToast]);

  return null;
};

