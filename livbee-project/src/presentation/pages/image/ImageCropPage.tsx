import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { P } from '@/presentation/components/styled/Typography';
import { useImageCrop } from '@/presentation/hooks/useImageCrop';
import { CropHeader } from '@/presentation/components/imageCrop/CropHeader';
import { CropViewport } from '@/presentation/components/imageCrop/CropViewport';
import { CropControls } from '@/presentation/components/imageCrop/CropControls';
import type { CropRatio } from '@/types/imageCrop';
import { error as logError } from '@/shared/utils/logger';

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
 * 이미지 크롭 페이지 컴포넌트
 */
const ImageCropPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // location.state에서 이미지 URL과 콜백 키 받기
  const imageUrl = (location.state as { imageUrl?: string })?.imageUrl;
  const imageFileName = (location.state as { imageFileName?: string })?.imageFileName || 'cropped-image.jpg';
  const callbackKey = (location.state as { callbackKey?: string })?.callbackKey;
  const returnPath = (location.state as { returnPath?: string })?.returnPath || '/';

  const [selectedRatio, setSelectedRatio] = useState<CropRatio>('original');
  const [imageSrc, setImageSrc] = useState<string>('');

  const {
    cropArea,
    isDragging,
    imageSize,
    imageRef,
    containerRef,
    canvasRef,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    cropImage,
  } = useImageCrop(imageSrc, selectedRatio, imageFileName);

  // 이미지 URL이 없으면 이전 페이지로 이동
  useEffect(() => {
    if (!imageUrl) {
      navigate(returnPath);
    } else {
      setImageSrc(imageUrl);
    }

    // cleanup: Blob URL 해제
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, navigate, returnPath]);

  /**
   * 저장 버튼 클릭 핸들러
   */
  const handleSave = async () => {
    try {
      const croppedFile = await cropImage();
      
      // 전역 콜백 호출
      if (callbackKey && window.__imageCropCallbacks?.[callbackKey]) {
        const callback = window.__imageCropCallbacks[callbackKey];
        
        // 콜백이 비동기 함수일 수 있으므로 await 처리
        try {
          const result: unknown = callback(croppedFile);
          // Promise인 경우 완료될 때까지 대기
          if (result != null && typeof result === 'object' && 'then' in result && typeof (result as { then: unknown }).then === 'function') {
            await (result as Promise<unknown>);
          }
        } catch (callbackError) {
          logError('ImageCropPage', '이미지 업로드 콜백 실패:', callbackError);
          // 콜백 실패해도 페이지는 이동 (사용자가 다시 시도할 수 있도록)
        }
        
        // 콜백 호출 후 정리
        delete window.__imageCropCallbacks[callbackKey];
      }
      
      navigate(returnPath);
    } catch (error) {
      logError('ImageCropPage', '이미지 크롭 실패:', error);
      alert('이미지 크롭에 실패했습니다.');
    }
  };

  /**
   * 뒤로가기 핸들러
   */
  const handleBack = () => {
    navigate(returnPath);
  };

  if (!imageSrc) {
    return (
      <LoadingContainer>
        <P>이미지를 불러오는 중...</P>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      <CropHeader onBack={handleBack} onSave={handleSave} />
      <CropViewport
        imageSrc={imageSrc}
        imageSize={imageSize}
        cropArea={cropArea}
        isDragging={isDragging}
        imageRef={imageRef}
        containerRef={containerRef}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      />
      <CropControls
        selectedRatio={selectedRatio}
        onRatioChange={setSelectedRatio}
      />
      <HiddenCanvas ref={canvasRef} />
    </PageContainer>
  );
};

const LoadingContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #000;
`;

const HiddenCanvas = styled.canvas`
  display: none;
`;

export default ImageCropPage;
