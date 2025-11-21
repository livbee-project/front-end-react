import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection, { Highlight, HorizontalScroll } from './components/HomeSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';
import { HomeCard } from '@/presentation/components/cards/HomeCard';
import { HomeCardImage } from '@/presentation/components/cards/HomeCardImage';
import { HomeCardBody, HomeCardTitle, HomeCardDescription } from '@/presentation/components/cards/HomeCardBody';

const StyledCard = styled(HomeCard)`
  flex: 0 0 65vw;
  min-width: 200px;
  max-width: 220px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 200px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 0 0 220px;
  }
`;

const ConceptModelSection: React.FC = () => {
  const navigate = useNavigate();
  const modelRepository = useRepository(ModelRepository);
  const { data: models, loading } = useListData<
    Model,
    { page: number; limit: number },
    { items: Model[] }
  >(
    (query, signal) => modelRepository.getModelList(query, signal),
    { page: 1, limit: 10 },
    [],
    '모델 목록을 불러오는 중 오류가 발생했습니다.'
  );

  if (loading) {
    return (
      <HomeSection title={<><span>이런 </span><Highlight>모델</Highlight><span>은 어떠세요?</span></>}>
        <LoadingState />
      </HomeSection>
    );
  }

  if (models.length === 0) {
    return (
      <HomeSection title={<><span>이런 </span><Highlight>모델</Highlight><span>은 어떠세요?</span></>}>
        <EmptyState message="데이터가 없습니다." />
      </HomeSection>
    );
  }

  return (
    <HomeSection
      title={<><span>이런 </span><Highlight>모델</Highlight><span>은 어떠세요?</span></>}
      onMore={() => navigate('/models')}
    >
      <HorizontalScroll>
        {models.map((model) => (
          <StyledCard key={model.id} onClick={() => navigate(`/models/${model.id}`)}>
            <HomeCardImage src={model.mainThumbnailUrl || undefined} alt={model.nickname || '모델'} aspectRatio="3 / 4" />
            <HomeCardBody>
              <HomeCardTitle>{model.nickname || '이름 없음'}</HomeCardTitle>
              <HomeCardDescription>{model.oneLineIntro || '소개 없음'}</HomeCardDescription>
            </HomeCardBody>
          </StyledCard>
        ))}
      </HorizontalScroll>
    </HomeSection>
  );
};

export default ConceptModelSection;