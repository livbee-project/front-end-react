interface CampaignApplyRequestPayload {
  campaignId: string;
  portfolioId: string;
  message: string;
  availableDate: string;
  availableTime: string;
}

/**
 * 캠페인 지원 API 요청 payload 생성
 */
export const buildCampaignApplyRequest = ({
  campaignId,
  selectedPortfolio,
  message,
  availableDate,
  availableTime,
}: {
  campaignId: string;
  selectedPortfolio: number;
  message: string;
  availableDate: string;
  availableTime: string;
}): CampaignApplyRequestPayload => {
  return {
    campaignId,
    portfolioId: String(selectedPortfolio),
    message: message.trim(),
    availableDate,
    availableTime,
  };
};

