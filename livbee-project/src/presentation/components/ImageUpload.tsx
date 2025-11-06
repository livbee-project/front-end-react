import React, { useRef } from 'react';
import { RiImageLine } from 'react-icons/ri';

/**
 * ImageUpload가 받을 props 타입을 정의합니다.
 */
interface ImageUploadProps {
  size?: number;
  onImageSelect?: (file: File) => void;
}

/**
 * 이미지 업로드 컴포넌트
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  size = 100,
  onImageSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageSelect) {
      onImageSelect(file);
    }
  };

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: size === 100 ? '50%' : '12px',
    border: '1px solid var(--paint-gray, #E5E7ED)',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <RiImageLine size={size * 0.4} color="var(--dark-gray)" />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;

