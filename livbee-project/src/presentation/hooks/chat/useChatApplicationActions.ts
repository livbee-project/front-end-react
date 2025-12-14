import { useCallback } from 'react';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { debug, error as logError } from '@/shared/utils/logger';

interface UseChatApplicationActionsOptions {
  refreshRoomDetail: () => void;
}

/**
 * 채팅방에서 지원서 액션(수락/거절)을 처리하는 훅
 */
export const useChatApplicationActions = ({ refreshRoomDetail }: UseChatApplicationActionsOptions) => {
  const campaignRepository = useRepository(CampaignRepository);
  const { showToast } = useToast();

  const handleApplicationAction = useCallback(
    async (action: 'accept' | 'reject', applicationId?: string) => {
      if (!applicationId) {
        showToast('지원서 정보를 확인할 수 없습니다.', undefined, 'error');
        return;
      }

      const actionLabel = action === 'accept' ? '수락' : '거절';

      try {
        debug('useChatApplicationActions', '지원서 상태 업데이트 요청:', { applicationId, action });

        const response = await campaignRepository.updateApplicationStatus({
          applicationId,
          action,
        });

        debug('useChatApplicationActions', '지원서 상태 업데이트 응답:', response);

        showToast(`지원서를 ${actionLabel}했습니다.`);

        // 소켓을 통해 실시간 업데이트가 오므로, 여기서는 즉시 새로고침하지 않음
        // 백엔드에서 application.status.updated 이벤트를 보내면 handleSocketEvent에서 처리
        // 다만, 소켓 연결이 끊어진 경우를 대비해 약간의 지연 후 새로고침 (폴백)
        setTimeout(() => {
          debug('useChatApplicationActions', '폴백: refreshRoomDetail 호출');
          refreshRoomDetail();
        }, 1000);
      } catch (error) {
        logError('useChatApplicationActions', '지원서 상태 업데이트 실패:', error);
        const errorMessage = error instanceof Error ? error.message : `지원서 ${actionLabel}에 실패했습니다.`;
        showToast(errorMessage, undefined, 'error');
      }
    },
    [campaignRepository, refreshRoomDetail, showToast]
  );

  return {
    handleApplicationAction,
  };
};

