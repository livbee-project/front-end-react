/**
 * 이미지 크롭 드래그 로직 훅
 */

import { useState, useCallback } from 'react';
import type { CropArea, ImageSize } from '@/types/imageCrop';
import { clampCropPosition } from '@/presentation/hooks/utils/imageCropUtils';

interface UseImageCropDragParams {
  cropArea: CropArea;
  imageSize: ImageSize;
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
}

export const useImageCropDrag = ({ cropArea, imageSize, containerRef, imageRef }: UseImageCropDragParams) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleDragStart = useCallback(
    (clientX: number, clientY: number): boolean => {
      if (!containerRef.current || !imageRef.current) return false;
      const imageRect = imageRef.current.getBoundingClientRect();
      
      const x = clientX - imageRect.left;
      const y = clientY - imageRect.top;

      // 크롭 영역 내부인지 확인 (드래그 이동)
      if (
        x >= cropArea.x &&
        x <= cropArea.x + cropArea.width &&
        y >= cropArea.y &&
        y <= cropArea.y + cropArea.height
      ) {
        setIsDragging(true);
        setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
        return true;
      }
      return false;
    },
    [cropArea, containerRef, imageRef]
  );

  const handleDragMove = useCallback(
    (clientX: number, clientY: number, setCropArea: React.Dispatch<React.SetStateAction<CropArea>>) => {
      if (!isDragging || !containerRef.current || !imageRef.current) return;
      
      const imageRect = imageRef.current.getBoundingClientRect();
      const currentX = clientX - imageRect.left;
      const currentY = clientY - imageRect.top;

      const x = currentX - dragStart.x;
      const y = currentY - dragStart.y;
      
      setCropArea((prev) => {
        const { x: clampedX, y: clampedY } = clampCropPosition(x, y, prev.width, prev.height, imageSize);
        return {
          ...prev,
          x: clampedX,
          y: clampedY,
        };
      });
    },
    [isDragging, dragStart, imageSize, containerRef, imageRef]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};

