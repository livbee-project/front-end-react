import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection, { HorizontalScroll } from './components/HomeSection';
import Button from '@/presentation/components/ui/Button';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';
import { H3, Caption, PMuted } from '@/presentation/components/styled/Typography';
import { PrimaryBadge } from '@/presentation/components/styled/CommonStyles';

const Card = styled.article`
  flex: 0 0 240px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
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

const CornerBadge = styled(PrimaryBadge)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

const Brand = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const Title = styled(H3)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.5rem;
`;

const Description = styled(PMuted)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.5rem;
`;

const BrandPickSection: React.FC = () => {
  const navigate = useNavigate();
  const campaignRepository = useRepository(CampaignRepository);
  const { data: campaigns, loading } = useListData<
    Campaign,
    { page: number; limit: number; sort?: 'latest' | 'deadline' },
    { items: Campaign[] }
  >(
    (query, signal) => campaignRepository.getCampaignList(query, signal),
    { page: 1, limit: 10, sort: 'latest' },
    [],
    '브랜드 픽 목록을 불러오는 중 오류가 발생했습니다.'
  );

  if (loading) {
    return (
      <HomeSection title="브랜드 PICK">
        <LoadingState />
      </HomeSection>
    );
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <HomeSection title="브랜드 PICK" onMore={() => navigate('/campaigns')}>
      <HorizontalScroll>
        {campaigns.map((campaign) => {
          const imageUrl = campaign.imageUrl || campaign.thumbnailUrl || undefined;
          const summary = htmlToText(campaign.content).slice(0, 60);

          return (
            <Card key={campaign.id}>
              <ImageWrapper>
                {imageUrl && <CoverImage src={imageUrl} alt={campaign.title} />}
                <CornerBadge>CH</CornerBadge>
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
                BUTTON
              </Button>
            </Card>
          );
        })}
      </HorizontalScroll>
    </HomeSection>
  );
};

export default BrandPickSection;

