import React, { useRef } from 'react';
import styled from 'styled-components';
import { Upload, Video, FileText, X } from 'lucide-react';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
  HiddenInput,
  SmallText,
} from '../PortfolioRegisterStyles';
import { Small } from '@/presentation/components/styled/Typography';

interface PortfolioFilesSectionProps {
  resumeFileInfo: string;
  portfolioFileInfo: string;
  onFileAdd: (file: File) => void;
  onResumeRemove: () => void;
  onPortfolioRemove: () => void;
}

const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const EmptyStateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
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

  ${Small} {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.secondary};
`;

const FileIcon = styled.div<{ $variant: 'video' | 'file' }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $variant }) =>
    $variant === 'video' ? theme.primaryOpacity['25'] : theme.primaryOpacity['10']};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const FileName = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled(SmallText)`
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primaryOpacity['10']};
    color: ${({ theme }) => theme.colors.primary};
  }
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
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
      <SectionDescription>PDF, 영상 등 관련 자료를 업로드해주세요.</SectionDescription>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept=".pdf,.ppt,.pptx,.mp4,.mov,.avi,.mkv"
        onChange={handleFileChange}
      />
      <PortfolioList>
        {!hasFiles && (
          <EmptyStateButton type="button" onClick={() => fileInputRef.current?.click()}>
            <Upload size={24} />
            <Small>추가된 파일이 없습니다</Small>
          </EmptyStateButton>
        )}
        {renderFileItem('resume', resumeFileInfo)}
        {renderFileItem('portfolio', portfolioFileInfo)}
      </PortfolioList>
    </FormSection>
  );
};

