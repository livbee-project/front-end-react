import React, { useRef } from 'react';
import { RiImageLine } from 'react-icons/ri';

/**
 * ImageUpload가 받을 props 타입을 정의합니다.
 */
interface ImageUploadProps {
  size?: number;
  aspectRatio?: string; // 예: '1:2', '1:1', '3:4'
  onImageSelect?: (file: File) => void;
}

/**
 * 이미지 업로드 컴포넌트
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  size = 100,
  aspectRatio,
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

  // aspectRatio에 따라 크기 계산
  const getDimensions = () => {
    if (!aspectRatio) {
      return { width: size, height: size };
    }
    const [w, h] = aspectRatio.split(':').map(Number);
    const ratio = h / w;
    return { width: size, height: size * ratio };
  };

  const { width, height } = getDimensions();

  const containerStyle: React.CSSProperties = {
    width,
    height,
    borderRadius: size === 100 && !aspectRatio ? '50%' : '12px',
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

