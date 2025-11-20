import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection, { Highlight, HorizontalScroll } from './components/HomeSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';
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
import CampaignApplyModal from '@/presentation/components/detail/CampaignApplyModal';

const StyledBadge = styled(Badge)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
`;

const RecommendedLiveSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);
  const campaignRepository = useRepository(CampaignRepository);
  const { data: campaigns, loading } = useListData<
    Campaign,
    { page: number; limit: number; sort?: 'latest' | 'deadline' },
    { items: Campaign[] }
  >(
    (query, signal) => campaignRepository.getCampaignList(query, signal),
    { page: 1, limit: 10, sort: 'deadline' },
    [],
    '라이브 추천 목록을 불러오는 중 오류가 발생했습니다.'
  );

  if (loading) {
    return (
      <HomeSection title={<><Highlight>라이브</Highlight><span> PICK!!</span></>}>
        <LoadingState />
      </HomeSection>
    );
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <HomeSection
      title={<><Highlight>라이브</Highlight><span> PICK!!</span></>}
      onMore={() => navigate('/campaigns')}
    >
      <HorizontalScroll>
        {campaigns.map((campaign) => {
          const imageUrl = campaign.imageUrl || campaign.thumbnailUrl || undefined;
          const summary = htmlToText(campaign.content).slice(0, 60);
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
                <HomeCardDescription>{summary}</HomeCardDescription>
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
          campaignTitle={selectedCampaign.title}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </HomeSection>
  );
};

export default RecommendedLiveSection;

