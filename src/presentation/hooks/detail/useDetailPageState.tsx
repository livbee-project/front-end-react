/**
 * Detail 페이지 상태 관리 훅
 * 로딩/에러 상태를 처리하고 적절한 UI를 반환합니다.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';

/**
 * Detail 페이지 상태 옵션
 */
export interface UseDetailPageStateOptions<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  notFoundMessage?: string;
  listPath: string; // 목록 페이지 경로
  LayoutComponent?: React.ComponentType<{ children: React.ReactNode }>; // 레이아웃 컴포넌트 (선택적)
}

/**
 * Detail 페이지 상태 관리 훅 반환 타입
 */
export interface UseDetailPageStateReturn {
  /**
   * 로딩/에러 상태에 따른 UI를 반환합니다.
   * 성공 상태일 경우 null을 반환하므로, 호출 측에서 실제 컨텐츠를 렌더링해야 합니다.
   */
  renderState: React.ReactNode | null;
  /**
   * 데이터가 로드되었는지 확인 (로딩 중이 아니고 에러가 없고 데이터가 있는 경우)
   */
  isReady: boolean;
}

/**
 * Detail 페이지의 로딩/에러 상태를 처리하는 훅
 */
export function useDetailPageState<T>({
  data,
  loading,
  error,
  notFoundMessage,
  listPath,
  LayoutComponent,
}: UseDetailPageStateOptions<T>): UseDetailPageStateReturn {
  const navigate = useNavigate();

  // 로딩 상태
  if (loading) {
    const loadingUI = <LoadingState padding="16px" />;
    return {
      renderState: LayoutComponent ? (
        <LayoutComponent>{loadingUI}</LayoutComponent>
      ) : (
        loadingUI
      ),
      isReady: false,
    };
  }

  // 에러 상태 또는 데이터 없음
  if (error || !data) {
    const errorUI = (
      <ErrorState
        message={error || notFoundMessage || '데이터를 찾을 수 없습니다.'}
        padding="16px"
        onRetry={() => navigate(listPath)}
        retryLabel="목록으로 돌아가기"
      />
    );
    return {
      renderState: LayoutComponent ? (
        <LayoutComponent>{errorUI}</LayoutComponent>
      ) : (
        errorUI
      ),
      isReady: false,
    };
  }

  // 성공 상태 - 실제 컨텐츠는 호출 측에서 렌더링
  return {
    renderState: null,
    isReady: true,
  };
}

