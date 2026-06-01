import React from 'react';
import styled from 'styled-components';
import { CommunitySearchBar } from '@/presentation/components/community/CommunitySearchBar';
import { CommunityCategoryTabs } from '@/presentation/components/community/CommunityCategoryTabs';
import { CommunityPostCard } from '@/presentation/components/community/CommunityPostCard';
import { CommunityFabButton } from '@/presentation/components/community/CommunityFabButton';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { useCommunityPageController } from '@/presentation/hooks/community/useCommunityPageController';

const CommunityPage: React.FC = () => {
  const {
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
  } = useCommunityPageController();

  return (
    <PageWrapper>
      <PageInner>
        <CommunitySearchBar
          value={searchInputValue}
          onChange={setSearchInputValue}
          onSubmit={handleFormSubmit}
        />

        <CommunityCategoryTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {loading && posts.length === 0 && <LoadingState padding="40px" />}

        {!loading && error && (
          <ErrorState
            message={error}
            padding="40px"
            onRetry={handleRetry}
            retryLabel="다시 불러오기"
          />
        )}

        {!loading && !error && posts.length === 0 && (
          <EmptyState message="첫 번째 커뮤니티 글을 기다리고 있어요." padding="40px" />
        )}

        <PostList>
          {posts.map((post) => (
            <li key={post.id}>
              <CommunityPostCard post={post} onClick={handleCardClick} />
            </li>
          ))}
        </PostList>

        {!loading && !error && hasMore && (
          <LoadMoreButton
            type="button"
            onClick={handleLoadMore}
          >
            더 보기
          </LoadMoreButton>
        )}
      </PageInner>

      <CommunityFabButton onClick={handleFabClick} />
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
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LoadMoreButton = styled.button`
  align-self: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font: ${({ theme }) => theme.fonts.button};
  color: ${({ theme }) => theme.colors.foreground};
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default CommunityPage;

