import React, { useMemo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useListFetcher } from '@/presentation/hooks/list/useListFetcher';
import { useListPageState } from '@/presentation/hooks/list/useListPageState';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { setAuthRedirectPath, setOriginPage } from '@/shared/utils/authRedirect';
import LoginRequiredModal from '@/presentation/components/navigation/LoginRequiredModal';
import { ModelSearchSection } from '@/presentation/components/model/ModelSearchSection';
import { ModelFilterRow } from '@/presentation/components/model/ModelFilterRow';
import { ModelCard } from '@/presentation/pages/model/components/ModelCard';
import { useModelFilter } from '@/presentation/pages/model/hooks/useModelFilter';
import { mockModels, modelFilters } from '@/presentation/pages/model/mock/mockModels';

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const modelRepository = useRepository(ModelRepository);

  // query 객체 메모이제이션
  const query = useMemo(() => ({ page: 1, limit: 20 }), []);

  const { data: models, loading, error } = useListFetcher<
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
    cacheKey: `models-list-${JSON.stringify(query)}`,
  });

  const { renderState, isReady } = useListPageState<Model>({
    data: models || [],
    loading,
    error,
    LayoutComponent: PageWrapper,
    showEmptyState: false,
  });

  const modelsList = useMemo<Model[]>(() => {
    if (models && Array.isArray(models) && models.length > 0) {
      return models;
    }
    return mockModels;
  }, [models]);

  const displayModels = useMemo<Model[]>(() => {
    return modelsList.map((model) => ({
      id: model.id,
      nickname: model.nickname ?? null,
      oneLineIntro: model.oneLineIntro ?? null,
      mainThumbnailUrl: model.mainThumbnailUrl ?? null,
      experienceYears: model.experienceYears ?? null,
      detailedRegion: model.detailedRegion ?? null,
      height: model.height ?? null,
      gender: model.gender ?? null,
      concept: model.concept ?? null,
      categories: Array.isArray(model.categories)
        ? model.categories
        : model.categories
          ? [model.categories as string]
          : [],
    }));
  }, [modelsList]);

  const { selectedFilter, setSelectedFilter, searchQuery, setSearchQuery, filteredModels } = useModelFilter<Model>({
    models: displayModels,
    filters: modelFilters,
  });

  const handleFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 검색은 실시간으로 처리되므로 여기서는 preventDefault만 수행
  }, []);

  const handleModelClick = useCallback((modelId: string) => {
    navigate(`/models/${modelId}`);
  }, [navigate]);

  const handleCastingProposal = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: 캐스팅 제안 기능 구현
  }, []);

  if (renderState) {
    return <>{renderState}</>;
  }

  if (!isReady) {
    return null;
  }

  if (error && (!models || models.length === 0)) {
    return (
      <PageWrapper>
        <p>{error}</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageInner>
        <ModelSearchSection
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={handleFormSubmit}
          placeholder="이름, 카테고리로 검색"
        />

        <ModelFilterRow
          filters={modelFilters}
          activeFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        <ModelsGrid>
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              id={model.id}
              nickname={model.nickname || ''}
              mainThumbnailUrl={model.mainThumbnailUrl || ''}
              height={model.height || 0}
              concept={model.concept || null}
              categories={model.categories || []}
              onCardClick={handleModelClick}
              onCastingProposal={handleCastingProposal}
            />
          ))}
        </ModelsGrid>
      </PageInner>

      <RegisterFab
        type="button"
        onClick={() => {
          // 비회원인 경우 로그인 모달 표시
          if (!isLoggedIn) {
            setIsLoginModalOpen(true);
            return;
          }
          // 쇼호스트 권한이 아닌 경우 권한 오류 토스트
          if (user?.role !== 'showhost') {
            showToast('쇼호스트 권한 사용자만 이용 가능한 기능입니다.', undefined, 'error');
            return;
          }
          navigate('/models/register');
        }}
        aria-label="모델 등록"
      >
        <Plus size={24} strokeWidth={2.5} />
      </RegisterFab>

      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onConfirm={() => {
          // 현재 페이지 경로 저장 (권한 불일치 시 돌아갈 페이지)
          setOriginPage('/models');
          // 등록 페이지 경로 저장 (로그인 성공 시 이동할 페이지)
          setAuthRedirectPath('/models/register');
          setIsLoginModalOpen(false);
          navigate('/login?userType=showhost', { replace: true });
        }}
      />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem 1rem 6rem;
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2.5rem 1.5rem 6rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 3rem 2rem 6rem;
  }
`;

const PageInner = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const RegisterFab = styled.button`
  position: fixed;
  right: ${({ theme }) => theme.spacing.xl};
  bottom: 6rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 24px ${({ theme }) => theme.primaryOpacity['35']};
  cursor: pointer;
  z-index: 50;
  transition: transform 0.2s, background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export default ModelsPage;
