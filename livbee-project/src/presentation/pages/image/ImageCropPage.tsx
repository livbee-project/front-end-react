import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { P } from '@/presentation/components/styled/Typography';
import { useImageCrop } from '@/presentation/hooks/imageCrop/useImageCrop';
import { CropHeader } from '@/presentation/components/imageCrop/CropHeader';
import { CropViewport } from '@/presentation/components/imageCrop/CropViewport';
import { CropControls } from '@/presentation/components/imageCrop/CropControls';
import type { CropRatio } from '@/types/imageCrop';
import { error as logError } from '@/shared/utils/logger';

/**
 * 유효한 크롭 비율 목록
 */
const VALID_CROP_RATIOS: CropRatio[] = ['1:1', '1:2', '2:1', '2:3', '4:3'];

/**
 * 비율 매칭 허용 오차
 */
const RATIO_TOLERANCE = 0.01;

/**
 * 비율 값 상수
 */
const RATIO_VALUES = {
  SQUARE: 1,
  PORTRAIT: 0.5,
  LANDSCAPE: 2,
  PORTRAIT_2_3: 2 / 3,
  LANDSCAPE_4_3: 4 / 3,
} as const;

/**
 * aspectRatio 문자열을 CropRatio로 변환
 * @param aspectRatio - "16:9", "1:1" 등의 비율 문자열
 * @returns CropRatio 또는 null (일치하는 비율이 없으면 null)
 */
const convertAspectRatioToCropRatio = (aspectRatio?: string): CropRatio | null => {
  if (!aspectRatio) return null;

  if (VALID_CROP_RATIOS.includes(aspectRatio as CropRatio)) {
    return aspectRatio as CropRatio;
  }

  return null;
};

/**
 * 이미지의 원본 비율을 계산하여 CropRatio로 변환
 * @param imageUrl - 이미지 URL
 * @returns Promise<CropRatio | null>
 */
