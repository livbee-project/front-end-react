import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection, { Highlight } from '@/presentation/pages/home/components/HomeSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListData } from '@/presentation/hooks/list/useListData';
import { H2, CaptionMedium } from '@/presentation/components/styled/Typography';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';
import { calculateDDay } from '@/shared/utils/dateUtils';
import { formatCurrency } from '@/shared/utils/formatUtils';
import { getCampaignCoverUrl } from '@/presentation/pages/home/utils/campaignCover';
import { CampaignDdayBadge } from '@/presentation/pages/home/components/CampaignDdayBadge';

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProductThumb = styled.div`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductText = styled.div`
  flex: 1;
  min-width: 0;
`;

const PriceLabel = styled(CaptionMedium)`
  color: ${({ theme }) => theme.colors.primary};
`;

const PriceValue = styled(H2)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const buildCampaignSummary = (campaign: Campaign): string => {
  const summary = campaign.summary || campaign.detailedContent || campaign.content || '';
  return summary ? htmlToText(summary).slice(0, 60) : '';
};

const ShoppingLiveSection: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const campaignRepository = useRepository(CampaignRepository);

  const query = useMemo(() => ({ page: 1, limit: 10, sort: 'latest' as const }), []);

  const fetchCampaigns = useCallback(
    (query: { page: number; limit: number; sort?: 'latest' | 'deadline' }, signal?: AbortSignal) => {
      return campaignRepository.getCampaignList(query, signal);
    },
    [campaignRepository],
  );

  const cacheKey = useMemo(() => `shopping-live-${JSON.stringify(query)}`, [query]);

  const { data: campaigns, loading, error } = useListData<
    Campaign,
    { page: number; limit: number; sort?: 'latest' | 'deadline' },
    { items: Campaign[] }
  >(fetchCampaigns, query, [], '쇼핑 라이브 목록을 불러오는 중 오류가 발생했습니다.', { cacheKey });

  const sectionTitle = (
    <>
      <span>지금 뜨는 </span>
      <Highlight>쇼핑라이브</Highlight>
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
        <EmptyState message="현재 표시할 쇼핑라이브가 없습니다." />
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
          const price = campaign.fee != null ? formatCurrency(campaign.fee) : '가격 미정';

          return (
            <ContentCard
              key={campaign.id}
              variant="ad"
              imageUrl={imageUrl}
              imageAlt={campaign.title}
              heading={campaign.brandName || '브랜드'}
              title={campaign.title}
              supplementary={displaySummary || dday}
              mediaOverlay={dday ? <CampaignDdayBadge label={dday} /> : undefined}
              footer={
                <ProductInfo>
                  <ProductThumb>
                    {campaign.productThumbnailUrl && (
                      <ProductImage src={campaign.productThumbnailUrl} alt={campaign.title} loading="lazy" />
                    )}
                  </ProductThumb>
                  <ProductText>
                    <PriceLabel>특딜가</PriceLabel>
                    <PriceValue>{price}</PriceValue>
                  </ProductText>
                </ProductInfo>
              }
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            />
          );
        })}
      </ContentCardGrid>
    </HomeSection>
  );
});

ShoppingLiveSection.displayName = 'ShoppingLiveSection';

export default ShoppingLiveSection;
