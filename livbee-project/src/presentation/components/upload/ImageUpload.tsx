import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiImageLine } from 'react-icons/ri';

/**
 * 전역 타입 확장
 */
declare global {
  interface Window {
    __imageCropCallbacks?: {
      [key: string]: (file: File) => void;
    };
  }
}

/**
 * ImageUpload가 받을 props 타입을 정의합니다.
 */
interface ImageUploadProps {
  size?: number;
  aspectRatio?: string; // 예: '1:2', '1:1', '3:4'
  onImageSelect?: (file: File) => void;
  enableCrop?: boolean; // 크롭 기능 활성화 여부 (기본값: true)
}

/**
 * 이미지 업로드 컴포넌트
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  size = 100,
  aspectRatio,
  onImageSelect,
  enableCrop = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 크롭 기능이 활성화되어 있으면 크롭 페이지로 이동
    if (enableCrop) {
      // 파일을 Blob URL로 변환하여 전달 (함수는 전달할 수 없으므로)
      const imageUrl = URL.createObjectURL(file);
      
      // 콜백을 전역 이벤트로 등록
      let callbackKey: string | undefined;
      if (onImageSelect) {
        callbackKey = `imageCrop_${Date.now()}_${Math.random()}`;
        if (!window.__imageCropCallbacks) {
          window.__imageCropCallbacks = {};
        }
        window.__imageCropCallbacks[callbackKey] = onImageSelect;
      }
      
      navigate('/image/crop', {
        state: {
          imageUrl,
          imageFileName: file.name,
          returnPath: location.pathname,
          callbackKey,
        },
      });
    } else {
      // 크롭 기능이 비활성화되어 있으면 바로 콜백 호출
      if (onImageSelect) {
        onImageSelect(file);
      }
    }

    // 같은 파일을 다시 선택할 수 있도록 input 값 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