const getImageOriginalRatio = async (imageUrl: string): Promise<CropRatio | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const ratio = width / height;

      if (Math.abs(ratio - RATIO_VALUES.SQUARE) < RATIO_TOLERANCE) {
        resolve('1:1');
      } else if (Math.abs(ratio - RATIO_VALUES.PORTRAIT) < RATIO_TOLERANCE) {
        resolve('1:2');
      } else if (Math.abs(ratio - RATIO_VALUES.LANDSCAPE) < RATIO_TOLERANCE) {
        resolve('2:1');
      } else if (Math.abs(ratio - RATIO_VALUES.PORTRAIT_2_3) < RATIO_TOLERANCE) {
        resolve('2:3');
      } else if (Math.abs(ratio - RATIO_VALUES.LANDSCAPE_4_3) < RATIO_TOLERANCE) {
        resolve('4:3');
      } else {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = imageUrl;
  });
};

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
  const aspectRatio = (location.state as { aspectRatio?: string })?.aspectRatio;

  const [selectedRatio, setSelectedRatio] = useState<CropRatio>('original');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [recommendedRatio, setRecommendedRatio] = useState<CropRatio | null>(null);

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

  // 전체 스크롤 잠금 및 브라우저 줌 차단
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // viewport meta 태그를 동적으로 수정하여 브라우저 줌 차단
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const originalViewport = viewportMeta?.getAttribute('content') || '';
    
    if (viewportMeta) {
      viewportMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }
    
    return () => {
      document.body.style.overflow = originalStyle;
      // viewport meta 태그 원래대로 복원
      if (viewportMeta && originalViewport) {
        viewportMeta.setAttribute('content', originalViewport);
      }
    };
  }, []);

  // 이미지 URL이 없으면 이전 페이지로 이동
  // aspectRatio가 있으면 해당 비율로 초기화, 없으면 이미지 원본 비율 확인
  useEffect(() => {
    if (!imageUrl) {
      navigate(returnPath);
      return;
    }

    setImageSrc(imageUrl);

    // aspectRatio가 전달된 경우 해당 비율로 설정
    if (aspectRatio) {
      const cropRatio = convertAspectRatioToCropRatio(aspectRatio);
      if (cropRatio) {
        setSelectedRatio(cropRatio);
        setRecommendedRatio(cropRatio);
        return;
      }
    }

    // aspectRatio가 없거나 일치하지 않으면 이미지 원본 비율 확인
    getImageOriginalRatio(imageUrl).then((originalRatio) => {
      if (originalRatio) {
        setSelectedRatio(originalRatio);
        setRecommendedRatio(originalRatio);
      } else {
        // 일치하는 비율이 없으면 원본 비율 유지
        setSelectedRatio('original');
        setRecommendedRatio(null);
      }
    });

    // cleanup: Blob URL 해제
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, navigate, returnPath, aspectRatio]);

  /**
   * 저장 버튼 클릭 핸들러
   */
  const handleSave = async () => {
    try {
      const croppedFile = await cropImage();
      console.log('[ImageCropPage] ✂️ 크롭된 파일 생성 완료', {
        fileName: croppedFile.name,
        fileSize: croppedFile.size,
        fileType: croppedFile.type,
        callbackKey,
        hasCallback: !!(callbackKey && window.__imageCropCallbacks?.[callbackKey]),
      });
      
      // 전역 콜백 호출
      if (callbackKey && window.__imageCropCallbacks?.[callbackKey]) {
        const callback = window.__imageCropCallbacks[callbackKey];
        console.log('[ImageCropPage] 📞 콜백 호출 시작', {
          callbackKey,
          callbackType: typeof callback,
        });
        
        // 콜백이 비동기 함수일 수 있으므로 await 처리
        try {
          const result: unknown = callback(croppedFile);
          console.log('[ImageCropPage] ✅ 콜백 호출 완료', {
            result,
            isPromise: result != null && typeof result === 'object' && 'then' in result,
          });
          
          // Promise인 경우 완료될 때까지 대기
          if (result != null && typeof result === 'object' && 'then' in result && typeof (result as { then: unknown }).then === 'function') {
            await (result as Promise<unknown>);
            console.log('[ImageCropPage] ✅ Promise 완료 대기 완료');
          }
          // 상태 업데이트와 sessionStorage 저장이 완료될 때까지 충분한 지연
          // React 상태 업데이트는 비동기이므로 여러 렌더 사이클을 기다림
          await new Promise((resolve) => setTimeout(resolve, 200));
          console.log('[ImageCropPage] ⏳ 상태 업데이트 대기 완료');
        } catch (callbackError) {
          console.error('[ImageCropPage] ❌ 콜백 호출 실패:', callbackError);
          logError('ImageCropPage', '이미지 업로드 콜백 실패:', callbackError);
          // 콜백 실패해도 페이지는 이동 (사용자가 다시 시도할 수 있도록)
        }
        
        // 콜백 호출 후 정리
        delete window.__imageCropCallbacks[callbackKey];
        console.log('[ImageCropPage] 🧹 콜백 정리 완료');
      } else {
        console.warn('[ImageCropPage] ⚠️ 콜백이 없습니다', {
          callbackKey,
          hasCallbacks: !!window.__imageCropCallbacks,
          callbackKeys: window.__imageCropCallbacks ? Object.keys(window.__imageCropCallbacks) : [],
        });
      }
      
      // 콜백 완료 후 페이지 이동 (스크롤 위치 유지를 위해 state에 플래그 추가)
      console.log('[ImageCropPage] 🔄 페이지 이동 시작', { returnPath });
      navigate(returnPath, { 
        replace: true,
        state: { 
          preserveScroll: true, // 스크롤 위치 유지 플래그
        },
      });
    } catch (error) {
      console.error('[ImageCropPage] ❌ 이미지 크롭 실패:', error);
      logError('ImageCropPage', '이미지 크롭 실패:', error);
      alert('이미지 크롭에 실패했습니다.');
    }
  };

  /**
   * 뒤로가기 핸들러
   */
  const handleBack = () => {
    navigate(returnPath, {
      replace: true,
      state: { 
        preserveScroll: true, // 스크롤 위치 유지 플래그
      },
    });
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
        recommendedRatio={recommendedRatio}
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
  height: 100dvh; /* 모바일 브라우저의 동적 뷰포트 높이 사용 */
  display: flex;
  flex-direction: column;
  background-color: #000;
  overflow: hidden;
  position: relative;
`;

const HiddenCanvas = styled.canvas`
  display: none;
`;

export default ImageCropPage;
