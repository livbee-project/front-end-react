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

const Card = styled.article`
  flex: 0 0 65vw;
  min-width: 200px;
  max-width: 220px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 200px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 0 0 220px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Portrait = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardBody = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
`;

const Intro = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
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
          <Card key={model.id} onClick={() => navigate(`/models/${model.id}`)}>
            <ImageWrapper>
              {model.mainThumbnailUrl && (
                <Portrait src={model.mainThumbnailUrl} alt={model.nickname || '모델'} />
              )}
            </ImageWrapper>
            <CardBody>
              <Name>{model.nickname || '이름 없음'}</Name>
              <Intro>{model.oneLineIntro || '소개 없음'}</Intro>
            </CardBody>
          </Card>
        ))}
      </HorizontalScroll>
    </HomeSection>
  );
};

export default ConceptModelSection;