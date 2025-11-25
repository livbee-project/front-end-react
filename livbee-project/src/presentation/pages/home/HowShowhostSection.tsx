import React, { useMemo, useCallback } from 'react';
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
import { H3, PMuted } from '@/presentation/components/styled/Typography';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Card = styled.article`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.card};
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
  flex-shrink: 0;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled(H3)``;

const Intro = styled(PMuted)`
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const HowShowhostSection: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const portfolioRepository = useRepository(PortfolioRepository);

  // query 객체 메모이제이션
  const query = useMemo(() => ({ page: 1, limit: 5 }), []);
  
  // fetchFunction 메모이제이션
  const fetchPortfolios = useCallback(
    (query: { page: number; limit: number }, signal?: AbortSignal) => {
      return portfolioRepository.getPortfolioList(query, signal);
    },
    [portfolioRepository]
  );

  const { data: portfolios, loading } = useListData<
    Portfolio,
    { page: number; limit: number },
    { items: Portfolio[] }
  >(
    fetchPortfolios,
    query,
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
                <AvatarImage src={portfolio.mainThumbnailUrl} alt={portfolio.nickname || '쇼호스트'} />
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
});

HowShowhostSection.displayName = 'HowShowhostSection';

export default HowShowhostSection;
