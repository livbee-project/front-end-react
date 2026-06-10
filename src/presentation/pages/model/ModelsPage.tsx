import React, { useMemo, useState } from 'react';
import {
  filterModelMockList,
  MODEL_FILTER_OPTIONS,
} from '@/data/sources/mocks/modelMockData';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import { isModelMockEnabled } from '@/shared/config/modelMockConfig';
import LoginRequiredModal from '@/presentation/components/navigation/LoginRequiredModal';
import ModelListCard from '@/presentation/pages/model/components/ModelListCard';
import type { ModelFilterKey } from '@/presentation/pages/model/types/modelView';
import {
  ModelCardGrid,
  ModelFilterBar,
  ModelFilterButton,
  ModelListMain,
  ModelListPageRoot,
  ModelListSection,
  ModelRegisterFab,
  ModelSectionHeader,
} from '@/presentation/pages/model/styles/modelList.styles';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListFetcher } from '@/presentation/hooks/list/useListFetcher';
import { useRegisterFabAction } from '@/presentation/hooks/common/useRegisterFabAction';
import { useRegisterFabVisibility } from '@/presentation/hooks/common/useRegisterFabVisibility';
import { EmptyState } from '@/presentation/components/states/EmptyState';

const ModelsPage: React.FC = () => {
  const useMock = isModelMockEnabled();
  const { shouldHideRegisterFab } = useRegisterFabVisibility('showhost');
  const {
    handleRegisterClick,
    isLoginModalOpen,
    closeLoginModal,
    confirmLoginRedirect,
  } = useRegisterFabAction({
    registerPath: '/models/register',
    originPage: '/models',
    redirectPath: '/models/register',
    targetRole: 'showhost',
    roleErrorMessage: '쇼호스트 권한 사용자만 이용 가능한 기능입니다.',
    loginPath: '/login?userType=showhost',
  });
  const [activeFilter, setActiveFilter] = useState<ModelFilterKey>('전체');

  const modelRepository = useRepository(ModelRepository);
  const query = useMemo(() => ({ page: 1, limit: 20 }), []);

  const {
    data: apiModels,
    loading,
    error,
  } = useListFetcher<
    Model,
    { page: number; limit: number },
    ModelRepository,
    { items: Model[]; currentPage?: number; totalPages?: number }
  >({
    repository: modelRepository,
    method: 'getModelList',
    query,
    dependencies: [],
    errorMessage: '모델 목록을 불러오는 중 오류가 발생했습니다.',
    cacheKey: 'model-list-page',
    enabled: !useMock,
  });

  const mockListItems = useMemo(() => filterModelMockList(activeFilter), [activeFilter]);

  const apiListItems = useMemo(() => {
    if (useMock) return [];

    return (apiModels ?? []).map((model) => ({
      id: model.id,
      name: model.nickname ?? '이름 없음',
      summary: model.oneLineIntro ?? '',
      profileImage: model.mainThumbnailUrl ?? '',
      modelType: model.concept ?? '모델',
      filterKey: '전체' as ModelFilterKey,
      height: model.height ?? undefined,
      location: model.detailedRegion ?? undefined,
    }));
  }, [apiModels, useMock]);

  const listItems = useMock ? mockListItems : apiListItems;
  const showLoading = !useMock && loading;
  const showError = !useMock && error && listItems.length === 0;

  return (
    <ModelListPageRoot>
      <ModelListMain>
        <ModelFilterBar aria-label="모델 필터">
          {MODEL_FILTER_OPTIONS.map((filter) => (
            <ModelFilterButton
              key={filter}
              type="button"
              $active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </ModelFilterButton>
          ))}
        </ModelFilterBar>

        <ModelListSection>
          <ModelSectionHeader>
            <div>
              <h2>
                추천 <em>모델</em>
              </h2>
              <p>브랜드 촬영 무드에 맞는 모델을 확인하고 제안할 수 있습니다.</p>
            </div>
            <span>{listItems.length}명</span>
          </ModelSectionHeader>

          {showLoading ? <p>불러오는 중...</p> : null}
          {showError ? <p>{error}</p> : null}

          {!showLoading && listItems.length === 0 ? (
            <EmptyState message="등록된 모델이 없습니다." />
          ) : (
            <ModelCardGrid>
              {listItems.map((item) => (
                <ModelListCard key={item.id} item={item} />
              ))}
            </ModelCardGrid>
          )}
        </ModelListSection>
      </ModelListMain>

      {!shouldHideRegisterFab ? (
        <ModelRegisterFab type="button" onClick={handleRegisterClick} aria-label="모델 프로필 등록">
          +
        </ModelRegisterFab>
      ) : null}

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onConfirm={confirmLoginRedirect}
      />
    </ModelListPageRoot>
  );
};

export default ModelsPage;
