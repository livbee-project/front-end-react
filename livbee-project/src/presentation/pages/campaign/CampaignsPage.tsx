import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListFetcher } from '@/presentation/hooks/list/useListFetcher';
import { useListFilters } from '@/presentation/hooks/list/useListFilters';
import { useListSearch } from '@/presentation/hooks/list/useListSearch';
import { useScrapToggle } from '@/presentation/hooks/common/useScrapToggle';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { setAuthRedirectPath, setOriginPage } from '@/shared/utils/authRedirect';
import LoginRequiredModal from '@/presentation/components/navigation/LoginRequiredModal';
import { CampaignSearchSection } from '@/presentation/components/campaign/CampaignSearchSection';
import { CampaignFilterRow } from '@/presentation/components/campaign/CampaignFilterRow';
import { CampaignListContent } from '@/presentation/components/campaign/CampaignListContent';

type FilterValue = '전체' | Campaign['category'];

const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, currentRole } = useAuth();
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
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
  const {
    data: campaigns,
    loading,
    error,
    totalPages,
  } = useListFetcher<
    Campaign,
    { page: number; limit: number; search?: string; sort?: 'latest' | 'deadline' },
    CampaignRepository,
    { items: Campaign[]; currentPage?: number; totalPages?: number; totalItems?: number }
  >({
    repository: campaignRepository,
    method: 'getCampaignList',
    query,
    dependencies: [currentPage, searchQuery],
    errorMessage: '캠페인 목록을 불러오는 중 오류가 발생했습니다.',
    cacheKey: `campaign-list-${JSON.stringify(query)}`,
  });

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

      <RegisterFab
        type="button"
        onClick={() => {
          // 비회원인 경우 로그인 모달 표시
          if (!isLoggedIn) {
            setIsLoginModalOpen(true);
            return;
          }
          // 다중 역할 계정 지원: currentRole이 있으면 currentRole도 확인
          // currentRole이 'brand'가 아니면 접근 불가
          if (currentRole && currentRole !== 'brand') {
            showToast('브랜드 권한 사용자만 이용 가능한 기능입니다.', undefined, 'error');
            return;
          }
          // 브랜드 권한이 아닌 경우 권한 오류 토스트
          // 다중 역할 계정 지원: isBrand 플래그를 우선 확인하고, 없으면 기존 role 필드로 확인 (하위 호환)
          const hasBrandRole = user?.isBrand === true || (user?.isBrand === undefined && user?.role === 'brand');
          if (!hasBrandRole) {
            showToast('브랜드 권한 사용자만 이용 가능한 기능입니다.', undefined, 'error');
            return;
          }
          navigate('/campaigns/register');
        }}
        aria-label="모집공고 등록"
      >
        <Plus size={24} strokeWidth={2.5} />
      </RegisterFab>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onConfirm={() => {
          // 현재 페이지 경로 저장 (권한 불일치 시 돌아갈 페이지)
          setOriginPage('/campaigns');
          // 등록 페이지 경로 저장 (로그인 성공 시 이동할 페이지)
          setAuthRedirectPath('/campaigns/register');
          setIsLoginModalOpen(false);
          navigate('/login', { replace: true });
        }}
      />
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
