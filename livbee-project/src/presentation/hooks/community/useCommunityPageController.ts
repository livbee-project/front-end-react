import { useCallback, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommunityRepository } from '@/data/repositories/CommunityRepository';
import type {
  CommunityCategoryCode,
  CommunityListQuery,
  CommunityPost,
  CommunityListResponse,
} from '@/domain/entities/Community';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListFetcher } from '@/presentation/hooks/list/useListFetcher';
import { useListFilters } from '@/presentation/hooks/list/useListFilters';
import { useListSearch } from '@/presentation/hooks/list/useListSearch';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';

export type CommunityFilterValue = 'all' | CommunityCategoryCode;

export interface CommunityPageController {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;

  activeFilter: CommunityFilterValue;
  handleFilterChange: (value: CommunityFilterValue) => void;

  posts: CommunityPost[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;

  handleRetry: () => void;
  handleLoadMore: () => void;
  handleCardClick: (postId: string) => void;
  handleFabClick: () => void;
}

export const useCommunityPageController = (): CommunityPageController => {
  const navigate = useNavigate();
  const location = useLocation();

  const communityRepository = useRepository(CommunityRepository);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { searchInputValue, setSearchInputValue, searchQuery, handleSearchSubmit, clearSearch } = useListSearch();
  const { activeFilter, setActiveFilter } = useListFilters<CommunityFilterValue>('all');

  const query: CommunityListQuery = useMemo(
    () => ({
      page: currentPage,
      limit: 20,
      search: searchQuery || undefined,
      category: activeFilter,
      sort: 'latest',
    }),
    [activeFilter, currentPage, searchQuery]
  );

  const { data: posts, loading, error, totalPages } = useListFetcher<
    CommunityPost,
    CommunityListQuery,
    CommunityRepository,
    CommunityListResponse
  >({
    repository: communityRepository,
    method: 'getPostList',
    query,
    dependencies: [communityRepository, currentPage, searchQuery, activeFilter],
    errorMessage: '커뮤니티 게시글 목록을 불러오는 중 오류가 발생했습니다.',
    cacheKey: `community-list-${JSON.stringify(query)}`,
  });

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      handleSearchSubmit(event);
      setCurrentPage(1);
    },
    [handleSearchSubmit]
  );

  const handleFilterChange = useCallback(
    (value: CommunityFilterValue) => {
      setActiveFilter(value);
      setCurrentPage(1);
    },
    [setActiveFilter]
  );

  const handleRetry = useCallback(() => {
    clearSearch();
    setCurrentPage(1);
  }, [clearSearch]);

  const handleCardClick = useCallback(
    (postId: string) => {
      navigate(ROUTE_PATHS.communityDetail.replace(':id', postId), {
        state: { backgroundLocation: location },
      });
    },
    [navigate, location]
  );

  const handleFabClick = useCallback(() => {
    navigate(ROUTE_PATHS.communityWrite, {
      state: { backgroundLocation: location },
    });
  }, [navigate, location]);

  const hasMore = currentPage < (totalPages || 1);

  const handleLoadMore = useCallback(() => {
    if (!hasMore) return;
    setCurrentPage((prev) => prev + 1);
  }, [hasMore]);

  return {
    searchInputValue,
    setSearchInputValue,
    handleFormSubmit,
    activeFilter,
    handleFilterChange,
    posts,
    loading,
    error,
    hasMore,
    handleRetry,
    handleLoadMore,
    handleCardClick,
    handleFabClick,
  };
};

