import React from 'react';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';

interface DetailPageWrapperProps {
  loading: boolean;
  error: string | null;
  data: any;
  onBackToList: () => void;
  backToListLabel?: string;
  notFoundMessage?: string;
  children: React.ReactNode;
}

/**
 * 상세 페이지의 공통 로딩/에러 처리를 담당하는 래퍼 컴포넌트
 */
export const DetailPageWrapper: React.FC<DetailPageWrapperProps> = ({
  loading,
  error,
  data,
  onBackToList,
  backToListLabel = '목록으로 돌아가기',
  notFoundMessage = '데이터를 찾을 수 없습니다.',
  children,
}) => {
  // 로딩 중
  if (loading) {
    return (
      <DetailPageLayout>
        <LoadingState padding="16px" />
      </DetailPageLayout>
    );
  }

  // 에러 발생 또는 데이터 없음
  if (error || !data) {
    return (
      <DetailPageLayout>
        <ErrorState
          message={error || notFoundMessage}
          padding="16px"
          onRetry={onBackToList}
          retryLabel={backToListLabel}
        />
      </DetailPageLayout>
    );
  }

  return <>{children}</>;
};

