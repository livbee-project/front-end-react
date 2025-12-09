import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection, { Highlight, HorizontalScroll } from '@/presentation/pages/home/components/HomeSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListData } from '@/presentation/hooks/list/useListData';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { CaptionMedium } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';
import { HomeCard } from '@/presentation/components/cards/HomeCard';
import { HomeCardImage } from '@/presentation/components/cards/HomeCardImage';
import {
  HomeCardBody,
  HomeCardBrand,
  HomeCardTitle,
  HomeCardDescription,
  HomeCardMetaRow,
  CTAButton,
} from '@/presentation/components/cards/HomeCardBody';
import { calculateDDay } from '@/shared/utils/dateUtils';
import CampaignApplyModal from '@/presentation/components/campaign/detail/apply/CampaignApplyModal';

const StyledBadge = styled(Badge)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
`;

const RecommendedLiveSection: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);
  const campaignRepository = useRepository(CampaignRepository);

  // query 객체 메모이제이션
  const query = useMemo(() => ({ page: 1, limit: 10, sort: 'deadline' as const }), []);
  
  // fetchFunction 메모이제이션
  const fetchCampaigns = useCallback(
    (query: { page: number; limit: number; sort?: 'latest' | 'deadline' }, signal?: AbortSignal) => {
      return campaignRepository.getCampaignList(query, signal);
    },
    [campaignRepository]
  );

  const cacheKey = useMemo(() => `recommended-live-${JSON.stringify(query)}`, [query]);

  const { data: campaigns, loading, error } = useListData<
    Campaign,
    { page: number; limit: number; sort?: 'latest' | 'deadline' },
    { items: Campaign[] }
  >(
    fetchCampaigns,
    query,
    [],
    '라이브 추천 목록을 불러오는 중 오류가 발생했습니다.',
    { cacheKey }
  );

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
    <HomeSection
      title={sectionTitle}
      onMore={() => navigate('/campaigns')}
    >
      <HorizontalScroll>
        {campaigns.map((campaign) => {
          // 대표 이미지 우선순위: coverImageUrl > imageUrl > thumbnailUrl
          const imageUrl = campaign.coverImageUrl || campaign.imageUrl || campaign.thumbnailUrl || undefined;
          // 백엔드에서 최적화된 summary 필드 우선 사용, 없으면 detailedContent 또는 content 사용
          const summary = campaign.summary || campaign.detailedContent || campaign.content || '';
          const displaySummary = summary ? htmlToText(summary).slice(0, 60) : '';
          const dday = campaign.closeAt ? calculateDDay(campaign.closeAt) : '';

          return (
            <HomeCard key={campaign.id} onClick={() => navigate(`/campaigns/${campaign.id}`)}>
              <HomeCardImage src={imageUrl} alt={campaign.title}>
                {dday && (
                  <StyledBadge>
                    <CaptionMedium>{dday}</CaptionMedium>
                  </StyledBadge>
                )}
              </HomeCardImage>
              <HomeCardBody>
                <HomeCardBrand>{campaign.brandName}</HomeCardBrand>
                <HomeCardTitle>{campaign.title}</HomeCardTitle>
                <HomeCardDescription>{displaySummary}</HomeCardDescription>
                <HomeCardMetaRow>
                  <HomeCardBrand as="span">
                    {campaign.brandName} · {campaign.fee ? `${campaign.fee.toLocaleString()}원` : '협의'}
                  </HomeCardBrand>
                  <HomeCardBrand as="span">{campaign.category}</HomeCardBrand>
                </HomeCardMetaRow>
                <CTAButton
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    // 비로그인 상태면 로그인 페이지로 이동
                    if (!isLoggedIn) {
                      navigate('/login', { replace: true });
                      return;
                    }
                    setSelectedCampaign(campaign);
                  }}
                >
                  지원하기
                </CTAButton>
              </HomeCardBody>
            </HomeCard>
          );
        })}
      </HorizontalScroll>

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

