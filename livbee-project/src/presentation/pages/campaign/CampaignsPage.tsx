import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Search as SearchIcon, Star, Plus } from 'lucide-react';
import Pagination from '@/presentation/components/list/Pagination';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';
import { useListFilters } from '@/presentation/hooks/useListFilters';
import { useListSearch } from '@/presentation/hooks/useListSearch';
import { H1, H2, H3, PMuted, CaptionMedium, Highlight } from '@/presentation/components/styled/Typography';
import { Input, Badge } from '@/presentation/components/styled/CommonStyles';
import { Card, CardHeader, CardFooter } from '@/presentation/components/styled/SectionStyles';
import { calculateDDay, formatDate as formatDateLabel } from '@/shared/utils/dateUtils';
import { formatCurrency } from '@/shared/utils/formatUtils';

const filters: Array<{ label: string; value: '전체' | Campaign['category'] }> = [
  { label: '전체', value: '전체' },
  { label: '뷰티', value: '뷰티' },
  { label: '패션', value: '패션' },
  { label: '식품', value: '식품' },
  { label: '가전', value: '가전' },
  { label: '생활/리빙', value: '생활/리빙' },
];

const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { searchInputValue, setSearchInputValue, searchQuery, handleSearchSubmit, clearSearch } = useListSearch();
  const { activeFilter, setActiveFilter } = useListFilters<(typeof filters)[number]['value']>('전체');
  const [scrapMap, setScrapMap] = React.useState<Record<string, boolean>>({});

  const campaignRepository = useRepository(CampaignRepository);

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
    (query, signal) => campaignRepository.getCampaignList(query, signal),
    {
      page: currentPage,
      limit: 20,
      search: searchQuery || undefined,
      sort: 'latest' as const,
    },
    [currentPage, searchQuery],
    '캠페인 목록을 불러오는 중 오류가 발생했습니다.'
  );

  const filteredCampaigns = React.useMemo(() => {
    if (activeFilter === '전체') {
      return campaigns;
    }
    return campaigns.filter((campaign) => campaign.category === activeFilter);
  }, [campaigns, activeFilter]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSearchSubmit(event);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: (typeof filters)[number]['value']) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  const handleScrapToggle = (campaignId: string) => {
    setScrapMap((prev) => ({
      ...prev,
      [campaignId]: !prev[campaignId],
    }));
  };

  const renderState = () => {
    if (loading && campaigns.length === 0) {
      return (
        <StateWrapper>
          <LoadingState />
        </StateWrapper>
      );
    }

    if (error && campaigns.length === 0) {
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

    if (!loading && filteredCampaigns.length === 0) {
      return (
        <StateWrapper>
          <EmptyState message="등록된 공고가 없습니다." />
        </StateWrapper>
      );
    }

    return (
      <>
        <CardsColumn>
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
            >
              <StyledCardHeader>
                <BrandName>{campaign.brandName}</BrandName>
                <ScrapButton
                  type="button"
                  aria-label="스크랩"
                  aria-pressed={Boolean(scrapMap[campaign.id])}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleScrapToggle(campaign.id);
                  }}
                >
                  <StyledStar
                    size={20}
                    $active={Boolean(scrapMap[campaign.id])}
                    aria-hidden="true"
                  />
                </ScrapButton>
              </StyledCardHeader>

              <CampaignTitle as={H2}>{campaign.title}</CampaignTitle>

              <BadgeContainer>
                {buildBadgeItems(campaign).map((badge) => (
                  <Badge key={`${campaign.id}-${badge}`} $variant="secondary" as="span">{badge}</Badge>
                ))}
              </BadgeContainer>

              <StyledCardFooter>
                <FeeText>{formatFee(campaign.fee)}</FeeText>
                <DeadlineText>{getDeadlineLabel(campaign.closeAt)}</DeadlineText>
              </StyledCardFooter>
            </CampaignCard>
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
            진행중인 <Highlight>캠페인</Highlight>
          </PageTitle>
          <PageDescription>브랜드가 찾고 있는 쇼호스트에 지원해보세요</PageDescription>
        </HeaderSection>

        <SearchSection onSubmit={handleFormSubmit}>
          <SearchIconWrapper size={18} aria-hidden="true" />
          <StyledInput
            type="text"
            placeholder="브랜드명, 카테고리로 검색"
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

      <RegisterFab type="button" onClick={() => navigate('/campaigns/register')} aria-label="모집공고 등록">
        <Plus size={24} strokeWidth={2.5} />
      </RegisterFab>
    </PageWrapper>
  );
};

const buildBadgeItems = (campaign: Campaign): string[] => {
  const badges: string[] = [];
  if (campaign.location) {
    badges.push(campaign.location);
  }
  if (campaign.prefix) {
    badges.push(campaign.prefix);
  }
  if (campaign.category) {
    badges.push(campaign.category);
  }
  if (campaign.shootDate) {
    badges.push(`촬영 ${formatDateLabel(campaign.shootDate)}`);
  }
  return badges;
};

const formatFee = (fee?: number) => {
  if (fee == null) {
    return '협의';
  }

  if (fee >= 10000) {
    const millionWon = Math.round(fee / 10000);
    return `${millionWon.toLocaleString('ko-KR')}만원`;
  }

  return formatCurrency(fee);
};

const getDeadlineLabel = (deadline?: string) => {
  if (!deadline) return '상시';
  const label = calculateDDay(deadline);
  return label || '상시';
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
  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background: ${theme.colors.primary};
          color: ${theme.colors.primaryForeground};
        `
      : css`
          background: ${theme.colors.secondary};
          color: ${theme.colors.foreground};
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

const CampaignCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 8px ${({ theme }) => theme.primaryOpacity['10']};
    transform: translateY(-2px);
  }
`;

const StyledCardHeader = styled(CardHeader)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BrandName = styled(H3)``;

const ScrapButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
`;

const StyledStar = styled(Star)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  ${({ $active, theme }) =>
    $active &&
    css`
      fill: ${theme.colors.primary};
    `}
  transition: color 0.2s, fill 0.2s;
  ${ScrapButton}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CampaignTitle = styled(H2)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StyledCardFooter = styled(CardFooter)``;

const FeeText = styled(CaptionMedium)`
  color: ${({ theme }) => theme.colors.primary};
`;

const DeadlineText = styled(CaptionMedium)`
  color: ${({ theme }) => theme.colors.error};
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

export default CampaignsPage;
