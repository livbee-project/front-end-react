import { useRef } from 'react';
import type { CropRatio } from '@/types/imageCrop';
import { useImageCropSize } from './imageCrop/useImageCropSize';
import { useImageCropDrag } from './imageCrop/useImageCropDrag';
import { useImageCropResize } from './imageCrop/useImageCropResize';
import { useImageCropCanvas } from './imageCrop/useImageCropCanvas';

export const useImageCrop = (
  imageSrc: string,
  selectedRatio: CropRatio,
  imageFileName: string
) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { cropArea, setCropArea, imageSize } = useImageCropSize({
    imageSrc,
    selectedRatio,
    imageRef,
    containerRef,
  });

  const { isDragging, handleDragStart: handleDragStartBase, handleDragMove: handleDragMoveBase, handleDragEnd: handleDragEndBase } = useImageCropDrag({
    cropArea,
    imageSize,
    containerRef,
    imageRef,
  });

  const { isResizing, handleResizeStart, handleResizeMove, handleResizeEnd } = useImageCropResize({
    cropArea,
    imageSize,
    selectedRatio,
    containerRef,
    imageRef,
  });

  const { canvasRef, cropImage } = useImageCropCanvas({
    cropArea,
    imageSize,
    imageRef,
    imageFileName,
  });

  /**
   * 마우스/터치 드래그 시작
   */
  const handleDragStart = (clientX: number, clientY: number) => {
    // 리사이즈 먼저 체크
    if (handleResizeStart(clientX, clientY)) {
      return;
    }
    // 드래그 체크
    handleDragStartBase(clientX, clientY);
  };

  /**
   * 마우스/터치 드래그 중
   */
  const handleDragMove = (clientX: number, clientY: number) => {
    if (isResizing) {
      handleResizeMove(clientX, clientY, setCropArea);
    } else {
      handleDragMoveBase(clientX, clientY, setCropArea);
    }
  };

  /**
   * 마우스/터치 드래그 종료
   */
  const handleDragEnd = () => {
    handleDragEndBase();
    handleResizeEnd();
  };

  return {
    cropArea,
    isDragging,
    imageSize,
    imageRef: imageRef as React.RefObject<HTMLImageElement>,
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    canvasRef: canvasRef as React.RefObject<HTMLCanvasElement>,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    cropImage,
  };
};

