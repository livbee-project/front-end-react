import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Search as SearchIcon, Star, Plus } from 'lucide-react';
import Pagination from '@/presentation/components/list/Pagination';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { Portfolio } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';
import { useListFilters } from '@/presentation/hooks/useListFilters';
import { useListSearch } from '@/presentation/hooks/useListSearch';
import { H1, H3, PMuted, Caption, Highlight } from '@/presentation/components/styled/Typography';
import { Input, Badge } from '@/presentation/components/styled/CommonStyles';
import { Card } from '@/presentation/components/styled/SectionStyles';
import { buildPortfolioBadgeItems, formatExperience } from '@/shared/utils/badgeUtils';
import { useScrapToggle } from '@/presentation/hooks/useScrapToggle';

const filters: Array<{ label: string; value: string }> = [
  { label: '전체', value: '전체' },
  { label: '뷰티', value: '뷰티' },
  { label: '패션', value: '패션' },
  { label: '식품', value: '식품' },
  { label: '가전', value: '가전' },
  { label: '생활/리빙', value: '생활/리빙' },
];

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { searchInputValue, setSearchInputValue, searchQuery, handleSearchSubmit, clearSearch } = useListSearch();
  const { activeFilter, setActiveFilter } = useListFilters<string>('전체');
  const { handleScrapToggle, isScrapped } = useScrapToggle();

  const portfolioRepository = useRepository(PortfolioRepository);

  const {
    data: portfolios,
    loading,
    error,
    totalPages,
  } = useListData<
    Portfolio,
    { page: number; limit: number; search?: string },
    { items: Portfolio[]; currentPage?: number; totalPages?: number; totalItems?: number }
  >(
    (query, signal) => portfolioRepository.getPortfolioList(query, signal),
    {
      page: currentPage,
      limit: 20,
      search: searchQuery || undefined,
    },
    [currentPage, searchQuery],
    '포트폴리오 목록을 불러오는 중 오류가 발생했습니다.'
  );

  const filteredPortfolios = React.useMemo(() => {
    // TODO: 필터 기능은 추후 카테고리 데이터 추가 시 구현
    return portfolios;
  }, [portfolios, activeFilter]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSearchSubmit(event);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  const renderState = () => {
    if (loading && portfolios.length === 0) {
      return (
        <StateWrapper>
          <LoadingState />
        </StateWrapper>
      );
    }

    if (error && portfolios.length === 0) {
      return (
        <StateWrapper>
          <ErrorState
            message={error}
            onRetry={() => {
              setCurrentPage(1);
              clearSearch();
            }}
          />
        </StateWrapper>
      );
    }

    if (!loading && filteredPortfolios.length === 0) {
      return (
        <StateWrapper>
          <EmptyState message="등록된 쇼호스트가 없습니다." />
        </StateWrapper>
      );
    }

    return (
      <>
        <CardsColumn>
          {filteredPortfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              onClick={() => navigate(`/portfolios/${portfolio.id}`)}
            >
              <TopSection>
                <ProfileImageContainer>
                  {portfolio.mainThumbnailUrl ? (
                    <ProfileImage src={portfolio.mainThumbnailUrl} alt={portfolio.nickname || '프로필'} />
                  ) : (
                    <PlaceholderImage />
                  )}
                </ProfileImageContainer>

                <HostContent>
                  <HostNameRow>
                    <HostName as={H3}>{portfolio.nickname || '이름 없음'}</HostName>
                    <ScrapButton
                      type="button"
                      aria-label="스크랩"
                      aria-pressed={isScrapped(portfolio.id)}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleScrapToggle(portfolio.id);
                      }}
                    >
                      <StyledStar
                        size={16}
                        $active={isScrapped(portfolio.id)}
                        aria-hidden="true"
                      />
                    </ScrapButton>
                  </HostNameRow>

                  <HostIntro as={PMuted}>{portfolio.oneLineIntro || '소개 없음'}</HostIntro>
                </HostContent>
              </TopSection>

              <BadgeContainer>
                {buildPortfolioBadgeItems(portfolio).map((badge, index) => (
                  <Badge key={`${portfolio.id}-${index}`} $variant="secondary" as="span">{badge}</Badge>
                ))}
                {portfolio.experienceYears != null && portfolio.experienceYears > 0 && (
                  <InfoText as={Caption}>{formatExperience(portfolio.experienceYears)}</InfoText>
                )}
              </BadgeContainer>
            </PortfolioCard>
          ))}
        </CardsColumn>

        {totalPages && totalPages > 1 && (
          <PaginationWrapper>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </PaginationWrapper>
        )}
      </>
    );
  };

  return (
    <PageWrapper>
      <PageInner>
        <HeaderSection>
          <PageTitle>
            쇼호스트 <Highlight>찾기</Highlight>
          </PageTitle>
          <PageDescription>브랜드에 맞는 쇼호스트를 찾아보세요</PageDescription>
        </HeaderSection>

        <SearchSection onSubmit={handleFormSubmit}>
          <SearchIconWrapper size={18} aria-hidden="true" />
          <StyledInput
            type="text"
            placeholder="이름, 카테고리로 검색"
            value={searchInputValue}
            onChange={(event) => setSearchInputValue(event.target.value)}
          />
        </SearchSection>

        <FilterRow>
          {filters.map((filter) => (
            <FilterBadge
              key={filter.value}
              type="button"
              $isActive={activeFilter === filter.value}
              onClick={() => handleFilterChange(filter.value)}
            >
              {filter.label}
            </FilterBadge>
          ))}
        </FilterRow>

        {renderState()}
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

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PageTitle = styled(H1)`
  font-size: 1.75rem;
  line-height: 1.3;
`;

const PageDescription = styled(PMuted)`
  font-size: 1rem;
`;

const SearchSection = styled.form`
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StyledInput = styled(Input)`
  padding-left: 2.5rem;
`;

const SearchIconWrapper = styled(SearchIcon)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
`;

const FilterRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterBadge = styled.button<{ $isActive: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  white-space: nowrap;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font: ${({ theme }) => theme.fonts.caption};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.2s;
  ${({ $isActive }) =>
    $isActive
      ? css`
          background: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.primaryForeground};
        `
      : css`
          background: ${({ theme }) => theme.colors.secondary};
          color: ${({ theme }) => theme.colors.foreground};
        `}
  &:hover {
    background: ${({ theme }) => theme.primaryOpacity['10']};
    color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const CardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PortfolioCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 8px ${({ theme }) => theme.primaryOpacity['10']};
    transform: translateY(-2px);
  }
`;

const TopSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProfileImageContainer = styled.div`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.secondary};
`;

const HostContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const HostNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const HostName = styled(H3)``;

const ScrapButton = styled.button`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background-color 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.primaryOpacity['05']};
  }
`;

const StyledStar = styled(Star)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  ${({ $active }) =>
    $active &&
    css`
      fill: ${({ theme }) => theme.colors.primary};
    `}
  transition: color 0.2s, fill 0.2s;
  ${ScrapButton}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HostIntro = styled(PMuted)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: center;
  min-width: 0;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoText = styled(Caption)`
  white-space: nowrap;
  flex-shrink: 0;
`;

const PaginationWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
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

const StateWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`;

export default PortfolioPage;
