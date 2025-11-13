import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionContainer from '@/presentation/components/section/SectionContainer';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import PortfolioRowCard from '@/presentation/components/cards/PortfolioRowCard';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { Portfolio } from '@/domain/entities/Portfolio';

/**
 * "이런 쇼호스트는 어떠세요?" 섹션 컴포넌트
 */
const HowShowhostSection: React.FC = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // portfolioRepository를 useRef로 관리하여 매 렌더링마다 재생성되지 않도록 함
  const portfolioRepositoryRef = useRef<PortfolioRepository | null>(null);
  if (!portfolioRepositoryRef.current) {
    portfolioRepositoryRef.current = new PortfolioRepository();
  }
  const portfolioRepository = portfolioRepositoryRef.current;

  /**
   * 포트폴리오 목록 조회
   */
  useEffect(() => {
    let isCancelled = false;

    const fetchPortfolios = async () => {
      try {
        if (!isCancelled) {
          setIsLoading(true);
        }
        const response = await portfolioRepository.getPortfolioList({
          page: 1,
          limit: 5, // 홈 페이지에서는 최대 5개만 표시
        });
        if (!isCancelled) {
          setPortfolios(response.items);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('쇼호스트 목록 조회 실패:', error);
          setPortfolios([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchPortfolios();

    // cleanup 함수: 컴포넌트가 언마운트되면 이전 요청을 취소
    return () => {
      isCancelled = true;
    };
  }, [portfolioRepository]);

  // 로딩 중이거나 데이터가 없을 때
  if (isLoading) {
    return (
      <SectionContainer
        title="이런 쇼호스트는 어떠세요?"
        onMorePressed={() => navigate('/portfolios')}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      title="이런 쇼호스트는 어떠세요?"
      onMorePressed={() => navigate('/portfolios')}
    >
      {portfolios.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: 'var(--dark-gray)', fontSize: 'var(--p2)' }}>
            데이터가 없습니다.
          </p>
        </div>
      ) : (
        <div style={{ padding: '0 10px' }}>
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
