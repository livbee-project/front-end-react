import React from 'react';
import styled from 'styled-components';
import { useListPageState } from '@/presentation/hooks/list/useListPageState';

export interface ListStatePlaceholderProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  emptyMessage?: string;
  onRetry?: () => void;
  showEmptyState?: boolean;
  children: React.ReactNode;
}

/**
 * 목록 상태(로딩/에러/빈 상태)를 공통 처리하는 컴포넌트
 */
export function ListStatePlaceholder<T>({
  data,
  loading,
  error,
  emptyMessage,
  onRetry,
  showEmptyState = true,
  children,
}: ListStatePlaceholderProps<T>) {
  const { renderState, isReady } = useListPageState<T>({
    data,
    loading,
    error,
    onRetry,
    emptyMessage,
    showEmptyState,
    LayoutComponent: StateWrapper,
  });

  if (renderState) {
    return <>{renderState}</>;
  }

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}

const StateWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

