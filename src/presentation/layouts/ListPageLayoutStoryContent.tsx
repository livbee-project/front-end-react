import React, { useState } from 'react';
import styled from 'styled-components';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard';
import Pagination from '@/presentation/components/list/Pagination';
import { createMockCampaign } from '@/presentation/stories/mocks/campaign';

export const ListContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ListContent>{children}</ListContent>
);

export const CampaignPageDemo: React.FC = () => {
  const [page, setPage] = useState(1);

  return (
    <ListPageLayout
      searchPlaceholder="모집공고를 검색하세요"
      hintText="카드를 누르면 상세 정보를 보실 수 있습니다."
      floatingActionButtonPath="/campaigns/register"
      onSearch={(query) => alert(`검색: ${query}`)}
    >
      <ListContent>
        {[
          createMockCampaign({
            id: 'cmp-demo-1',
            brandName: '패션 브랜드',
            title: '2024 봄/여름 컬렉션 모델 모집',
            content: '패션 쇼와 광고 촬영에 참여할 모델을 모집합니다.',
          }),
          createMockCampaign({
            id: 'cmp-demo-2',
            brandName: '뷰티 브랜드',
            title: '화장품 광고 모델 모집',
            content: '신제품 런칭 광고에 출연할 모델을 찾고 있습니다.',
            category: '뷰티',
          }),
          createMockCampaign({
            id: 'cmp-demo-3',
            brandName: '라이프스타일 브랜드',
            title: '인플루언서 협업 모집',
            content: '제품 리뷰 및 콘텐츠 제작에 참여할 인플루언서를 모집합니다.',
            category: '생활/리빙',
          }),
        ].map((campaign, index) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            isScrapped={index === 1}
            onCardClick={() => {}}
            onScrapClick={(event) => event.stopPropagation()}
          />
        ))}
      </ListContent>
      <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
    </ListPageLayout>
  );
};

export const PortfolioPageDemo: React.FC = () => {
  const [page, setPage] = useState(1);

  return (
    <ListPageLayout
      searchPlaceholder="포트폴리오를 검색하세요"
      hintText="포트폴리오 카드를 클릭하면 상세 정보를 볼 수 있습니다."
      floatingActionButtonPath="/portfolios/register"
      onSearch={(query) => alert(`검색: ${query}`)}
    >
      <ListContent>
        {['포트폴리오 카드 1', '포트폴리오 카드 2', '포트폴리오 카드 3'].map((text) => (
          <CardPlaceholder key={text}>{text}</CardPlaceholder>
        ))}
      </ListContent>
      <Pagination currentPage={page} totalPages={8} onPageChange={setPage} />
    </ListPageLayout>
  );
};

const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardPlaceholder = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

