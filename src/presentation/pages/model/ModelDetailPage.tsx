import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import { getModelMockDetail } from '@/data/sources/mocks/modelMockData';
import type { ModelDetail } from '@/domain/entities/Model';
import { isModelMockEnabled } from '@/shared/config/modelMockConfig';
import ModelDetailView from '@/presentation/pages/model/components/ModelDetailView';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/detail/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/detail/useDetailPageState';
import { useToast } from '@/presentation/contexts/ToastContext';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';

const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const useMock = isModelMockEnabled();
  const { showToast } = useToast();
  const modelRepository = useRepository(ModelRepository);

  const mockModel = useMemo(() => (id && useMock ? getModelMockDetail(id) : null), [id, useMock]);

  const {
    data: apiModel,
    loading: isLoading,
    error,
  } = useDetailFetcher<ModelDetail, ModelRepository>({
    repository: modelRepository,
    method: 'getModelById',
    id,
    errorMessage: '모델을 불러오는데 실패했습니다.',
    enabled: !useMock,
  });

  const model = useMock ? mockModel : apiModel;
  const loading = useMock ? false : isLoading;
  const resolvedError = useMock && !mockModel ? '모델을 찾을 수 없습니다.' : error;

  const { renderState, isReady } = useDetailPageState({
    data: model,
    loading,
    error: resolvedError,
    notFoundMessage: '모델을 찾을 수 없습니다.',
    listPath: '/models',
    LayoutComponent: DetailPageLayout,
  });

  if (renderState) {
    return <>{renderState}</>;
  }

  if (!isReady || !model) {
    return null;
  }

  return (
    <ModelDetailView
      model={model}
      onOffer={() => showToast('제안하기 기능은 준비 중입니다.', undefined, 'info')}
      onShare={() => showToast('공유 기능은 준비 중입니다.', undefined, 'info')}
    />
  );
};

export default ModelDetailPage;
