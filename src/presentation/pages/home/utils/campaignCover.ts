import type { Campaign } from '@/domain/entities/Campaign';

export const getCampaignCoverUrl = (campaign: Campaign): string | undefined =>
  campaign.liveVerticalCoverUrl ||
  campaign.coverImageUrl ||
  campaign.imageUrl ||
  campaign.thumbnailUrl ||
  undefined;
