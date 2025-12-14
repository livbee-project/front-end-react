import { ChatRepository } from '@/data/repositories/ChatRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { error as logError } from '@/shared/utils/logger';

interface HandleAlreadyAppliedErrorOptions {
  campaignId: string;
  chatRepository: ChatRepository;
  showToast: ReturnType<typeof useToast>['showToast'];
  onClose: () => void;
  navigate: (path: string) => void;
}

/**
 * "이미 지원한" 에러를 처리하는 함수
 */
export const handleAlreadyAppliedError = async ({
  campaignId,
  chatRepository,
  showToast,
  onClose,
  navigate,
}: HandleAlreadyAppliedErrorOptions): Promise<boolean> => {
  try {
    const rooms = await chatRepository.getRooms();
    const existingRoom = rooms.find((room) => room.campaign?.id === campaignId);

    if (existingRoom) {
      showToast('이미 지원한 공고입니다. 기존 채팅방으로 이동합니다.');
      onClose();
      navigate(`/chat/${existingRoom.roomId}`);
      return true;
    }

    showToast('이미 지원한 공고입니다. 채팅방이 삭제되어 메시지 목록으로 이동합니다.');
    onClose();
    navigate('/mypage/messages');
    return true;
  } catch (searchError) {
    logError('campaignApplyErrorHandler', '기존 채팅방 찾기 실패:', searchError);
    return false;
  }
};

/**
 * 지원서 제출 에러를 처리하는 함수
 */
export const handleCampaignApplyError = async (
  error: unknown,
  options: HandleAlreadyAppliedErrorOptions
): Promise<boolean> => {
  const errorMessage = error instanceof Error ? error.message : '지원에 실패했습니다.';

  if (errorMessage.includes('이미 지원한') || errorMessage.includes('ALREADY_APPLIED')) {
    return await handleAlreadyAppliedError(options);
  }

  return false;
};

