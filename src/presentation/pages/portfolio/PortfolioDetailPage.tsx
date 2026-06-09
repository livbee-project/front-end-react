import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import {
  getPortfolioMockDetail,
  PORTFOLIO_MOCK_LIST_VIEWS,
} from '@/data/sources/mocks/portfolioMockData';
import type { PortfolioDetail } from '@/domain/entities/Portfolio';
import { isPortfolioMockEnabled } from '@/shared/config/portfolioMockConfig';
import PortfolioDetailView from '@/presentation/pages/portfolio/components/PortfolioDetailView';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/detail/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/detail/useDetailPageState';
import { useToast } from '@/presentation/contexts/ToastContext';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';

const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const useMock = isPortfolioMockEnabled();
  const { showToast } = useToast();
  const portfolioRepository = useRepository(PortfolioRepository);

  const mockPortfolio = useMemo(
    () => (id && useMock ? getPortfolioMockDetail(id) : null),
    [id, useMock],
  );

  const {
    data: apiPortfolio,
    loading: isLoading,
    error,
  } = useDetailFetcher<PortfolioDetail, PortfolioRepository>({
    repository: portfolioRepository,
    method: 'getPortfolioById',
    id,
    errorMessage: '포트폴리오를 불러오는데 실패했습니다.',
    enabled: !useMock,
  });

  const portfolio = useMock ? mockPortfolio : apiPortfolio;
  const loading = useMock ? false : isLoading;
  const resolvedError = useMock && !mockPortfolio ? '포트폴리오를 찾을 수 없습니다.' : error;

  const listItemCategory = useMemo(
    () => PORTFOLIO_MOCK_LIST_VIEWS.find((item) => item.id === id)?.category,
    [id],
  );

  const { renderState, isReady } = useDetailPageState({
    data: portfolio,
    loading,
    error: resolvedError,
    notFoundMessage: '포트폴리오를 찾을 수 없습니다.',
    listPath: '/portfolios',
    LayoutComponent: DetailPageLayout,
  });

  if (renderState) {
    return <>{renderState}</>;
  }

  if (!isReady || !portfolio) {
    return null;
  }

  return (
    <PortfolioDetailView
      portfolio={portfolio}
      listItemCategory={listItemCategory}
      onOffer={() => showToast('제안하기 기능은 준비 중입니다.', undefined, 'info')}
      onShare={() => showToast('공유 기능은 준비 중입니다.', undefined, 'info')}
    />
  );
};

export default PortfolioDetailPage;
