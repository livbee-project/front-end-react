import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { ChatRepository } from '@/data/repositories/ChatRepository';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { debug, warn } from '@/shared/utils/logger';
import type { SnakeCaseResponse } from '@/shared/types/api';
import { validateCampaignApplyForm } from '@/presentation/components/campaign/detail/apply/utils/campaignApplyValidation';
import { buildCampaignApplyRequest } from '@/presentation/components/campaign/detail/apply/utils/campaignApplyRequestBuilder';
import { handleCampaignApplyError } from '@/presentation/components/campaign/detail/apply/utils/campaignApplyErrorHandler';

export interface ProfileOption {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  tags: string[];
  type: 'portfolio' | 'model';
}


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
  const portfolioRepository = useRepository(PortfolioRepository);
  const modelRepository = useRepository(ModelRepository);
  const navigate = useNavigate();

  const [targetType, setTargetType] = useState<'portfolio' | 'model'>('portfolio');
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  // 포트폴리오 목록 조회
  const [portfolioOptions, setPortfolioOptions] = useState<ProfileOption[]>([]);
  useEffect(() => {
    if (isOpen && targetType === 'portfolio') {
      setIsLoadingPortfolios(true);
      portfolioRepository
        .getPortfolioList({ page: 1, limit: 100 })
        .then((response) => {
          if (response.ok) {
            const options: ProfileOption[] = response.items.map((portfolio) => ({
              id: portfolio.id,
              title: portfolio.nickname || '포트폴리오',
              summary: portfolio.oneLineIntro || '',
              imageUrl: portfolio.mainThumbnailUrl || undefined,
              tags: [],
              type: 'portfolio' as const,
            }));
            setPortfolioOptions(options);
          }
        })
        .catch((error) => {
          warn('useCampaignApplyForm', '포트폴리오 목록 조회 실패:', error);
        })
        .finally(() => {
          setIsLoadingPortfolios(false);
        });
    }
  }, [isOpen, targetType, portfolioRepository]);

  // 모델 목록 조회
  const [modelOptions, setModelOptions] = useState<ProfileOption[]>([]);
  useEffect(() => {
    if (isOpen && targetType === 'model') {
      setIsLoadingModels(true);
      modelRepository
        .getModelList({ page: 1, limit: 100 })
        .then((response) => {
          if (response.ok) {
            const options: ProfileOption[] = response.items.map((model) => ({
              id: model.id,
              title: model.nickname || '모델',
              summary: model.oneLineIntro || '',
              imageUrl: model.mainThumbnailUrl || undefined,
              tags: model.categories || [],
              type: 'model' as const,
            }));
            setModelOptions(options);
          }
        })
        .catch((error) => {
          warn('useCampaignApplyForm', '모델 목록 조회 실패:', error);
        })
        .finally(() => {
          setIsLoadingModels(false);
        });
    }
  }, [isOpen, targetType, modelRepository]);

  const currentOptions = targetType === 'portfolio' ? portfolioOptions : modelOptions;
  const selectedProfileData =
    targetType === 'portfolio'
      ? portfolioOptions.find((p) => p.id === selectedPortfolio)
      : modelOptions.find((m) => m.id === selectedModel);

  const resetForm = useCallback(() => {
    setTargetType('portfolio');
    setSelectedPortfolio(null);
    setSelectedModel(null);
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
      selectedModel,
      message,
      availableDate,
      availableTime,
    });

    if (!validation.isValid) {
      showToast(validation.errorMessage || '입력값을 확인해주세요.', undefined, 'error');
      return;
    }

    const requestPayload = buildCampaignApplyRequest({
      campaignId,
      selectedPortfolio: targetType === 'portfolio' ? selectedPortfolio : null,
      selectedModel: targetType === 'model' ? selectedModel : null,
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
            portfolioTitle: selectedProfileData?.title,
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
            portfolioTitle: selectedProfileData?.title,
            availableDate,
            availableTime,
            message: requestPayload.message,
          },
        });
      }
    } catch (error) {
      const errorHandled = await handleCampaignApplyError(error, {
        campaignId,
        chatRepository,
        showToast,
        onClose,
        navigate,
      });

      if (!errorHandled) {
        const errorMessage = error instanceof Error ? error.message : '지원에 실패했습니다.';
        showToast(errorMessage, undefined, 'error');
      }
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
    selectedModel,
    targetType,
    selectedProfileData?.title,
    showToast,
  ]);

  const isSubmitDisabled =
    isSubmitting ||
    (targetType === 'portfolio' ? !selectedPortfolio : !selectedModel) ||
    !message.trim() ||
    !availableDate ||
    !availableTime;

  return {
    targetType,
    setTargetType,
    portfolioOptions,
    modelOptions,
    currentOptions,
    selectedPortfolio,
    setSelectedPortfolio,
    selectedModel,
    setSelectedModel,
    message,
    setMessage,
    availableDate,
    setAvailableDate,
    availableTime,
    setAvailableTime,
    isSubmitting,
    isLoadingPortfolios,
    isLoadingModels,
    handleSubmit,
    selectedProfileData,
    isSubmitDisabled,
    messageLength: message.trim().length,
  };
};

