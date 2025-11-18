import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection, { Highlight } from './components/HomeSection';
import Button from '@/presentation/components/ui/Button';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { Portfolio } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.card};
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Intro = styled.p`
  margin: 0.25rem 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const HowShowhostSection: React.FC = () => {
  const navigate = useNavigate();
  const portfolioRepository = useRepository(PortfolioRepository);
  const { data: portfolios, loading } = useListData<
    Portfolio,
    { page: number; limit: number },
    { items: Portfolio[] }
  >(
    (query, signal) => portfolioRepository.getPortfolioList(query, signal),
    { page: 1, limit: 5 },
    [],
    '쇼호스트 목록을 불러오는 중 오류가 발생했습니다.'
  );

  if (loading) {
    return (
      <HomeSection title={<><span>이런 </span><Highlight>쇼호스트</Highlight><span>는<br />어떠세요?</span></>}>
        <LoadingState />
      </HomeSection>
    );
  }

  if (portfolios.length === 0) {
    return (
      <HomeSection title={<><span>이런 </span><Highlight>쇼호스트</Highlight><span>는<br />어떠세요?</span></>}>
        <EmptyState message="데이터가 없습니다." />
      </HomeSection>
    );
  }

  return (
    <HomeSection
      title={<><span>이런 </span><Highlight>쇼호스트</Highlight><span>는<br />어떠세요?</span></>}
      onMore={() => navigate('/portfolios')}
    >
      <List>
        {portfolios.map((portfolio) => (
          <Card key={portfolio.id} onClick={() => navigate(`/portfolios/${portfolio.id}`)}>
            <Avatar>
              {portfolio.mainThumbnailUrl && (
                <img
                  src={portfolio.mainThumbnailUrl}
                  alt={portfolio.nickname || '쇼호스트'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </Avatar>
            <Info>
              <Name>{portfolio.nickname || '이름 없음'}</Name>
              <Intro>{portfolio.oneLineIntro || '소개 없음'}</Intro>
            </Info>
            <Button
              variant="outline"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/portfolios/${portfolio.id}`);
              }}
            >
              제안하기
            </Button>
          </Card>
        ))}
      </List>
    </HomeSection>
  );
};

export default HowShowhostSection;
