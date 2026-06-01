import React, { useRef } from 'react';
import styled from 'styled-components';
import { FileText as FileIconBase } from 'lucide-react';
import { H3, Caption } from '@/presentation/components/styled/Typography';
import type { FileUploadProps as BaseFileUploadProps } from '@/types/components';

/**
 * FileUpload가 받을 props 타입을 정의합니다.
 */
interface FileUploadProps extends BaseFileUploadProps {
  label: string;
}

/**
 * 파일 업로드 컴포넌트
 */
const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <Container onClick={handleClick}>
      <LabelRow>
        <FileIcon size={20} />
        <LabelText as={H3}>{label}</LabelText>
      </LabelRow>
      <UploadText as={Caption}>파일업로드</UploadText>
      <HiddenInput ref={fileInputRef} type="file" onChange={handleFileChange} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.input.padding};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FileIcon = styled(FileIconBase)`
  color: ${({ theme }) => theme.colors.muted};
`;

const LabelText = styled(H3)`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 400;
`;

const UploadText = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const HiddenInput = styled.input`
  display: none;
`;

export default FileUpload;

