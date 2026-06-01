import React, { useRef } from 'react';
import styled from 'styled-components';
import { Video, FileText, X, ArrowUp } from 'lucide-react';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
  HiddenInput,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import { MAX_FILE_SIZE, formatFileSize } from '@/shared/constants/fileUpload';

interface PortfolioFilesSectionProps {
  resumeFileInfo: string | null;
  portfolioFileInfo: string | null;
  onFileAdd: (file: File) => void;
  onResumeRemove: () => void;
  onPortfolioRemove: () => void;
  onFileError?: (message: string) => void;
}

const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FileItem = styled.div`
  background-color: #F9FAFB;
  border: none;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const FileIcon = styled.div<{ $variant: 'video' | 'file' }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111111;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2px;
`;

const FileSize = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const RemoveButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: transparent;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background-color: #FEE2E2;
    color: ${({ theme }) => theme.colors.error};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const AddFileButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  border: 2px dashed #D1D5DB;
  border-radius: 16px;
  background-color: #F9FAFB;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary}05;
  }
`;

const UploadIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #F3F4F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  margin-bottom: 12px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const UploadText = styled.p`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
  margin: 0 0 4px 0;
`;

const UploadSubtext = styled.p`
  font-size: 12px;
  color: #9CA3AF;
  margin: 0;
`;

const renderFileText = (fileInfo: string) => {
  if (!fileInfo.includes('(')) {
    return { name: fileInfo, size: '' };
  }

  const [name, sizeWithParen] = fileInfo.split(' (');
  return { name, size: sizeWithParen ? sizeWithParen.replace(')', '') : '' };
};

export const PortfolioFilesSection: React.FC<PortfolioFilesSectionProps> = ({
  resumeFileInfo,
  portfolioFileInfo,
  onFileAdd,
  onResumeRemove,
  onPortfolioRemove,
  onFileError,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 검증
      if (file.size > MAX_FILE_SIZE) {
        const errorMessage = `파일 크기가 너무 큽니다. 최대 ${formatFileSize(MAX_FILE_SIZE)}까지 업로드 가능합니다. (현재: ${formatFileSize(file.size)})`;
        if (onFileError) {
          onFileError(errorMessage);
        }
        event.target.value = '';
        return;
      }
      onFileAdd(file);
      event.target.value = '';
    }
  };

  const renderFileItem = (type: 'resume' | 'portfolio', fileInfo: string) => {
    if (!fileInfo) return null;
    const { name, size } = renderFileText(fileInfo);
    const isVideo = type === 'portfolio';

    return (
      <FileItem key={type}>
        <FileIcon $variant={isVideo ? 'video' : 'file'}>
          {isVideo ? <Video size={20} /> : <FileText size={20} />}
        </FileIcon>
        <FileInfo>
          <FileName>{name}</FileName>
          {size && <FileSize>{size}</FileSize>}
        </FileInfo>
        <RemoveButton
          type="button"
          onClick={isVideo ? onPortfolioRemove : onResumeRemove}
          aria-label={`${type === 'resume' ? '이력서' : '포트폴리오'} 삭제`}
        >
          <X size={18} />
        </RemoveButton>
      </FileItem>
    );
  };

  const hasFiles = resumeFileInfo || portfolioFileInfo;

  return (
    <FormSection>
      <SectionTitle>포트폴리오</SectionTitle>
      <SectionDescription>PDF, 영상 파일 등을 첨부할 수 있습니다</SectionDescription>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept=".pdf,.ppt,.pptx,.mp4,.mov,.avi,.mkv"
        onChange={handleFileChange}
      />
      <PortfolioList>
        {resumeFileInfo && renderFileItem('resume', resumeFileInfo)}
        {portfolioFileInfo && renderFileItem('portfolio', portfolioFileInfo)}
        {!hasFiles && (
          <AddFileButton type="button" onClick={() => fileInputRef.current?.click()}>
            <UploadIcon>
              <ArrowUp size={24} />
            </UploadIcon>
            <UploadText>포트폴리오 파일을 추가해주세요</UploadText>
            <UploadSubtext>PDF, 영상 파일 등</UploadSubtext>
          </AddFileButton>
        )}
      </PortfolioList>
    </FormSection>
  );
};

