import React, { useRef } from 'react';
import styled from 'styled-components';
import { Plus, X } from 'lucide-react';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
  HiddenInput,
  SmallText,
} from '../PortfolioRegisterStyles';
import { Small } from '@/presentation/components/styled/Typography';

interface GallerySectionProps {
  images: string[];
  onSelectImage: (file: File) => void;
  onRemoveImage: (index: number) => void;
}

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const GalleryItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;

  ${GalleryItem}:hover & {
    transform: scale(1.05);
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const DeleteButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.error};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, background 0.2s, color 0.2s;

  &:hover {
    transform: scale(1.05);
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.errorForeground};
  }
`;

const AddImageButton = styled.button`
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.primaryOpacity['10']};
  }

  ${Small} {
    font-weight: 500;
  }
`;

export const GallerySection: React.FC<GallerySectionProps> = ({ images, onSelectImage, onRemoveImage }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSelectImage(file);
      event.target.value = '';
    }
  };

  return (
    <FormSection>
      <SectionTitle>갤러리</SectionTitle>
      <SectionDescription>최대 9장의 활동 이미지를 등록할 수 있습니다.</SectionDescription>
      <GalleryGrid>
        {images.map((url, index) => (
          <GalleryItem key={url}>
            <GalleryImage src={url} alt={`갤러리 ${index + 1}`} />
            <GalleryOverlay>
              <DeleteButton type="button" onClick={() => onRemoveImage(index)} aria-label="이미지 삭제">
                <X size={18} />
              </DeleteButton>
            </GalleryOverlay>
          </GalleryItem>
        ))}
        {images.length < 9 && (
          <AddImageButton type="button" onClick={() => fileInputRef.current?.click()}>
            <Plus size={28} />
            <Small>추가</Small>
            <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} />
          </AddImageButton>
        )}
      </GalleryGrid>
      <SmallText as="p" style={{ marginTop: 12 }}>
        * 이미지를 삭제하려면 각 썸네일을 눌러주세요.
      </SmallText>
    </FormSection>
  );
};

