import React, { useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { Image as ImageIconBase } from 'lucide-react';
import type { ImageUploadProps } from '@/types/commonProps';
import { saveScrollPositionBeforeCrop } from '@/shared/utils/scrollPosition';

/**
 * 전역 타입 확장
 */
declare global {
  interface Window {
    __imageCropCallbacks?: {
      [key: string]: (file: File, type?: 'cover' | 'product' | 'liveCover') => void;
    };
  }
}

/**
 * 이미지 업로드 컴포넌트
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  size = 100,
  aspectRatio,
  onImageSelect,
  onSelectImage,
  enableCrop = true,
  imageUrl,
}) => {
  // onImageSelect와 onSelectImage 중 하나를 사용
  const handleImageSelect = onImageSelect || onSelectImage;
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
      // 현재 스크롤 위치 저장 (크롭 페이지에서 돌아올 때 복원하기 위해)
      saveScrollPositionBeforeCrop(location.pathname);

      // 파일을 Blob URL로 변환하여 전달 (함수는 전달할 수 없으므로)
      const imageUrl = URL.createObjectURL(file);
      
      // 콜백을 전역 이벤트로 등록
      let callbackKey: string | undefined;
      if (handleImageSelect) {
        callbackKey = `imageCrop_${Date.now()}_${Math.random()}`;
        if (!window.__imageCropCallbacks) {
          window.__imageCropCallbacks = {};
        }
        // handleImageSelect는 이미 (file) => handleImageSelect(file, type) 형태로 래핑되어 있으므로
        // 그대로 등록하면 됨
        window.__imageCropCallbacks[callbackKey] = handleImageSelect;
        console.log('[ImageUpload] 📝 콜백 등록', {
          callbackKey,
          hasCallback: !!handleImageSelect,
          callbackType: typeof handleImageSelect,
        });
      }
      
      navigate('/image/crop', {
        replace: true,
        state: {
          imageUrl,
          imageFileName: file.name,
          returnPath: location.pathname,
          callbackKey,
          aspectRatio, // 미리보기 비율 전달
        },
      });
      console.log('[ImageUpload] 🔄 크롭 페이지로 이동', {
        callbackKey,
        imageFileName: file.name,
        returnPath: location.pathname,
      });
    } else {
      // 크롭 기능이 비활성화되어 있으면 바로 콜백 호출
      if (handleImageSelect) {
        handleImageSelect(file);
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
  const isCircle = size === 100 && !aspectRatio;

  return (
    <Container
      $width={width}
      $height={height}
      $isCircle={isCircle}
      onClick={handleClick}
    >
      {imageUrl ? (
        <PreviewImage src={imageUrl} alt="미리보기" $width={width} $height={height} $isCircle={isCircle} />
      ) : (
        <ImageIcon size={size * 0.4} />
      )}
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </Container>
  );
};

const Container = styled.div<{ $width: number; $height: number; $isCircle: boolean }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: ${({ $isCircle, theme }) => ($isCircle ? theme.radii.full : theme.radii.lg)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const ImageIcon = styled(ImageIconBase)`
  color: ${({ theme }) => theme.colors.muted};
`;

const PreviewImage = styled.img<{ $width: number; $height: number; $isCircle: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ $isCircle, theme }) => ($isCircle ? theme.radii.full : theme.radii.lg)};
`;

const HiddenInput = styled.input`
  display: none;
`;

export default ImageUpload;

