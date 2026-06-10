import React, { useMemo, useState } from 'react';
import {
  filterPortfolioMockList,
  PORTFOLIO_FILTER_OPTIONS,
} from '@/data/sources/mocks/portfolioMockData';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { Portfolio } from '@/domain/entities/Portfolio';
import { isPortfolioMockEnabled } from '@/shared/config/portfolioMockConfig';
import LoginRequiredModal from '@/presentation/components/navigation/LoginRequiredModal';
import PortfolioListCard from '@/presentation/pages/portfolio/components/PortfolioListCard';
import type { PortfolioFilterKey } from '@/presentation/pages/portfolio/types/portfolioView';
import {
  PortfolioCardGrid,
  PortfolioFilterBar,
  PortfolioFilterButton,
  PortfolioListMain,
  PortfolioListPageRoot,
  PortfolioListSection,
  PortfolioRegisterFab,
  PortfolioSectionHeader,
} from '@/presentation/pages/portfolio/styles/portfolioList.styles';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListFetcher } from '@/presentation/hooks/list/useListFetcher';
import { useRegisterFabAction } from '@/presentation/hooks/common/useRegisterFabAction';
import { useRegisterFabVisibility } from '@/presentation/hooks/common/useRegisterFabVisibility';
import { EmptyState } from '@/presentation/components/states/EmptyState';

const PortfolioPage: React.FC = () => {
  const useMock = isPortfolioMockEnabled();
  const { shouldHideRegisterFab } = useRegisterFabVisibility('showhost');
  const {
    handleRegisterClick,
    isLoginModalOpen,
    closeLoginModal,
    confirmLoginRedirect,
  } = useRegisterFabAction({
    registerPath: '/portfolios/register',
    originPage: '/portfolios',
    redirectPath: '/portfolios/register',
    targetRole: 'showhost',
    roleErrorMessage: '쇼호스트 권한 사용자만 이용 가능한 기능입니다.',
    loginPath: '/login?userType=showhost',
  });
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterKey>('전체');

  const portfolioRepository = useRepository(PortfolioRepository);
  const query = useMemo(() => ({ page: 1, limit: 20 }), []);

  const {
    data: apiPortfolios,
    loading,
    error,
  } = useListFetcher<
    Portfolio,
    { page: number; limit: number },
    PortfolioRepository,
    { items: Portfolio[]; currentPage?: number; totalPages?: number }
  >({
    repository: portfolioRepository,
    method: 'getPortfolioList',
    query,
    dependencies: [],
    errorMessage: '포트폴리오 목록을 불러오는 중 오류가 발생했습니다.',
    cacheKey: 'portfolio-list-page',
    enabled: !useMock,
  });

  const mockListItems = useMemo(
    () => filterPortfolioMockList(activeFilter),
    [activeFilter],
  );

  const apiListItems = useMemo(() => {
    if (useMock) return [];

    return apiPortfolios.map((portfolio) => ({
      id: portfolio.id,
      name: portfolio.nickname ?? '이름 없음',
      summary: portfolio.oneLineIntro ?? '',
      profileImage: portfolio.mainThumbnailUrl ?? '',
      category: '전체',
      experienceYears: portfolio.experienceYears ?? 0,
    }));
  }, [apiPortfolios, useMock]);

  const listItems = useMock ? mockListItems : apiListItems;
  const isLoading = useMock ? false : loading;
  const listError = useMock ? null : error;

  return (
    <PortfolioListPageRoot>
      <PortfolioListMain>
        <PortfolioFilterBar aria-label="쇼호스트 필터">
          {PORTFOLIO_FILTER_OPTIONS.map((filter) => (
            <PortfolioFilterButton
              key={filter}
              type="button"
              $active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </PortfolioFilterButton>
          ))}
        </PortfolioFilterBar>

        <PortfolioListSection>
          <PortfolioSectionHeader>
            <div>
              <h2>
                추천 <em>쇼호스트</em>
              </h2>
              <p>홈 카드와 동일한 정보 기준으로 노출됩니다.</p>
            </div>
            <span>{listItems.length}명</span>
          </PortfolioSectionHeader>

          {isLoading ? <p>불러오는 중...</p> : null}
          {listError ? <p>{listError}</p> : null}

          {!isLoading && !listError && listItems.length === 0 ? (
            <EmptyState message="등록된 쇼호스트가 없습니다." />
          ) : null}

          {!isLoading && !listError && listItems.length > 0 ? (
            <PortfolioCardGrid>
              {listItems.map((item) => (
                <PortfolioListCard key={item.id} item={item} />
              ))}
            </PortfolioCardGrid>
          ) : null}
        </PortfolioListSection>
      </PortfolioListMain>

      {!shouldHideRegisterFab ? (
        <PortfolioRegisterFab type="button" onClick={handleRegisterClick} aria-label="쇼호스트 등록">
          +
        </PortfolioRegisterFab>
      ) : null}

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onConfirm={confirmLoginRedirect}
      />
    </PortfolioListPageRoot>
  );
};

export default PortfolioPage;
