import React from 'react';
import styled from 'styled-components';
import FormSection from '@/presentation/components/forms/FormSection';
import ImageUpload from '@/presentation/components/upload/ImageUpload';
import { MAX_GALLERY_IMAGES } from '../useModelRegisterForm';

interface GallerySectionProps {
  images: string[];
  onSelectImage: (file: File) => void;
  onRemoveImage: (index: number) => void;
}

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`;

const GalleryItem = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.errorForeground};
  cursor: pointer;
`;

export const GallerySection: React.FC<GallerySectionProps> = ({ images, onSelectImage, onRemoveImage }) => {
  return (
    <FormSection title="갤러리">
      {images.length < MAX_GALLERY_IMAGES && (
        <ImageUpload size={120} onImageSelect={onSelectImage} style={{ marginBottom: '12px' }} />
      )}
      {images.length > 0 && (
        <GalleryGrid>
          {images.map((url, index) => (
            <GalleryItem key={url}>
              <GalleryImage src={url} alt={`갤러리 ${index + 1}`} />
              <RemoveButton type="button" onClick={() => onRemoveImage(index)}>
                ×
              </RemoveButton>
            </GalleryItem>
          ))}
        </GalleryGrid>
      )}
    </FormSection>
  );
};

