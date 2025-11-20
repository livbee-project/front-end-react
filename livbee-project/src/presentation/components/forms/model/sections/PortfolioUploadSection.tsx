import React, { useRef } from 'react';
import styled from 'styled-components';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import { Caption } from '@/presentation/components/styled/Typography';
import FormField from '@/presentation/components/forms/common/FormField';

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
    <FormSection title="포트폴리오 파일">
      <FormField helper="PDF, PPT, 동영상 파일을 첨부할 수 있습니다.">
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept=".pdf,.ppt,.pptx,.mp4,.mov,.avi,.mkv"
          onChange={handleChange}
        />
        {!fileInfo ? (
          <UploadButton type="button" onClick={() => fileInputRef.current?.click()}>
            <Caption>추가된 파일이 없습니다</Caption>
          </UploadButton>
        ) : (
          <InfoRow>
            <SuccessText>✓ {fileInfo}</SuccessText>
            <RemoveLink type="button" onClick={onFileRemove}>
              삭제
            </RemoveLink>
          </InfoRow>
        )}
      </FormField>
    </FormSection>
  );
};

const HiddenInput = styled.input`
  display: none;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

