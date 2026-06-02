import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeSection, { Highlight } from '@/presentation/pages/home/components/HomeSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListData } from '@/presentation/hooks/list/useListData';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';
import { buildModelSupplementary } from '@/presentation/components/cards/content/modelCardHelpers';

const ConceptModelSection: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const modelRepository = useRepository(ModelRepository);

  const query = useMemo(() => ({ page: 1, limit: 10 }), []);

  const fetchModels = useCallback(
    (query: { page: number; limit: number }, signal?: AbortSignal) => {
      return modelRepository.getModelList(query, signal);
    },
    [modelRepository],
  );

  const cacheKey = useMemo(() => `concept-models-${JSON.stringify(query)}`, [query]);

  const { data: models, loading } = useListData<
    Model,
    { page: number; limit: number },
    { items: Model[] }
  >(fetchModels, query, [], '모델 목록을 불러오는 중 오류가 발생했습니다.', { cacheKey });

  const sectionTitle = (
    <>
      <span>이런 </span>
      <Highlight>모델</Highlight>
      <span>은 어떠세요?</span>
    </>
  );

  if (loading) {
    return (
      <HomeSection title={sectionTitle}>
        <LoadingState />
      </HomeSection>
    );
  }

  if (models.length === 0) {
    return (
      <HomeSection title={sectionTitle}>
        <EmptyState message="데이터가 없습니다." />
      </HomeSection>
    );
  }

  return (
    <HomeSection title={sectionTitle} onMore={() => navigate('/models')}>
      <ContentCardGrid>
        {models.map((model) => (
          <ContentCard
            key={model.id}
            variant="showhost"
            imageUrl={model.mainThumbnailUrl || undefined}
            imageAlt={model.nickname || '모델'}
            heading={model.nickname || '이름 없음'}
            supplementary={buildModelSupplementary(model)}
            onClick={() => navigate(`/models/${model.id}`)}
          />
        ))}
      </ContentCardGrid>
    </HomeSection>
  );
});

ConceptModelSection.displayName = 'ConceptModelSection';

export default ConceptModelSection;
