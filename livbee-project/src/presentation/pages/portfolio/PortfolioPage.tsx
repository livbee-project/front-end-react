import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioRowCard from '@/presentation/components/cards/PortfolioRowCard';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { Portfolio } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);

  // portfolioRepository를 useRepository 훅으로 관리
  const portfolioRepository = useRepository(PortfolioRepository);

  // 목록 데이터 조회
  const { data: portfolios, loading, error } = useListData<Portfolio, { page: number; limit: number }, { items: Portfolio[]; currentPage?: number; totalPages?: number }>(
    (query, signal) => portfolioRepository.getPortfolioList(query, signal),
    { page: currentPage, limit: 20 },
    [currentPage],
    '포트폴리오 목록을 불러오는 중 오류가 발생했습니다.'
  );

  // 로딩 중
  if (loading) {
    return (
      <ListPageLayout
        searchPlaceholder="검색"
        floatingActionButtonPath="/portfolios/register"
      >
        <LoadingState />
      </ListPageLayout>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <ListPageLayout
        searchPlaceholder="검색"
        floatingActionButtonPath="/portfolios/register"
      >
        <ErrorState message={error} />
      </ListPageLayout>
    );
  }

  return (
    <ListPageLayout
      searchPlaceholder="검색"
      floatingActionButtonPath="/portfolios/register"
    >
      {/* 포트폴리오 리스트 */}
      <VerticalList showDividers={true}>
        {portfolios.map((portfolio) => (
          <ListItem
            key={portfolio.id}
            onTap={() => navigate(`/portfolios/${portfolio.id}`)}
          >
            <PortfolioRowCard
              title={portfolio.nickname || '이름 없음'}
              content={portfolio.oneLineIntro || '소개 없음'}
              imageUrl={portfolio.mainThumbnailUrl || undefined}
              onOfferPress={() => console.log(`제안하기 ${portfolio.id}`)}
              onCardPress={() => navigate(`/portfolios/${portfolio.id}`)}
            />
          </ListItem>
        ))}
      </VerticalList>
    </ListPageLayout>
  );
};

export default PortfolioPage;

