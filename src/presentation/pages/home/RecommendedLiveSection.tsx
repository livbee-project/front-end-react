import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PMuted } from '@/presentation/components/styled/Typography';
import HomeSection, { Highlight } from '@/presentation/pages/home/components/HomeSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListData } from '@/presentation/hooks/list/useListData';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';
import { CardActionButton } from '@/presentation/components/cards/content/ContentCard.styles';
import { calculateDDay } from '@/shared/utils/dateUtils';
import CampaignApplyModal from '@/presentation/components/campaign/detail/apply/CampaignApplyModal';
import { getCampaignCoverUrl } from '@/presentation/pages/home/utils/campaignCover';
import { CampaignDdayBadge } from '@/presentation/pages/home/components/CampaignDdayBadge';

const buildCampaignSummary = (campaign: Campaign): string => {
  const summary = campaign.summary || campaign.detailedContent || campaign.content || '';
  return summary ? htmlToText(summary).slice(0, 60) : '';
};

const buildFeeLabel = (campaign: Campaign): string =>
  campaign.fee ? `${campaign.fee.toLocaleString()}원` : '협의';

const MetaLine = styled(PMuted)`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const RecommendedLiveSection: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);
  const campaignRepository = useRepository(CampaignRepository);

  const query = useMemo(() => ({ page: 1, limit: 10, sort: 'deadline' as const }), []);

  const fetchCampaigns = useCallback(
    (query: { page: number; limit: number; sort?: 'latest' | 'deadline' }, signal?: AbortSignal) => {
      return campaignRepository.getCampaignList(query, signal);
    },
    [campaignRepository],
  );

  const cacheKey = useMemo(() => `recommended-live-${JSON.stringify(query)}`, [query]);

  const { data: campaigns, loading, error } = useListData<
    Campaign,
    { page: number; limit: number; sort?: 'latest' | 'deadline' },
    { items: Campaign[] }
  >(fetchCampaigns, query, [], '라이브 추천 목록을 불러오는 중 오류가 발생했습니다.', { cacheKey });

  const sectionTitle = (
    <>
      <Highlight>라이브</Highlight>
      <span> PICK!!</span>
    </>
  );

  if (loading) {
    return (
      <HomeSection title={sectionTitle}>
        <LoadingState />
      </HomeSection>
    );
  }

  if (error) {
    return (
      <HomeSection title={sectionTitle} onMore={() => navigate('/campaigns')}>
        <EmptyState message={error} />
      </HomeSection>
    );
  }

  if (campaigns.length === 0) {
    return (
      <HomeSection title={sectionTitle} onMore={() => navigate('/campaigns')}>
        <EmptyState message="현재 추천할 라이브가 없습니다." />
      </HomeSection>
    );
  }

  return (
    <HomeSection title={sectionTitle} onMore={() => navigate('/campaigns')}>
      <ContentCardGrid>
        {campaigns.map((campaign) => {
          const imageUrl = getCampaignCoverUrl(campaign);
          const displaySummary = buildCampaignSummary(campaign);
          const dday = campaign.closeAt ? calculateDDay(campaign.closeAt) : '';
          const metaLine = `${buildFeeLabel(campaign)} · ${campaign.category || '카테고리 없음'}`;

          return (
            <ContentCard
              key={campaign.id}
              variant="ad"
              imageUrl={imageUrl}
              imageAlt={campaign.title}
              heading={campaign.brandName || '브랜드'}
              title={campaign.title}
              supplementary={displaySummary || undefined}
              mediaOverlay={dday ? <CampaignDdayBadge label={dday} /> : undefined}
              footer={
                <>
                  <MetaLine>{metaLine}</MetaLine>
                  <CardActionButton
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (!isLoggedIn) {
                        navigate('/login', { replace: true });
                        return;
                      }
                      setSelectedCampaign(campaign);
                    }}
                  >
                    지원하기
                  </CardActionButton>
                </>
              }
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            />
          );
        })}
      </ContentCardGrid>

      {selectedCampaign && (
        <CampaignApplyModal
          isOpen={Boolean(selectedCampaign)}
          campaignId={selectedCampaign.id}
          campaignTitle={selectedCampaign.title}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </HomeSection>
  );
});

RecommendedLiveSection.displayName = 'RecommendedLiveSection';

export default RecommendedLiveSection;
