/**
 * 이미지 크롭 리사이즈 로직 훅
 */

import { useState, useCallback } from 'react';
import type { CropArea, CropRatio, ImageSize } from '@/types/imageCrop';
import { getRatioValue } from '@/presentation/hooks/utils/imageCropUtils';

interface UseImageCropResizeParams {
  cropArea: CropArea;
  imageSize: ImageSize;
  selectedRatio: CropRatio;
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
}

export const useImageCropResize = ({
  cropArea,
  imageSize,
  selectedRatio,
  containerRef,
  imageRef,
}: UseImageCropResizeParams) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  /**
   * 크롭 영역 모서리/가장자리 감지 (리사이즈 영역)
   */
  const getResizeHandle = useCallback(
    (x: number, y: number): string | null => {
      const handleSize = 20;
      const { x: cx, y: cy, width, height } = cropArea;
      
      // 모서리 체크
      if (Math.abs(x - cx) < handleSize && Math.abs(y - cy) < handleSize) return 'nw';
      if (Math.abs(x - (cx + width)) < handleSize && Math.abs(y - cy) < handleSize) return 'ne';
      if (Math.abs(x - cx) < handleSize && Math.abs(y - (cy + height)) < handleSize) return 'sw';
      if (Math.abs(x - (cx + width)) < handleSize && Math.abs(y - (cy + height)) < handleSize) return 'se';
      
      // 가장자리 체크
      if (Math.abs(x - cx) < handleSize && y >= cy && y <= cy + height) return 'w';
      if (Math.abs(x - (cx + width)) < handleSize && y >= cy && y <= cy + height) return 'e';
      if (Math.abs(y - cy) < handleSize && x >= cx && x <= cx + width) return 'n';
      if (Math.abs(y - (cy + height)) < handleSize && x >= cx && x <= cx + width) return 's';
      
      return null;
    },
    [cropArea]
  );

  const handleResizeStart = useCallback(
    (clientX: number, clientY: number): boolean => {
      if (!containerRef.current || !imageRef.current) return false;
      const imageRect = imageRef.current.getBoundingClientRect();
      
      const x = clientX - imageRect.left;
      const y = clientY - imageRect.top;

      // 리사이즈 핸들 체크
      const resizeHandle = getResizeHandle(x, y);
      if (resizeHandle) {
        setIsResizing(true);
        setResizeStart({ x, y, width: cropArea.width, height: cropArea.height });
        return true;
      }
      return false;
    },
    [cropArea, getResizeHandle, containerRef, imageRef]
  );

  const handleResizeMove = useCallback(
    (clientX: number, clientY: number, setCropArea: React.Dispatch<React.SetStateAction<CropArea>>) => {
      if (!isResizing || !containerRef.current || !imageRef.current) return;
      
      const imageRect = imageRef.current.getBoundingClientRect();
      const currentX = clientX - imageRect.left;
      const currentY = clientY - imageRect.top;

      const ratio = selectedRatio === 'original'
        ? imageSize.width / imageSize.height
        : getRatioValue(selectedRatio, imageSize.width, imageSize.height);

      const centerX = cropArea.x + cropArea.width / 2;
      const centerY = cropArea.y + cropArea.height / 2;
      
      const deltaX = currentX - centerX;
      const deltaY = currentY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const baseDistance = Math.sqrt(
        (resizeStart.width / 2) * (resizeStart.width / 2) + 
        (resizeStart.height / 2) * (resizeStart.height / 2)
      );
      
      const scale = distance / baseDistance;
      let newWidth = resizeStart.width * scale;
      let newHeight = newWidth / ratio;
      
      const minSize = 100;
      let maxWidth: number;
      let maxHeight: number;
      
      if (ratio > imageSize.width / imageSize.height) {
        maxWidth = imageSize.width;
        maxHeight = maxWidth / ratio;
      } else {
        maxHeight = imageSize.height;
        maxWidth = maxHeight * ratio;
      }
      
      newWidth = Math.max(minSize, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minSize, Math.min(newHeight, maxHeight));
      
      if (newWidth / newHeight !== ratio) {
        newHeight = newWidth / ratio;
      }
      
      const newX = centerX - newWidth / 2;
      const newY = centerY - newHeight / 2;
      const maxX = imageSize.width - newWidth;
      const maxY = imageSize.height - newHeight;
      
      setCropArea({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
        width: newWidth,
        height: newHeight,
      });
    },
    [isResizing, resizeStart, cropArea, selectedRatio, imageSize, containerRef, imageRef]
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
  }, []);

  return {
    isResizing,
    getResizeHandle,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd,
  };
};

