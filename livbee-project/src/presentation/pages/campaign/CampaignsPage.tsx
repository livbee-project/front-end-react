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
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [searchInputValue, setSearchInputValue] = React.useState<string>('');
  const [activeFilter, setActiveFilter] = React.useState<(typeof filters)[number]['value']>('전체');
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchInputValue.trim());
  };

  const handleFilterChange = (value: (typeof filters)[number]['value']) => {
    setActiveFilter(value);
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
              setSearchQuery('');
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
              <CardHeader>
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
              </CardHeader>

              <CampaignTitle>{campaign.title}</CampaignTitle>

              <BadgeContainer>
                {buildBadgeItems(campaign).map((badge) => (
                  <InfoBadge key={`${campaign.id}-${badge}`}>{badge}</InfoBadge>
                ))}
              </BadgeContainer>

              <CardFooter>
                <FeeText>{formatFee(campaign.fee)}</FeeText>
                <DeadlineText>{formatDeadline(campaign.closeAt)}</DeadlineText>
              </CardFooter>
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

        <SearchSection onSubmit={handleSearchSubmit}>
          <SearchIconWrapper size={18} aria-hidden="true" />
          <SearchInput
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
    badges.push(`촬영 ${formatDate(campaign.shootDate)}`);
  }
  return badges;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const formatFee = (fee?: number) => {
  if (fee == null) {
    return '협의';
  }

  if (fee >= 10000) {
    const millionWon = Math.round(fee / 10000);
    return `${millionWon.toLocaleString('ko-KR')}만원`;
  }

  return `${fee.toLocaleString('ko-KR')}원`;
};

const formatDeadline = (deadline?: string) => {
  if (!deadline) return '상시';
  const now = new Date();
  const target = new Date(deadline);
  if (Number.isNaN(target.getTime())) {
    return '상시';
  }
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return '마감';
  if (diff === 0) return 'D-day';
  return `D-${diff}`;
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
  gap: 1.5rem;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  line-height: 1.3;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const PageDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1rem;
`;

const SearchSection = styled.form`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  padding-left: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBackground};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.foreground};
  transition: border-color 0.2s, box-shadow 0.2s;
  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(104, 124, 244, 0.15);
  }
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
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
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
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
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
    background: rgba(104, 124, 244, 0.1);
    color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    transform: scale(0.98);
  }
`;

const CardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CampaignCard = styled.article`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 8px rgba(104, 124, 244, 0.1);
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

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

const CampaignTitle = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.4;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const InfoBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FeeText = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const DeadlineText = styled.span`
  font-weight: 500;
  color: #ff5a5f;
`;

const PaginationWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
`;

const RegisterFab = styled.button`
  position: fixed;
  right: 1.5rem;
  bottom: 6rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 24px rgba(104, 124, 244, 0.35);
  cursor: pointer;
  z-index: 50;
  transition: transform 0.2s, background 0.2s;
  &:hover {
    background: #5b6de0;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const StateWrapper = styled.div`
  padding: 2rem 0;
`;

export default CampaignsPage;
