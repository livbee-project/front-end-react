import React from 'react';
import styled from 'styled-components';
import FormSection from '@/presentation/components/forms/FormSection';
import SectionTitle from '@/presentation/components/ui/SectionTitle';
import TextInput from '@/presentation/components/forms/TextInput';
import ImageUpload from '@/presentation/components/upload/ImageUpload';

interface NameSectionProps {
  name: string;
  mainThumbnailUrl: string;
  onNameChange: (value: string) => void;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
}

const NameRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const ImagePreviewWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ImagePreview = styled.img`
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

export const NameSection: React.FC<NameSectionProps> = ({
  name,
  mainThumbnailUrl,
  onNameChange,
  onImageSelect,
  onImageRemove,
}) => {
  return (
    <FormSection>
      <SectionTitle variant="default" marginBottom="12px">
        이름
      </SectionTitle>
      <NameRow>
        <TextInput placeholder="내용을 입력해주세요" value={name} onChange={(e) => onNameChange(e.target.value)} />
        {mainThumbnailUrl ? (
          <ImagePreviewWrapper>
            <ImagePreview src={mainThumbnailUrl} alt="프로필" />
            <RemoveButton type="button" onClick={onImageRemove} aria-label="프로필 이미지 삭제">
              ×
            </RemoveButton>
          </ImagePreviewWrapper>
        ) : (
          <ImageUpload size={100} onImageSelect={onImageSelect} />
        )}
      </NameRow>
    </FormSection>
  );
};

