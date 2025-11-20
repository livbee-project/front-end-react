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
import { H2, CaptionMedium } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';
import { HomeCard } from '@/presentation/components/cards/HomeCard';
import { HomeCardImage } from '@/presentation/components/cards/HomeCardImage';
import { HomeCardBody, HomeCardBrand, HomeCardTitle, HomeCardDescription } from '@/presentation/components/cards/HomeCardBody';
import { calculateDDay } from '@/shared/utils/dateUtils';
import { formatCurrency } from '@/shared/utils/formatUtils';

const StyledBadge = styled(Badge)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
`;

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

const ShoppingLiveSection: React.FC = () => {
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
    '쇼핑 라이브 목록을 불러오는 중 오류가 발생했습니다.'
  );

  if (loading) {
    return (
      <HomeSection title={<><span>지금 뜨는 </span><Highlight>쇼핑라이브</Highlight></>}>
        <LoadingState />
      </HomeSection>
    );
  }

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <HomeSection
      title={<><span>지금 뜨는 </span><Highlight>쇼핑라이브</Highlight></>}
      onMore={() => navigate('/campaigns')}
    >
      <HorizontalScroll>
        {campaigns.map((campaign) => {
          const imageUrl = campaign.imageUrl || campaign.thumbnailUrl || undefined;
          const summary = htmlToText(campaign.content).slice(0, 60);
          const dday = campaign.closeAt ? calculateDDay(campaign.closeAt) : '';
          const price = campaign.minPrice != null ? formatCurrency(campaign.minPrice) : '가격 미정';

          return (
            <HomeCard key={campaign.id} onClick={() => navigate(`/campaigns/${campaign.id}`)}>
              <HomeCardImage src={imageUrl} alt={campaign.title}>
                {dday && <StyledBadge>{dday}</StyledBadge>}
              </HomeCardImage>
              <HomeCardBody>
                <HomeCardBrand>{campaign.brandName}</HomeCardBrand>
                <HomeCardTitle>{campaign.title}</HomeCardTitle>
                <HomeCardDescription>{summary}</HomeCardDescription>
                <ProductInfo>
                  <ProductThumb>
                    {campaign.thumbnailUrl && (
                      <img
                        src={campaign.thumbnailUrl}
                        alt={campaign.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </ProductThumb>
                  <ProductText>
                    <PriceLabel>특딜가</PriceLabel>
                    <PriceValue>{price}</PriceValue>
                  </ProductText>
                </ProductInfo>
              </HomeCardBody>
            </HomeCard>
          );
        })}
      </HorizontalScroll>
    </HomeSection>
  );
};

export default ShoppingLiveSection;