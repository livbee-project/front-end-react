import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { ChatRepository } from '@/data/repositories/ChatRepository';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { debug, warn, error as logError } from '@/shared/utils/logger';
import type { SnakeCaseResponse } from '@/shared/types/api';
import { MOCK_PORTFOLIOS } from '@/shared/constants/portfolio';
import { validateCampaignApplyForm } from '@/presentation/components/campaign/detail/apply/utils/campaignApplyValidation';
import { buildCampaignApplyRequest } from '@/presentation/components/campaign/detail/apply/utils/campaignApplyRequestBuilder';

export interface PortfolioOption {
  id: number;
  title: string;
  summary: string;
  imageUrl?: string;
  tags: string[];
}

const FALLBACK_PORTFOLIOS: PortfolioOption[] = [
  {
    id: 1,
    title: '패션 쇼핑라이브 포트폴리오',
    summary: '봄/여름 시즌 패션 아이템 라이브 영상 모음',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80',
    tags: ['패션', '뷰티'],
  },
  {
    id: 2,
    title: '뷰티 제품 리뷰',
    summary: '스킨케어 및 메이크업 제품 상세 리뷰',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80',
    tags: ['뷰티'],
  },
  {
    id: 3,
    title: '홈리빙 큐레이션',
    summary: '인테리어 소품 및 생활용품 소개 라이브',
    imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=200&q=80',
    tags: ['리빙', '홈데코'],
  },
];

export const MAX_MESSAGE_LENGTH = 400;

interface UseCampaignApplyFormParams {
  campaignId: string;
  campaignTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onApplied?: (chatRoomId: string) => void;
}

export const useCampaignApplyForm = ({
  campaignId,
  campaignTitle,
  isOpen,
  onClose,
  onApplied,
}: UseCampaignApplyFormParams) => {
  const { showToast } = useToast();
  const campaignRepository = useRepository(CampaignRepository);
  const chatRepository = useRepository(ChatRepository);
  const navigate = useNavigate();

  const [selectedPortfolio, setSelectedPortfolio] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const portfolioOptions: PortfolioOption[] = useMemo(
    () =>
      (MOCK_PORTFOLIOS ?? FALLBACK_PORTFOLIOS).map((portfolio) => ({
        id: portfolio.id,
        title: portfolio.title,
        summary: portfolio.summary,
        imageUrl: portfolio.imageUrl,
        tags: portfolio.categories || [],
      })),
    []
  );

  const selectedPortfolioData = selectedPortfolio
    ? portfolioOptions.find((portfolio) => portfolio.id === selectedPortfolio)
    : null;

  const resetForm = useCallback(() => {
    setSelectedPortfolio(null);
    setMessage('');
    setAvailableDate('');
    setAvailableTime('');
    setIsSubmitting(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = useCallback(async () => {
    const validation = validateCampaignApplyForm({
      campaignId,
      selectedPortfolio,
      message,
      availableDate,
      availableTime,
    });

    if (!validation.isValid) {
      showToast(validation.errorMessage || '입력값을 확인해주세요.', undefined, 'error');
      return;
    }

    if (!selectedPortfolio) {
      showToast('포트폴리오를 선택해주세요.', undefined, 'error');
      return;
    }

    const requestPayload = buildCampaignApplyRequest({
      campaignId,
      selectedPortfolio,
      message,
      availableDate,
      availableTime,
    });

    setIsSubmitting(true);

    try {
      const response = await campaignRepository.applyToCampaign(requestPayload);
      debug('CampaignApplyModal', '지원 응답:', response);

      const snakeCaseResponse = (response as unknown) as Partial<
        SnakeCaseResponse & { chat_room_id?: string; room_id?: string; chatRoomId?: string; roomId?: string }
      >;
      const chatRoomId =
        response.chatRoomId ||
        snakeCaseResponse.chat_room_id ||
        snakeCaseResponse.room_id ||
        snakeCaseResponse.roomId;

      debug('CampaignApplyModal', 'chatRoomId:', chatRoomId);

      showToast('지원서가 제출되었습니다.');
      onClose();

      if (chatRoomId) {
        onApplied?.(chatRoomId);
        debug('CampaignApplyModal', '채팅방으로 이동:', `/chat/${chatRoomId}`);
        navigate(`/chat/${chatRoomId}`, {
          state: {
            campaignTitle,
            portfolioTitle: selectedPortfolioData?.title,
            availableDate,
            availableTime,
            message: requestPayload.message,
            roomId: chatRoomId,
          },
        });
      } else {
        warn('CampaignApplyModal', 'chatRoomId가 없어 채팅 목록으로 이동');
        navigate('/mypage/messages', {
          state: {
            campaignTitle,
            portfolioTitle: selectedPortfolioData?.title,
            availableDate,
            availableTime,
            message: requestPayload.message,
          },
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '지원에 실패했습니다.';

      if (errorMessage.includes('이미 지원한') || errorMessage.includes('ALREADY_APPLIED')) {
        try {
          const rooms = await chatRepository.getRooms();

          const existingRoom = rooms.find((room) => room.campaign?.id === campaignId);

          if (existingRoom) {
            showToast('이미 지원한 공고입니다. 기존 채팅방으로 이동합니다.');
            onClose();
            navigate(`/chat/${existingRoom.roomId}`);
            return;
          }

          showToast('이미 지원한 공고입니다. 채팅방이 삭제되어 메시지 목록으로 이동합니다.');
          onClose();
          navigate('/mypage/messages');
          return;
        } catch (searchError) {
          logError('CampaignApplyModal', '기존 채팅방 찾기 실패:', searchError);
        }
      }

      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    availableDate,
    availableTime,
    campaignId,
    campaignRepository,
    chatRepository,
    campaignTitle,
    message,
    navigate,
    onApplied,
    onClose,
    selectedPortfolio,
    selectedPortfolioData?.title,
    showToast,
  ]);

  const isSubmitDisabled =
    isSubmitting || !selectedPortfolio || !message.trim() || !availableDate || !availableTime;

  return {
    portfolioOptions,
    selectedPortfolio,
    setSelectedPortfolio,
    message,
    setMessage,
    availableDate,
    setAvailableDate,
    availableTime,
    setAvailableTime,
    isSubmitting,
    handleSubmit,
    selectedPortfolioData,
    isSubmitDisabled,
    messageLength: message.trim().length,
  };
};

