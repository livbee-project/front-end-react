import React from 'react';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import {
  buildPortfolioRating,
  buildPortfolioSupplementary,
} from '@/presentation/components/cards/content/portfolioCardHelpers';
import type { Portfolio } from '@/domain/entities/Portfolio';

interface PortfolioCardProps {
  portfolio: Portfolio;
  isScrapped: boolean;
  onCardClick: () => void;
  onScrapClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/** @deprecated 목록 UI는 ContentCard variant="showhost"를 직접 사용하는 것을 권장합니다. */
export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  isScrapped,
  onCardClick,
  onScrapClick,
}) => {
  return (
    <ContentCard
      variant="showhost"
      imageUrl={portfolio.mainThumbnailUrl || undefined}
      imageAlt={portfolio.nickname || '쇼호스트'}
      heading={portfolio.nickname || '이름 없음'}
      supplementary={buildPortfolioSupplementary(portfolio)}
      rating={buildPortfolioRating(portfolio)}
      isFavorite={isScrapped}
      onFavoriteToggle={onScrapClick}
      onClick={onCardClick}
    />
  );
};
