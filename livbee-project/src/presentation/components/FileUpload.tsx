import React, { useRef } from 'react';
import { RiFileLine } from 'react-icons/ri';

/**
 * FileUpload가 받을 props 타입을 정의합니다.
 */
interface FileUploadProps {
  label: string;
  onFileSelect?: (file: File) => void;
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

  const containerStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--white)',
    borderRadius: 12,
    border: '1px solid var(--paint-gray, #E5E7ED)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <RiFileLine size={20} color="var(--dark-gray)" />
        <span
          style={{
            fontSize: 'var(--h3)',
            color: 'var(--black)',
            fontWeight: 400,
          }}
        >
          {label}
        </span>
      </div>
      <span
        style={{
          fontSize: '12px',
          color: 'var(--dark-gray)',
        }}
      >
        파일업로드
      </span>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;

