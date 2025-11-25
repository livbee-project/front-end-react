import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';
import { useListFilters } from '@/presentation/hooks/useListFilters';
import { useListSearch } from '@/presentation/hooks/useListSearch';
import { useScrapToggle } from '@/presentation/hooks/useScrapToggle';
import { CampaignHeader } from '@/presentation/components/campaign/CampaignHeader';
import { CampaignSearchSection } from '@/presentation/components/campaign/CampaignSearchSection';
import { CampaignFilterRow } from '@/presentation/components/campaign/CampaignFilterRow';
import { CampaignListContent } from '@/presentation/components/campaign/CampaignListContent';

type FilterValue = '전체' | Campaign['category'];

const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { searchInputValue, setSearchInputValue, searchQuery, handleSearchSubmit, clearSearch } = useListSearch();
  const { activeFilter, setActiveFilter } = useListFilters<FilterValue>('전체');
  const { handleScrapToggle, isScrapped } = useScrapToggle();

  const campaignRepository = useRepository(CampaignRepository);

  // query 객체 메모이제이션
  const query = useMemo(
    () => ({
      page: currentPage,
      limit: 20,
      search: searchQuery || undefined,
      sort: 'latest' as const,
    }),
    [currentPage, searchQuery]
  );

  // fetchFunction 메모이제이션
  const fetchCampaigns = useCallback(
    (
      query: { page: number; limit: number; search?: string; sort?: 'latest' | 'deadline' },
      signal?: AbortSignal
    ) => {
      return campaignRepository.getCampaignList(query, signal);
    },
    [campaignRepository]
  );

  const {
    data: campaigns,
    loading,
    error,
    totalPages,
  } = useListData<
    Campaign,
    { page: number; limit: number; search?: string; sort?: 'latest' | 'deadline' },
    { items: Campaign[]; currentPage?: number; totalPages?: number; totalItems?: number }
  >(
    fetchCampaigns,
    query,
    [currentPage, searchQuery],
    '캠페인 목록을 불러오는 중 오류가 발생했습니다.'
  );

  const filteredCampaigns = useMemo(() => {
    if (activeFilter === '전체') {
      return campaigns;
    }
    return campaigns.filter((campaign) => campaign.category === activeFilter);
  }, [campaigns, activeFilter]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSearchSubmit(event);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: FilterValue) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  const handleCardClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const handleScrapClick = (campaignId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    handleScrapToggle(campaignId);
  };

  const handleRetry = () => {
    setCurrentPage(1);
    clearSearch();
  };

  return (
    <PageWrapper>
      <PageInner>
        <CampaignHeader
          title="진행중인 캠페인"
          description="브랜드가 찾고 있는 쇼호스트에 지원해보세요"
          highlightText="캠페인"
        />

        <CampaignSearchSection
          value={searchInputValue}
          onChange={setSearchInputValue}
          onSubmit={handleFormSubmit}
        />

        <CampaignFilterRow activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        <CampaignListContent
          campaigns={campaigns}
          filteredCampaigns={filteredCampaigns}
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

      <RegisterFab type="button" onClick={() => navigate('/campaigns/register')} aria-label="모집공고 등록">
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

export default CampaignsPage;
