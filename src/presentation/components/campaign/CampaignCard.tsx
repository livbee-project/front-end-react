import React from 'react';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { CampaignBadgeFooter } from '@/presentation/components/cards/content/CampaignBadgeFooter';
import {
  buildCampaignListSummary,
  buildCampaignListSupplementary,
  getCampaignDdayLabel,
  getCampaignListImageUrl,
} from '@/presentation/components/cards/content/campaignCardHelpers';
import { CampaignDdayBadge } from '@/presentation/pages/home/components/CampaignDdayBadge';
import { buildCampaignBadgeItems } from '@/shared/utils/badgeUtils';
import type { Campaign } from '@/domain/entities/Campaign';

interface CampaignCardProps {
  campaign: Campaign;
  isScrapped: boolean;
  onCardClick: () => void;
  onScrapClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/** @deprecated 목록 UI는 ContentCard variant="ad"를 직접 사용하는 것을 권장합니다. */
export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  isScrapped,
  onCardClick,
  onScrapClick,
}) => {
  const dday = getCampaignDdayLabel(campaign);
  const summary = buildCampaignListSummary(campaign);
  const badges = buildCampaignBadgeItems(campaign);

  return (
    <ContentCard
      variant="ad"
      imageUrl={getCampaignListImageUrl(campaign)}
      imageAlt={campaign.title}
      heading={campaign.brandName || '브랜드명'}
      title={campaign.title}
      supplementary={summary || buildCampaignListSupplementary(campaign)}
      mediaOverlay={dday ? <CampaignDdayBadge label={dday} /> : undefined}
      isFavorite={isScrapped}
      onFavoriteToggle={onScrapClick}
      onClick={onCardClick}
      footer={badges.length > 0 ? <CampaignBadgeFooter badges={badges} campaignId={campaign.id} /> : undefined}
    />
  );
};
