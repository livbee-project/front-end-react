import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronLeft, Video, Plus } from 'lucide-react';
import Button from '@/presentation/components/ui/Button';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 80px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #1f1f25;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
`;

const HeaderSection = styled.div`
  padding: 20px 16px;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0 0 8px 0;
`;

const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #9297af;
  margin: 0 0 20px 0;
`;

const ContentSection = styled.div`
  padding: 0 16px;
`;

const ClipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ClipCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  background: #f4f5fb;
`;

const ClipImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoIcon = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const CardBody = styled.div`
  padding: 12px;
`;

const ClipTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f1f25;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ClipDescription = styled.div`
  font-size: 0.75rem;
  color: #9297af;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled(Button)`
  flex: 1;
  padding: 8px;
  font-size: 0.875rem;
  border: 1px solid #5a64ff;
  background: #ffffff;
  color: #5a64ff;
  
  &:hover {
    background: #f4f5ff;
  }
`;

const DeleteButton = styled(Button)`
  flex: 1;
  padding: 8px;
  font-size: 0.875rem;
  background: #5a64ff;
  color: #ffffff;
  
  &:hover {
    background: #4a54e8;
  }
`;

const AddCard = styled.div`
  background: #f4f5fb;
  border-radius: 12px;
  border: 2px dashed #d1d5db;
  aspect-ratio: 9 / 16;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #eceff7;
    border-color: #5a64ff;
  }
`;

const AddIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #5a64ff;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 300;
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

interface Clip {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const MyClipsPage: React.FC = () => {
  const navigate = useNavigate();

  // 하드코딩된 숏클립 데이터
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

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = (clipId: string) => {
    // TODO: 편집 기능 구현
    console.log('편집:', clipId);
  };

  const handleDelete = (clipId: string) => {
    // TODO: 삭제 기능 구현
    if (window.confirm('이 숏클립을 삭제하시겠습니까?')) {
      console.log('삭제:', clipId);
    }
  };

  const handleAdd = () => {
    // TODO: 숏클립 추가 기능 구현
    console.log('숏클립 추가');
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
            <ClipCard key={clip.id}>
              <ImageContainer>
                <ClipImage src={clip.imageUrl} alt={clip.title} />
                <VideoIcon>
                  <Video size={14} />
                </VideoIcon>
              </ImageContainer>
              <CardBody>
                <ClipTitle>
                  <Video size={14} />
                  {clip.title}
                </ClipTitle>
                <ClipDescription>{clip.description}</ClipDescription>
                <ButtonRow>
                  <EditButton variant="outline" onClick={() => handleEdit(clip.id)}>
                    편집
                  </EditButton>
                  <DeleteButton variant="primary" onClick={() => handleDelete(clip.id)}>
                    삭제
                  </DeleteButton>
                </ButtonRow>
              </CardBody>
            </ClipCard>
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
