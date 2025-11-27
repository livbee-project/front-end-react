import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListFetcher } from '@/presentation/hooks/useListFetcher';
import { useListPageState } from '@/presentation/hooks/useListPageState';
import {
  PageContainer,
  HeaderSection,
  HeaderTitle,
  HeaderSubtitle,
  SearchBar,
  SearchInput,
  SearchIcon,
  FilterSection,
  FilterButton,
  ContentSection,
  ModelsGrid,
  FloatingActionButton,
} from './styled/ModelsPageStyles';
import { ModelCard } from './components/ModelCard';
import { useModelFilter } from './hooks/useModelFilter';

// 하드코딩된 모델 데이터 (백엔드 데이터가 없을 때 사용)
const mockModels: Model[] = [
  {
    id: '1',
    nickname: '한지우',
    oneLineIntro: '청순하고 자연스러운 이미지의 모델',
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    experienceYears: 3,
    detailedRegion: '서울',
    height: 168,
    gender: null,
    concept: '청순/내추럴',
    categories: ['패션', '뷰티'],
  },
  {
    id: '2',
    nickname: '강민서',
    oneLineIntro: '시크하고 모던한 스타일의 모델',
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    experienceYears: 4,
    detailedRegion: '서울',
    height: 172,
    gender: null,
    concept: '시크/모던',
    categories: ['패션'],
  },
  {
    id: '3',
    nickname: '최유정',
    oneLineIntro: '옷 잘입는 모델',
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    experienceYears: 2,
    detailedRegion: '부산',
    height: 170,
    gender: null,
    concept: '엘레강스',
    categories: ['패션', '뷰티'],
  },
  {
    id: '4',
    nickname: '이수아',
    oneLineIntro: '깔끔한 이미지의 모델',
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    experienceYears: 1,
    detailedRegion: '서울',
    height: 165,
    gender: null,
    concept: '청순/내추럴',
    categories: ['패션'],
  },
];

const filters = ['전체', '청순/내추럴', '시크/모던', '엘레강스'];

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
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
    LayoutComponent: PageContainer,
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
    filters,
  });

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
      <PageContainer>
        <p>{error}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeaderSection>
        <HeaderTitle>
          컨셉에 맞는 <span>모델 찾기</span>
        </HeaderTitle>
        <HeaderSubtitle>브랜드 이미지에 맞는 모델을 찾아보세요</HeaderSubtitle>
        
        <SearchBar>
          <SearchIcon>
            <Search size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="모델 이름 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>

        <FilterSection>
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              $active={selectedFilter === filter}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterSection>
      </HeaderSection>

      <ContentSection>
        <ModelsGrid>
          {filteredModels.map((model) => (
            <ModelCard
              key={model.id}
              id={model.id}
              nickname={model.nickname || ''}
              oneLineIntro={model.oneLineIntro || ''}
              mainThumbnailUrl={model.mainThumbnailUrl || ''}
              height={model.height || 0}
              concept={model.concept || null}
              categories={model.categories || []}
              onCardClick={handleModelClick}
              onCastingProposal={handleCastingProposal}
            />
          ))}
        </ModelsGrid>
      </ContentSection>

      <FloatingActionButton onClick={() => navigate('/models/register')}>
        +
      </FloatingActionButton>
    </PageContainer>
  );
};

export default ModelsPage;
