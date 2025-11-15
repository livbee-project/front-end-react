import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionContainer from '@/presentation/components/section/SectionContainer';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import PortfolioRowCard from '@/presentation/components/cards/PortfolioRowCard';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { SPACING } from '@/presentation/styles/constants';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { Portfolio } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';

/**
 * "이런 쇼호스트는 어떠세요?" 섹션 컴포넌트
 */
const HowShowhostSection: React.FC = () => {
  const navigate = useNavigate();

  // portfolioRepository를 useRepository 훅으로 관리
  const portfolioRepository = useRepository(PortfolioRepository);

  // 목록 데이터 조회
  const { data: portfolios, loading: isLoading } = useListData<Portfolio, { page: number; limit: number }, { items: Portfolio[] }>(
    (query, signal) => portfolioRepository.getPortfolioList(query, signal),
    {
      page: 1,
      limit: 5, // 홈 페이지에서는 최대 5개만 표시
    },
    [],
    '쇼호스트 목록을 불러오는 중 오류가 발생했습니다.'
  );

  // 로딩 중이거나 데이터가 없을 때
  if (isLoading) {
    return (
      <SectionContainer
        title="이런 쇼호스트는 어떠세요?"
        onMorePressed={() => navigate('/portfolios')}
      >
        <LoadingState />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      title="이런 쇼호스트는 어떠세요?"
      onMorePressed={() => navigate('/portfolios')}
    >
      {portfolios.length === 0 ? (
        <EmptyState message="데이터가 없습니다." />
      ) : (
        <div style={{ padding: `0 ${SPACING.SM}` }}>
          <VerticalList>
            {portfolios.map((portfolio) => (
              <ListItem key={portfolio.id}>
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
        </div>
      )}
    </SectionContainer>
  );
};

export default HowShowhostSection;
