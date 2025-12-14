import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus } from 'lucide-react';
import { debug } from '@/shared/utils/logger';
import type { Clip } from '@/domain/entities/Clip';
import ClipCard from '@/presentation/pages/clip/components/ClipCard';
import {
  AddCard,
  AddIcon,
  BackButton,
  ClipsGrid,
  ContentSection,
  FloatingActionButton,
  HeaderSection,
  PageContainer,
  PageSubtitle,
  PageTitle,
} from '@/presentation/pages/clip/styled/MyClipsPageStyles';

const mockClips: Clip[] = [
    {
      id: '1',
      title: '봄 패션 라...',
      description: '신상 의류 소...',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      title: '뷰티 제품 ...',
      description: '스킨케어 제...',
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      title: '홈리빙 제품...',
      description: '인테리어 소...',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '4',
      title: '건강 간식',
      description: '다이어트에 ...',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    },
];

const MyClipsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = (clipId: string) => {
    // TODO: 편집 기능 구현
    debug('MyClipsPage', '편집 클릭:', clipId);
  };

  const handleDelete = (clipId: string) => {
    // TODO: 삭제 기능 구현
    if (window.confirm('이 숏클립을 삭제하시겠습니까?')) {
      debug('MyClipsPage', '삭제 클릭:', clipId);
    }
  };

  const handleAdd = () => {
    // TODO: 숏클립 추가 기능 구현
    debug('MyClipsPage', '숏클립 추가 클릭');
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBack}>
        <ChevronLeft size={18} />
        뒤로가기
      </BackButton>

      <HeaderSection>
        <PageTitle>숏클립 관리</PageTitle>
        <PageSubtitle>내 콘텐츠를 업로드하고 관리하세요</PageSubtitle>
      </HeaderSection>

      <ContentSection>
        <ClipsGrid>
          {mockClips.map((clip) => (
            <ClipCard key={clip.id} clip={clip} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
          <AddCard onClick={handleAdd}>
            <AddIcon>
              <Plus size={24} />
            </AddIcon>
          </AddCard>
        </ClipsGrid>
      </ContentSection>

      <FloatingActionButton onClick={handleAdd}>
        +
      </FloatingActionButton>
    </PageContainer>
  );
};

export default MyClipsPage;
