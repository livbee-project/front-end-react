import React from 'react';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { EmptyState } from '@/presentation/components/states/EmptyState';

interface UseListPageStateOptions<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  LayoutComponent?: React.ComponentType<{ children: React.ReactNode }>;
  onRetry?: () => void;
  emptyMessage?: string;
  showEmptyState?: boolean;
}

export interface UseListPageStateReturn {
  renderState: React.ReactNode | null;
  isReady: boolean;
}

/**
 * 목록 페이지의 로딩/에러/빈 상태를 처리하는 훅
 */
export function useListPageState<T>({
  data,
  loading,
  error,
  LayoutComponent,
  onRetry,
  emptyMessage = '데이터가 없습니다.',
  showEmptyState = true,
}: UseListPageStateOptions<T>): UseListPageStateReturn {
  const renderWithLayout = (content: React.ReactNode) => {
    if (!LayoutComponent) {
      return content;
    }
    return <LayoutComponent>{content}</LayoutComponent>;
  };

  if (loading && data.length === 0) {
    return {
      renderState: renderWithLayout(<LoadingState padding="16px" />),
      isReady: false,
    };
  }

  if (error && data.length === 0) {
    return {
      renderState: renderWithLayout(<ErrorState message={error} onRetry={onRetry} padding="16px" />),
      isReady: false,
    };
  }

  if (showEmptyState && !loading && data.length === 0) {
    return {
      renderState: renderWithLayout(<EmptyState message={emptyMessage} padding="16px" />),
      isReady: false,
    };
  }

  return {
    renderState: null,
    isReady: true,
  };
}

