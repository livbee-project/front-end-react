import React from 'react';
import styled from 'styled-components';
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard';
import type { Campaign } from '@/domain/entities/Campaign';
import { createMockCampaign } from '@/presentation/stories/mocks/campaign';

const defaultScrapHandler = (event: React.MouseEvent) => {
  event.stopPropagation();
};

const renderCampaignCard = (campaign: Campaign, options?: { scrapped?: boolean }) => (
  <CampaignCard
    key={campaign.id}
    campaign={campaign}
    isScrapped={Boolean(options?.scrapped)}
    onCardClick={() => {}}
    onScrapClick={defaultScrapHandler}
  />
);

export const CampaignCardExamples: React.FC = () => (
  <CardContainer>
    {renderCampaignCard(
      createMockCampaign({
        id: 'cmp-101',
        brandName: '패션 브랜드',
        title: '2024 봄/여름 컬렉션 모델 모집',
        content: '패션 쇼와 광고 촬영에 참여할 모델을 모집합니다.',
        category: '패션',
      }),
    )}
    {renderCampaignCard(
      createMockCampaign({
        id: 'cmp-102',
        brandName: '뷰티 브랜드',
        title: '화장품 광고 모델 모집',
        content: '신제품 런칭 광고에 출연할 모델을 찾고 있습니다.',
        category: '뷰티',
      }),
      { scrapped: true },
    )}
    {renderCampaignCard(
      createMockCampaign({
        id: 'cmp-103',
        brandName: '라이프스타일 브랜드',
        title: '인플루언서 협업 모집',
        content: '제품 리뷰 및 콘텐츠 제작에 참여할 인플루언서를 모집합니다.',
        category: '생활/리빙',
      }),
    )}
  </CardContainer>
);

export const CampaignCardLongText: React.FC = () => (
  <CardContainer>
    {renderCampaignCard(
      createMockCampaign({
        id: 'cmp-104',
        brandName: '매우 긴 브랜드명이 여기에 표시됩니다',
        title: '매우 긴 공고 제목이 여기에 표시되며 텍스트가 길어지면 말줄임표로 처리됩니다',
        content:
          '매우 긴 공고 내용이 여기에 표시됩니다. 이 내용은 여러 줄에 걸쳐 표시될 수 있으며, 텍스트가 길어지면 말줄임표로 처리됩니다.',
      }),
    )}
  </CardContainer>
);

export const CampaignCardListExample: React.FC = () => (
  <ListContainer>
    {[
      createMockCampaign({
        id: 'cmp-201',
        brandName: '패션 브랜드 A',
        title: '2024 봄/여름 컬렉션 모델 모집',
        content: '패션 쇼와 광고 촬영에 참여할 모델을 모집합니다.',
      }),
      createMockCampaign({
        id: 'cmp-202',
        brandName: '뷰티 브랜드 B',
        title: '화장품 광고 모델 모집',
        content: '신제품 런칭 광고에 출연할 모델을 찾고 있습니다.',
        category: '뷰티',
      }),
      createMockCampaign({
        id: 'cmp-203',
        brandName: '라이프스타일 브랜드 C',
        title: '인플루언서 협업 모집',
        content: '제품 리뷰 및 콘텐츠 제작에 참여할 인플루언서를 모집합니다.',
        category: '생활/리빙',
      }),
    ].map((campaign, index) =>
      renderCampaignCard(campaign, {
        scrapped: index === 1,
      }),
    )}
  </ListContainer>
);

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

