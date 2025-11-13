import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioRowCard from '@/presentation/components/cards/PortfolioRowCard';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { Portfolio } from '@/domain/entities/Portfolio';

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [_totalPages, setTotalPages] = useState<number>(1);

  // portfolioRepository를 useRef로 관리하여 매 렌더링마다 재생성되지 않도록 함
  const portfolioRepositoryRef = useRef<PortfolioRepository | null>(null);
  if (!portfolioRepositoryRef.current) {
    portfolioRepositoryRef.current = new PortfolioRepository();
  }
  const portfolioRepository = portfolioRepositoryRef.current;

  /**
   * 초기 로드 및 페이지 변경 시 데이터 조회
   */
  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const loadData = async () => {
      try {
        if (!isCancelled) {
          setLoading(true);
          setError(null);
        }

        const response = await portfolioRepository.getPortfolioList(
          {
            page: currentPage,
            limit: 20, // 페이지당 20개 항목
          },
          abortController.signal
        );

        if (!isCancelled && !abortController.signal.aborted) {
          setPortfolios(response.items);
          setCurrentPage(response.currentPage || currentPage);
          setTotalPages(response.totalPages || 1);
        }
      } catch (err) {
        // AbortError는 무시 (요청이 취소된 경우)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!isCancelled && !abortController.signal.aborted) {
          console.error('포트폴리오 목록 조회 실패:', err);
          setError('포트폴리오 목록을 불러오는 중 오류가 발생했습니다.');
          setPortfolios([]);
        }
      } finally {
        if (!isCancelled && !abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // cleanup 함수: 컴포넌트가 언마운트되거나 currentPage가 변경되면 이전 요청을 취소
    return () => {
      isCancelled = true;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // portfolioRepository는 ref로 관리되므로 의존성 배열에서 제외

  // 로딩 중
  if (loading) {
    return (
      <ListPageLayout
        searchPlaceholder="검색"
        floatingActionButtonPath="/portfolios/register"
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
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
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: 'var(--error)' }}>{error}</p>
        </div>
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

