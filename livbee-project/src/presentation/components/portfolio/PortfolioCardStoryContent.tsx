/* eslint-disable react-refresh/only-export-components */
import React, { type MouseEvent } from 'react';
import styled from 'styled-components';
import { PortfolioCard } from './PortfolioCard';
import type { Portfolio } from '@/domain/entities/Portfolio';

const createPortfolio = (overrides: Partial<Portfolio>): Portfolio => ({
  id: overrides.id ?? 'portfolio-1',
  nickname: overrides.nickname ?? '루미 쇼호스트',
  oneLineIntro: overrides.oneLineIntro ?? '쇼핑라이브 전문 호스트',
  mainThumbnailUrl:
    overrides.mainThumbnailUrl ??
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  experienceYears: overrides.experienceYears ?? 3,
  detailedRegion: overrides.detailedRegion ?? '서울 · 강남',
  height: overrides.height ?? 165,
});

const handleCardClick = () => alert('카드 클릭');

const handleScrapClick = (event: MouseEvent) => {
  event.stopPropagation();
  alert('스크랩 아이콘 클릭');
};

export const DefaultPortfolioCard = {
  portfolio: createPortfolio({}),
  isScrapped: false,
  onCardClick: handleCardClick,
  onScrapClick: handleScrapClick,
};

export const ScrappedPortfolioCard = {
  portfolio: createPortfolio({
    id: 'portfolio-2',
    nickname: '하린 쇼호스트',
    oneLineIntro: '패션/뷰티 전문 진행',
    detailedRegion: '서울 · 마포',
    experienceYears: 5,
  }),
  isScrapped: true,
  onCardClick: handleCardClick,
  onScrapClick: handleScrapClick,
};

export const NoImagePortfolioCard = {
  portfolio: createPortfolio({
    id: 'portfolio-3',
    nickname: '이미지 없음',
    mainThumbnailUrl: null,
    detailedRegion: '부산 · 해운대',
    experienceYears: null,
  }),
  isScrapped: false,
  onCardClick: handleCardClick,
  onScrapClick: handleScrapClick,
};

export const PortfolioShowcase: React.FC = () => {
  const portfolios = [
    createPortfolio({
      id: 'portfolio-4',
      nickname: '은재',
      oneLineIntro: '쇼핑라이브·프리젠터',
      detailedRegion: '서울 · 송파',
      experienceYears: 4,
    }),
    createPortfolio({
      id: 'portfolio-5',
      nickname: '다은',
      oneLineIntro: '뷰티/라이프 전문',
      detailedRegion: '경기 · 성남',
      experienceYears: 2,
      mainThumbnailUrl:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    }),
    createPortfolio({
      id: 'portfolio-6',
      nickname: '채린',
      oneLineIntro: '인테리어/리빙 진행',
      detailedRegion: '부산 · 남구',
      experienceYears: 6,
    }),
  ];

  return (
    <ShowcaseContainer>
      {portfolios.map((portfolio) => (
        <PortfolioCard
          key={portfolio.id}
          portfolio={portfolio}
          isScrapped={portfolio.id === 'portfolio-5'}
          onCardClick={handleCardClick}
          onScrapClick={handleScrapClick}
        />
      ))}
    </ShowcaseContainer>
  );
};

const ShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

