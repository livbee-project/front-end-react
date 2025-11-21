import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Heart } from 'lucide-react';
import Button from '@/presentation/components/ui/Button';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f5fb;
  padding-bottom: 80px;
`;

const HeaderSection = styled.div`
  padding: 20px 16px;
  background: #ffffff;
`;

const HeaderTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0 0 8px 0;
  
  span {
    color: #5a64ff;
  }
`;

const HeaderSubtitle = styled.p`
  font-size: 0.875rem;
  color: #9297af;
  margin: 0 0 20px 0;
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #eceff7;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #ffffff;
  color: #1f1f25;
  
  &::placeholder {
    color: #a0a4b7;
  }
  
  &:focus {
    outline: none;
    border-color: #5a64ff;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9297af;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${({ $active }) => ($active ? '#5a64ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#1f1f25')};
  border: ${({ $active }) => ($active ? 'none' : '1px solid #eceff7')};
  
  &:hover {
    background: ${({ $active }) => ($active ? '#4a54e8' : '#f4f5fb')};
  }
`;

const ContentSection = styled.div`
  padding: 20px 16px;
`;

const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ModelCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ModelImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f4f5fb;
`;

const ModelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeartButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ff4757;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
  }
`;

const ModelCardBody = styled.div`
  padding: 12px;
`;

const ConceptTag = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  background: #f4f5ff;
  color: #5a64ff;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ModelName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #1f1f25;
  margin-bottom: 4px;
`;

const ModelHeight = styled.div`
  font-size: 0.875rem;
  color: #9297af;
  margin-bottom: 8px;
`;

const CategoryTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const CategoryTag = styled.span`
  padding: 4px 8px;
  border-radius: 8px;
  background: #f4f5fb;
  color: #434659;
  font-size: 0.75rem;
  font-weight: 500;
`;

const CastingButton = styled(Button)`
  width: 100%;
  padding: 10px;
  font-size: 0.875rem;
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #5a64ff;
  border: none;
  color: #ffffff;
  font-size: 24px;
  font-weight: 300;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(90, 100, 255, 0.4);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(90, 100, 255, 0.5);
  }
`;

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const modelRepository = useRepository(ModelRepository);

  const { data: models, loading, error } = useListData<Model, { page: number; limit: number }, { items: Model[]; currentPage?: number; totalPages?: number }>(
    (query, signal) => modelRepository.getModelList(query, signal),
    { page: 1, limit: 20 },
    [],
    '모델 목록을 불러오는 중 오류가 발생했습니다.'
  );

  // 하드코딩된 모델 데이터
  const mockModels: Array<{
    id: string;
    nickname: string;
    oneLineIntro: string;
    mainThumbnailUrl: string;
    height: number;
    concept: string;
    categories: string[];
  }> = [
    {
      id: '1',
      nickname: '한지우',
      oneLineIntro: '청순하고 자연스러운 이미지의 모델',
      mainThumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      height: 168,
      concept: '청순/내추럴',
      categories: ['패션', '뷰티'],
    },
    {
      id: '2',
      nickname: '강민서',
      oneLineIntro: '시크하고 모던한 스타일의 모델',
      mainThumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      height: 172,
      concept: '시크/모던',
      categories: ['패션'],
    },
    {
      id: '3',
      nickname: '최유정',
      oneLineIntro: '옷 잘입는 모델',
      mainThumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      height: 170,
      concept: '엘레강스',
      categories: ['패션', '뷰티'],
    },
    {
      id: '4',
      nickname: '이수아',
      oneLineIntro: '깔끔한 이미지의 모델',
      mainThumbnailUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      height: 165,
      concept: '청순/내추럴',
      categories: ['패션'],
    },
  ];

  const filters = ['전체', '청순/내추럴', '시크/모던', '엘레강스'];

  // 실제 데이터가 있으면 사용, 없으면 하드코딩 데이터 사용
  const modelsList = (models && Array.isArray(models) && models.length > 0) ? models : mockModels;
  
  const displayModels = modelsList.map((model) => {
    // 실제 모델 데이터를 하드코딩 형식에 맞게 변환
    if ('height' in model && typeof model.height === 'number' && 'concept' in model && 'categories' in model) {
      return {
        ...model,
        categories: Array.isArray(model.categories) ? model.categories : [],
      };
    }
    // Model 타입인 경우 mock 데이터 형식으로 변환
    const mockModel = mockModels.find((m) => m.id === model.id) || mockModels[0];
    return {
      id: model.id,
      nickname: model.nickname || mockModel.nickname,
      oneLineIntro: model.oneLineIntro || mockModel.oneLineIntro,
      mainThumbnailUrl: model.mainThumbnailUrl || mockModel.mainThumbnailUrl,
      height: (model as any).height || mockModel.height,
      concept: mockModel.concept,
      categories: Array.isArray(mockModel.categories) ? mockModel.categories : [],
    };
  });

  // 필터링
  const filteredModels = (displayModels || []).filter((model) => {
    if (selectedFilter !== '전체' && model.concept !== selectedFilter) {
      return false;
    }
    if (searchQuery && model.nickname && model.oneLineIntro) {
      const query = searchQuery.toLowerCase();
      if (!model.nickname.toLowerCase().includes(query) && 
          !model.oneLineIntro.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

  const handleModelClick = (modelId: string) => {
    navigate(`/models/${modelId}`);
  };

  const handleCastingProposal = (e: React.MouseEvent, modelId: string) => {
    e.stopPropagation();
    // TODO: 캐스팅 제안 기능 구현
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingState padding="16px" />
      </PageContainer>
    );
  }

  if (error && (!models || models.length === 0)) {
    return (
      <PageContainer>
        <ErrorState message={error} />
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
          {(filteredModels || []).map((model) => (
            <ModelCard key={model.id} onClick={() => handleModelClick(model.id)}>
              <ModelImageContainer>
                <ModelImage src={model.mainThumbnailUrl || ''} alt={model.nickname || '모델'} />
                <HeartButton onClick={(e) => e.stopPropagation()}>
                  <Heart size={18} fill="currentColor" />
                </HeartButton>
              </ModelImageContainer>
              <ModelCardBody>
                <ConceptTag>{model.concept || '전체'}</ConceptTag>
                <ModelName>{model.nickname || '이름 없음'}</ModelName>
                <ModelHeight>{model.height || 0}cm</ModelHeight>
                <CategoryTags>
                  {(model.categories || []).map((category, index) => (
                    <CategoryTag key={index}>{category}</CategoryTag>
                  ))}
                </CategoryTags>
                <CastingButton
                  variant="primary"
                  onClick={(e) => handleCastingProposal(e, model.id)}
                >
                  캐스팅 제안
                </CastingButton>
              </ModelCardBody>
            </ModelCard>
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
