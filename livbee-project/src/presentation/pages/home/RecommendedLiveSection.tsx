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
import { H3, Caption, PMuted, CaptionMedium } from '@/presentation/components/styled/Typography';
import { PrimaryBadge } from '@/presentation/components/styled/CommonStyles';

const Card = styled.article`
  flex: 0 0 65vw;
  min-width: 240px;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 280px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 0 0 300px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled(PrimaryBadge)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Brand = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const Title = styled(H3)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled(PMuted)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.5rem;
`;

const RecommendedLiveSection: React.FC = () => {
  const navigate = useNavigate();
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

  const calculateDDay = (closeAt?: string | null) => {
    if (!closeAt) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(closeAt);
    deadline.setHours(23, 59, 59, 999);
    const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return '마감';
    if (diffDays === 0) return 'D-DAY';
    return `D-${diffDays}`;
  };

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
          const dday = calculateDDay(campaign.closeAt);

          return (
            <Card key={campaign.id} onClick={() => navigate(`/campaigns/${campaign.id}`)}>
              <ImageWrapper>
                {imageUrl ? <CoverImage src={imageUrl} alt={campaign.title} /> : <div />}
                {dday && <Badge><CaptionMedium>{dday}</CaptionMedium></Badge>}
              </ImageWrapper>
              <CardBody>
                <Brand>{campaign.brandName}</Brand>
                <Title>{campaign.title}</Title>
                <Description>{summary}</Description>
              </CardBody>
            </Card>
          );
        })}
      </HorizontalScroll>
    </HomeSection>
  );
};

export default RecommendedLiveSection;

