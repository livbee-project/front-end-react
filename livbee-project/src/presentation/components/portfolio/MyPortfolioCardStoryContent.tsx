/* eslint-disable react-refresh/only-export-components */
import React, { type MouseEvent } from 'react';
import { MyPortfolioCard } from '@/presentation/components/portfolio/MyPortfolioCard';
import type { MyPortfolioItem } from '@/types/portfolio';
import styled from 'styled-components';

const createItem = (overrides: Partial<MyPortfolioItem>): MyPortfolioItem => ({
  id: overrides.id ?? 1,
  title: overrides.title ?? '패션 라이브 포트폴리오',
  summary: overrides.summary ?? '봄/여름 시즌 패션 아이템 소개 라이브',
  categories: overrides.categories ?? ['패션', '쇼핑라이브'],
  updatedAt: overrides.updatedAt ?? '2024-11-10T09:00:00Z',
  imageUrl:
    overrides.imageUrl ??
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  isPinned: overrides.isPinned ?? false,
  isDefault: overrides.isDefault ?? false,
  role: overrides.role ?? 'showhost',
});

const commonHandlers = {
  onCardClick: () => alert('카드를 클릭했습니다.'),
  onPinClick: (event: MouseEvent) => {
    event.stopPropagation();
    alert('핀 버튼을 클릭했습니다.');
  },
  onDefaultClick: () => {
    alert('기본 설정 버튼을 클릭했습니다.');
  },
  onEditClick: () => {
    alert('편집 버튼을 클릭했습니다.');
  },
  onDeleteClick: () => {
    alert('삭제 버튼을 클릭했습니다.');
  },
};

export const DefaultPortfolioItem = {
  item: createItem({}),
  ...commonHandlers,
};

export const PinnedDefaultPortfolioItem = {
  item: createItem({
    id: 2,
    title: '뷰티 제품 리뷰 라이브',
    summary: '신제품 뷰티/스킨케어 체험 라이브',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    categories: ['뷰티', '리뷰'],
    isPinned: true,
    isDefault: true,
  }),
  ...commonHandlers,
};

export const NoImagePortfolioItem = {
  item: createItem({
    id: 3,
    title: '이미지 없는 카드',
    summary: '썸네일이 없는 경우 물음표 플레이스홀더가 표시됩니다.',
    imageUrl: undefined,
    categories: ['기타'],
  }),
  ...commonHandlers,
};

export const MyPortfolioShowcase: React.FC = () => {
  const items: MyPortfolioItem[] = [
    createItem({ id: 4, title: '패션 라이브', categories: ['패션'] }),
    createItem({
      id: 5,
      title: '홈데코 큐레이션',
      summary: '인테리어 소품 소개 라이브',
      categories: ['리빙', '홈데코'],
      imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80',
    }),
    createItem({
      id: 6,
      title: '뷰티 언박싱',
      summary: '신제품 화장품 언박싱 & 리뷰',
      categories: ['뷰티'],
      isPinned: true,
    }),
  ];

  return (
    <ShowcaseContainer>
      {items.map((item) => (
        <MyPortfolioCard
          key={item.id}
          item={item}
          onCardClick={() => alert(`${item.title} 클릭`)}
          onPinClick={(event) => {
            event.stopPropagation();
            alert(`${item.title} 즐겨찾기 클릭`);
          }}
          onDefaultClick={() => {
            alert(`${item.title} 기본 설정 클릭`);
          }}
          onEditClick={() => {
            alert(`${item.title} 편집 클릭`);
          }}
          onDeleteClick={() => {
            alert(`${item.title} 삭제 클릭`);
          }}
        />
      ))}
    </ShowcaseContainer>
  );
};

const ShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

