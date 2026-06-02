import type { Campaign } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { calculateDDay, formatRelativeTime } from '@/shared/utils/dateUtils';
import { formatFee, getDeadlineLabel } from '@/shared/utils/formatUtils';
import { getCampaignCoverUrl } from '@/presentation/pages/home/utils/campaignCover';

export const getCampaignListImageUrl = (campaign: Campaign): string | undefined => getCampaignCoverUrl(campaign);

export const buildCampaignListSummary = (campaign: Campaign): string => {
  const summary = campaign.summary || campaign.detailedContent || campaign.content || '';
  return summary ? htmlToText(summary).slice(0, 60) : '';
};

export const buildCampaignListSupplementary = (campaign: Campaign): string => {
  const deadline = getDeadlineLabel(campaign.closeAt, calculateDDay, formatRelativeTime);
  const fee = formatFee(campaign.fee);
  return `${deadline} · ${fee}`;
};

export const getCampaignDdayLabel = (campaign: Campaign): string =>
  campaign.closeAt ? calculateDDay(campaign.closeAt) : '';
