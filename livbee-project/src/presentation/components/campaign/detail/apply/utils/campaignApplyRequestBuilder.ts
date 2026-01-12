import type { CampaignApplyRequest } from '@/domain/entities/Campaign';

/**
 * 캠페인 지원 API 요청 payload 생성
 */
export const buildCampaignApplyRequest = ({
  campaignId,
  selectedPortfolio,
  selectedModel,
  message,
  availableDate,
  availableTime,
}: {
  campaignId: string;
  selectedPortfolio?: string | null;
  selectedModel?: string | null;
  message: string;
  availableDate: string;
  availableTime: string;
}): CampaignApplyRequest => {
  const request: CampaignApplyRequest = {
    campaignId,
    message: message.trim(),
    availableDate,
    availableTime,
  };

  // portfolioId 또는 modelId 중 하나만 설정
  if (selectedPortfolio) {
    request.portfolioId = selectedPortfolio;
  } else if (selectedModel) {
    request.modelId = selectedModel;
  }

  return request;
};

