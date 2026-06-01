import React from 'react';
import { describe, it, expect } from 'vitest';
import { useDetailPageState } from '@/presentation/hooks/detail/useDetailPageState';
import { useListPageState } from '@/presentation/hooks/list/useListPageState';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { EmptyState } from '@/presentation/components/states/EmptyState';

const DummyLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="layout">{children}</div>
);

describe('useDetailPageState', () => {
  it('returns loading state when data is not ready', () => {
    const { renderState, isReady } = useDetailPageState({
      data: null,
      loading: true,
      error: null,
      listPath: '/test',
      LayoutComponent: DummyLayout,
    });

    expect(isReady).toBe(false);
    expect(renderState).toBeTruthy();
    if (renderState && typeof renderState === 'object' && 'props' in renderState) {
      const layout = renderState as React.ReactElement;
      const child = layout.props.children as React.ReactElement;
      expect(child.type).toBe(LoadingState);
    }
  });

  it('returns error state when data fetch fails', () => {
    const { renderState, isReady } = useDetailPageState({
      data: null,
      loading: false,
      error: '에러 발생',
      listPath: '/test',
    });

    expect(isReady).toBe(false);
    expect(renderState && (renderState as React.ReactElement).type).toBe(ErrorState);
  });

  it('returns ready state when data is available', () => {
    const { renderState, isReady } = useDetailPageState({
      data: { id: '1' },
      loading: false,
      error: null,
      listPath: '/test',
    });

    expect(isReady).toBe(true);
    expect(renderState).toBeNull();
  });
});

describe('useListPageState', () => {
  it('returns loading UI when list is loading', () => {
    const { renderState, isReady } = useListPageState({
      data: [],
      loading: true,
      error: null,
    });

    expect(isReady).toBe(false);
    expect(renderState && (renderState as React.ReactElement).type).toBe(LoadingState);
  });

  it('returns error UI when request fails and no data', () => {
    const { renderState, isReady } = useListPageState({
      data: [],
      loading: false,
      error: '에러',
    });

    expect(isReady).toBe(false);
    expect(renderState && (renderState as React.ReactElement).type).toBe(ErrorState);
  });

  it('returns empty state when list is empty and showEmptyState is true', () => {
    const { renderState, isReady } = useListPageState({
      data: [],
      loading: false,
      error: null,
      emptyMessage: '데이터 없음',
    });

    expect(isReady).toBe(false);
    expect(renderState && (renderState as React.ReactElement).type).toBe(EmptyState);
  });

  it('returns ready state when list has items', () => {
    const { renderState, isReady } = useListPageState({
      data: [{ id: 1 }],
      loading: false,
      error: null,
    });

    expect(isReady).toBe(true);
    expect(renderState).toBeNull();
  });
});

