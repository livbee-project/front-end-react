import React from 'react';
import { Heart } from 'lucide-react';
import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';

const ModelCardContainer = styled.div`
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

interface ModelCardProps {
  id: string;
  nickname: string;
  mainThumbnailUrl: string;
  height: number;
  concept: string | null;
  categories: string[];
  onCardClick: (modelId: string) => void;
  onCastingProposal: (e: React.MouseEvent) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  id,
  nickname,
  mainThumbnailUrl,
  height,
  concept,
  categories,
  onCardClick,
  onCastingProposal,
}) => {
  return (
    <ModelCardContainer onClick={() => onCardClick(id)}>
      <ModelImageContainer>
        <ModelImage src={mainThumbnailUrl || ''} alt={nickname || '모델'} loading="lazy" decoding="async" />
        <HeartButton onClick={(e) => e.stopPropagation()}>
          <Heart size={18} fill="currentColor" />
        </HeartButton>
      </ModelImageContainer>
      <ModelCardBody>
        <ConceptTag>{concept || '전체'}</ConceptTag>
        <ModelName>{nickname || '이름 없음'}</ModelName>
        <ModelHeight>{height || 0}cm</ModelHeight>
        <CategoryTags>
          {categories.map((category: string, index: number) => (
            <CategoryTag key={index}>{category}</CategoryTag>
          ))}
        </CategoryTags>
        <CastingButton
          variant="primary"
          onClick={onCastingProposal}
        >
          캐스팅 제안
        </CastingButton>
      </ModelCardBody>
    </ModelCardContainer>
  );
};

