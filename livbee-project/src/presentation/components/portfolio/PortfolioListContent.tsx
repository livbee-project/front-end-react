import React from 'react';
import styled from 'styled-components';
import Pagination from '@/presentation/components/list/Pagination';
import { ListStatePlaceholder } from '@/presentation/components/list/ListStatePlaceholder';
import { PortfolioCard } from '@/presentation/components/portfolio/PortfolioCard';
import type { Portfolio } from '@/domain/entities/Portfolio';

interface PortfolioListContentProps {
  portfolios: Portfolio[];
  filteredPortfolios: Portfolio[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages?: number;
  isScrapped: (id: string) => boolean;
  onCardClick: (portfolioId: string) => void;
  onScrapClick: (portfolioId: string, event: React.MouseEvent) => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

export const PortfolioListContent: React.FC<PortfolioListContentProps> = ({
  portfolios,
  filteredPortfolios,
  loading,
  error,
  currentPage,
  totalPages,
  isScrapped,
  onCardClick,
  onScrapClick,
  onPageChange,
  onRetry,
}) => {
  return (
    <ListStatePlaceholder
      data={filteredPortfolios}
      loading={loading}
      error={error}
      onRetry={onRetry}
      emptyMessage="등록된 쇼호스트가 없습니다."
      showEmptyState={true}
    >
      <>
        <CardsColumn>
          {filteredPortfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              isScrapped={isScrapped(portfolio.id)}
              onCardClick={() => onCardClick(portfolio.id)}
              onScrapClick={(event) => onScrapClick(portfolio.id, event)}
            />
          ))}
        </CardsColumn>

        {totalPages && totalPages > 1 && (
          <PaginationWrapper>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
          </PaginationWrapper>
        )}
      </>
    </ListStatePlaceholder>
  );
};

const CardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PaginationWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
`;

