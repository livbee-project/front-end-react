import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection, { Highlight } from './components/HomeSection';
import Button from '@/presentation/components/ui/Button';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';

const ScrollArea = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.article`
  flex: 0 0 240px;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.primaryOpacity['15']} 0%,
    ${({ theme }) => theme.primaryOpacity['05']} 100%
  );
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.primaryOpacity['30']};
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FeeBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 12px;
`;

const DdayBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  padding: 0.2rem 0.6rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: 12px;
  font-weight: 500;
`;

const Brand = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.5rem;
`;

const Description = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
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
      <ScrollArea>
        {campaigns.map((campaign) => {
          const imageUrl = campaign.imageUrl || campaign.thumbnailUrl || undefined;
          const summary = htmlToText(campaign.content).slice(0, 60);
          const dday = calculateDDay(campaign.closeAt);
          const fee = campaign.fee ? `${campaign.fee.toLocaleString()}원` : '협의';

          return (
            <Card key={campaign.id}>
              <ImageWrapper>
                {imageUrl && <CoverImage src={imageUrl} alt={campaign.title} />}
                <FeeBadge>{fee}</FeeBadge>
                {dday && <DdayBadge>{dday}</DdayBadge>}
              </ImageWrapper>
              <Brand>{campaign.brandName}</Brand>
              <Title>{campaign.title}</Title>
              <Description>{summary}</Description>
              <Button
                variant="primary"
                size="small"
                fullWidth
                onClick={() => navigate(`/campaigns/${campaign.id}`)}
              >
                지원하기
              </Button>
            </Card>
          );
        })}
      </ScrollArea>
    </HomeSection>
  );
};

export default RecommendedLiveSection;

