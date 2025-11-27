import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { Portfolio } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListFetcher } from '@/presentation/hooks/useListFetcher';
import { useListFilters } from '@/presentation/hooks/useListFilters';
import { useListSearch } from '@/presentation/hooks/useListSearch';
import { useScrapToggle } from '@/presentation/hooks/useScrapToggle';
import { PortfolioHeader } from '@/presentation/components/portfolio/PortfolioHeader';
import { PortfolioSearchSection } from '@/presentation/components/portfolio/PortfolioSearchSection';
import { PortfolioFilterRow } from '@/presentation/components/portfolio/PortfolioFilterRow';
import { PortfolioListContent } from '@/presentation/components/portfolio/PortfolioListContent';

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchInputValue, setSearchInputValue, searchQuery, handleSearchSubmit, clearSearch } = useListSearch();
  const { activeFilter, setActiveFilter } = useListFilters<string>('전체');
  const { handleScrapToggle, isScrapped } = useScrapToggle();

  const portfolioRepository = useRepository(PortfolioRepository);

  // query 객체 메모이제이션
  const query = useMemo(
    () => ({
      page: currentPage,
      limit: 20,
      search: searchQuery || undefined,
    }),
    [currentPage, searchQuery]
  );

  const {
    data: portfolios,
    loading,
    error,
    totalPages,
  } = useListFetcher<
    Portfolio,
    { page: number; limit: number; search?: string },
    PortfolioRepository,
    { items: Portfolio[]; currentPage?: number; totalPages?: number; totalItems?: number }
  >({
    repository: portfolioRepository,
    method: 'getPortfolioList',
    query,
    dependencies: [currentPage, searchQuery],
    errorMessage: '포트폴리오 목록을 불러오는 중 오류가 발생했습니다.',
    cacheKey: `portfolio-list-${JSON.stringify(query)}`,
  });

  const filteredPortfolios = useMemo(() => {
    // TODO: 필터 기능은 추후 카테고리 데이터 추가 시 구현
    return portfolios;
  }, [portfolios]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSearchSubmit(event);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  const handleCardClick = (portfolioId: string) => {
    navigate(`/portfolios/${portfolioId}`);
  };

  const handleScrapClick = (portfolioId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    handleScrapToggle(portfolioId);
  };

  const handleRetry = () => {
    setCurrentPage(1);
    clearSearch();
  };

  return (
    <PageWrapper>
      <PageInner>
        <PortfolioHeader
          title="쇼호스트 찾기"
          description="브랜드에 맞는 쇼호스트를 찾아보세요"
          highlightText="찾기"
        />

        <PortfolioSearchSection
          value={searchInputValue}
          onChange={setSearchInputValue}
          onSubmit={handleFormSubmit}
        />

        <PortfolioFilterRow activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        <PortfolioListContent
          portfolios={portfolios}
          filteredPortfolios={filteredPortfolios}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          isScrapped={isScrapped}
          onCardClick={handleCardClick}
          onScrapClick={handleScrapClick}
          onPageChange={setCurrentPage}
          onRetry={handleRetry}
        />
      </PageInner>

      <RegisterFab type="button" onClick={() => navigate('/portfolios/register')} aria-label="쇼호스트 등록">
        <Plus size={24} strokeWidth={2.5} />
      </RegisterFab>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem 1rem 6rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2.5rem 1.5rem 6rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 3rem 2rem 6rem;
  }
`;

const PageInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const RegisterFab = styled.button`
  position: fixed;
  right: ${({ theme }) => theme.spacing.xl};
  bottom: 6rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 24px ${({ theme }) => theme.primaryOpacity['35']};
  cursor: pointer;
  z-index: 50;
  transition: transform 0.2s, background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export default PortfolioPage;
