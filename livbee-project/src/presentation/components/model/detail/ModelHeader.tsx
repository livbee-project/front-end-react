import React from 'react';
import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';

interface ModelHeaderProps {
  brandName: string;
  title: string;
  tags: string[];
  imageUrl?: string;
  onBack: () => void;
}

export const ModelHeader: React.FC<ModelHeaderProps> = ({ brandName, title, tags, imageUrl, onBack }) => {
  return (
    <HeaderWrapper>
      <BackButton type="button" onClick={onBack}>
        <ChevronLeft size={18} />
        뒤로가기
      </BackButton>

      <HeaderImage>
        {imageUrl && <HeaderImageContent src={imageUrl} alt={title} loading="eager" decoding="async" />}
      </HeaderImage>

      <HeaderInfo>
        <BrandName>{brandName}</BrandName>
        <Title>{title}</Title>
        <TagGroup>
          {tags.map((tag, index) => (
            <TagBadge key={`${tag}-${index}`} $variant={index === 0 ? 'primary' : 'secondary'}>
              {tag}
            </TagBadge>
          ))}
        </TagGroup>
      </HeaderInfo>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const HeaderImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
`;

const HeaderImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeaderInfo = styled.div`
  background: #ffffff;
  padding: 20px 16px;
  border-radius: 20px 20px 0 0;
  margin-top: -20px;
  position: relative;
  z-index: 1;
`;

const BrandName = styled.div`
  font-size: 0.875rem;
  color: #9297af;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0 0 12px 0;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const TagBadge = styled.span<{ $variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $variant }) => ($variant === 'primary' ? '#5a64ff' : '#ffffff')};
  color: ${({ $variant }) => ($variant === 'primary' ? '#ffffff' : '#1f1f25')};
  border: ${({ $variant }) => ($variant === 'primary' ? 'none' : '1px solid #eceff7')};
`;

