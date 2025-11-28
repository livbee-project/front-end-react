/**
 * 이미지 크기 및 크롭 영역 계산 훅
 */

import { useState, useEffect, useCallback } from 'react';
import type { CropRatio, CropArea, ImageSize } from '@/types/imageCrop';
import { getRatioValue, calculateMaxCropSize, clampCropPosition } from '../utils/imageCropUtils';

interface UseImageCropSizeParams {
  imageSrc: string;
  selectedRatio: CropRatio;
  imageRef: React.RefObject<HTMLImageElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const useImageCropSize = ({
  imageSrc,
  selectedRatio,
  imageRef,
  containerRef,
}: UseImageCropSizeParams) => {
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0 });

  /**
   * 이미지 크기 및 크롭 영역 업데이트 함수
   */
  const updateImageSizeAndCropArea = useCallback(() => {
    if (!imageSrc || !imageRef.current || !containerRef.current) return;
    
    const img = imageRef.current;
    const container = containerRef.current;

    if (!img.complete) return;

    // 실제 렌더링된 이미지 크기 확인 (getBoundingClientRect 사용)
    const imgRect = img.getBoundingClientRect();
    const actualDisplayWidth = imgRect.width;
    const actualDisplayHeight = imgRect.height;

    // 이미지가 아직 렌더링되지 않았으면 계산
    if (actualDisplayWidth === 0 || actualDisplayHeight === 0) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const containerAspect = containerWidth / containerHeight;

      let displayWidth: number;
      let displayHeight: number;

      if (imgAspect > containerAspect) {
        displayHeight = containerHeight;
        displayWidth = displayHeight * imgAspect;
      } else {
        displayWidth = containerWidth;
        displayHeight = displayWidth / imgAspect;
      }

      setImageSize({ width: displayWidth, height: displayHeight });
      return;
    }

    // 실제 렌더링된 이미지 크기를 사용
    setImageSize({ width: actualDisplayWidth, height: actualDisplayHeight });

    const imgAspect = img.naturalWidth / img.naturalHeight;
    
    // 초기 크롭 영역 설정 (최대 크기, 중앙에 위치)
    const ratio = selectedRatio === 'original'
      ? imgAspect
      : getRatioValue(selectedRatio, actualDisplayWidth, actualDisplayHeight);

    const { cropWidth: maxCropWidth, cropHeight: maxCropHeight } = calculateMaxCropSize(
      ratio,
      actualDisplayWidth,
      actualDisplayHeight
    );
    
    const cropWidth = maxCropWidth;
    const cropHeight = maxCropHeight;
    const x = (actualDisplayWidth - cropWidth) / 2;
    const y = (actualDisplayHeight - cropHeight) / 2;

    setCropArea({
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: cropWidth,
      height: cropHeight,
    });
  }, [imageSrc, selectedRatio, imageRef, containerRef]);

  // 이미지 로드 후 초기 크롭 영역 설정
  useEffect(() => {
    if (imageSrc && imageRef.current) {
      const img = imageRef.current;
      
      const updateAfterLoad = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            updateImageSizeAndCropArea();
          });
        });
      };
      
      if (img.complete) {
        updateAfterLoad();
      } else {
        img.onload = updateAfterLoad;
      }
    }
  }, [imageSrc, selectedRatio, updateImageSizeAndCropArea, imageRef]);

  // 윈도우 리사이즈 이벤트 처리
  useEffect(() => {
    const handleResize = () => {
      updateImageSizeAndCropArea();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateImageSizeAndCropArea]);

  // 비율 변경 시 크롭 영역 업데이트 (중심점 유지)
  useEffect(() => {
    if (imageSize.width === 0 || imageSize.height === 0) return;
    if (!imageRef.current) return;

    const img = imageRef.current;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const ratio = selectedRatio === 'original'
      ? imgAspect
      : getRatioValue(selectedRatio, imageSize.width, imageSize.height);

    const { cropWidth: maxCropWidth, cropHeight: maxCropHeight } = calculateMaxCropSize(
      ratio,
      imageSize.width,
      imageSize.height
    );
    
    const newWidth = maxCropWidth;
    const newHeight = maxCropHeight;

    setCropArea((prev) => {
      const centerX = prev.x + prev.width / 2;
      const centerY = prev.y + prev.height / 2;

      const { x: newX, y: newY } = clampCropPosition(
        centerX - newWidth / 2,
        centerY - newHeight / 2,
        newWidth,
        newHeight,
        imageSize
      );

      return {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      };
    });
  }, [selectedRatio, imageSize, imageRef]);

  return {
    cropArea,
    setCropArea,
    imageSize,
  };
};

