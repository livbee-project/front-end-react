import React, { useRef } from 'react';
import styled from 'styled-components';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import { Caption } from '@/presentation/components/styled/Typography';

interface PortfolioUploadSectionProps {
  fileInfo: string;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
}

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: 20px;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.primaryOpacity['10']};
  }
`;

const SuccessText = styled(Caption)`
  color: ${({ theme }) => theme.colors.primary};
`;

const RemoveLink = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  font: ${({ theme }) => theme.fonts.caption};
`;

export const PortfolioUploadSection: React.FC<PortfolioUploadSectionProps> = ({
  fileInfo,
  onFileSelect,
  onFileRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      event.target.value = '';
    }
  };

  return (
    <FormSection title="포트폴리오">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.ppt,.pptx,.mp4,.mov,.avi,.mkv"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {!fileInfo ? (
        <UploadButton type="button" onClick={() => fileInputRef.current?.click()}>
          <Caption>추가된 파일이 없습니다</Caption>
        </UploadButton>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <SuccessText>✓ {fileInfo}</SuccessText>
          <RemoveLink type="button" onClick={onFileRemove}>
            삭제
          </RemoveLink>
        </div>
      )}
    </FormSection>
  );
};

