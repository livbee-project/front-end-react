import { useState, useRef, useEffect, useCallback } from 'react';
import type { CropRatio, CropArea, ImageSize } from '@/types/imageCrop';

/**
 * 비율 값을 숫자로 변환
 */
const getRatioValue = (ratio: CropRatio, imgWidth: number, imgHeight: number): number => {
  if (ratio === 'original') {
    return imgWidth > 0 && imgHeight > 0 ? imgWidth / imgHeight : 1;
  }
  const [w, h] = ratio.split(':').map(Number);
  return w / h;
};

/**
 * 이미지 크롭 관련 로직을 관리하는 커스텀 훅
 */
export const useImageCrop = (
  imageSrc: string,
  selectedRatio: CropRatio,
  imageFileName: string
) => {
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0 });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    
    // 최대 크기 계산
    let maxCropWidth: number;
    let maxCropHeight: number;
    
    if (ratio > actualDisplayWidth / actualDisplayHeight) {
      maxCropWidth = actualDisplayWidth;
      maxCropHeight = maxCropWidth / ratio;
    } else {
      maxCropHeight = actualDisplayHeight;
      maxCropWidth = maxCropHeight * ratio;
    }
    
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
  }, [imageSrc, selectedRatio]);

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
  }, [imageSrc, selectedRatio, updateImageSizeAndCropArea]);

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
    
    let maxCropWidth: number;
    let maxCropHeight: number;
    
    if (ratio > imageSize.width / imageSize.height) {
      maxCropWidth = imageSize.width;
      maxCropHeight = maxCropWidth / ratio;
    } else {
      maxCropHeight = imageSize.height;
      maxCropWidth = maxCropHeight * ratio;
    }
    
    const newWidth = maxCropWidth;
    const newHeight = maxCropHeight;
    const maxX = imageSize.width - newWidth;
    const maxY = imageSize.height - newHeight;

    setCropArea((prev) => {
      const centerX = prev.x + prev.width / 2;
      const centerY = prev.y + prev.height / 2;
      
      const newX = Math.max(0, Math.min(centerX - newWidth / 2, maxX));
      const newY = Math.max(0, Math.min(centerY - newHeight / 2, maxY));

      return {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      };
    });
  }, [selectedRatio, imageSize]);

  /**
   * 크롭 영역 모서리/가장자리 감지 (리사이즈 영역)
   */
  const getResizeHandle = (x: number, y: number): string | null => {
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
  };

  /**
   * 마우스/터치 드래그 시작
   */
  const handleDragStart = (clientX: number, clientY: number) => {
    if (!containerRef.current || !imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    
    const x = clientX - imageRect.left;
    const y = clientY - imageRect.top;

    // 리사이즈 핸들 체크
    const resizeHandle = getResizeHandle(x, y);
    if (resizeHandle) {
      setIsResizing(true);
      setResizeStart({ x, y, width: cropArea.width, height: cropArea.height });
      return;
    }

    // 크롭 영역 내부인지 확인 (드래그 이동)
    if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  };

  /**
   * 마우스/터치 드래그 중
   */
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!containerRef.current || !imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    const currentX = clientX - imageRect.left;
    const currentY = clientY - imageRect.top;

    // 리사이즈 중
    if (isResizing) {
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
      return;
    }

    // 드래그 이동 중
    if (isDragging) {
      const x = currentX - dragStart.x;
      const y = currentY - dragStart.y;
      const maxX = imageSize.width - cropArea.width;
      const maxY = imageSize.height - cropArea.height;

      setCropArea((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY)),
      }));
    }
  };

  /**
   * 마우스/터치 드래그 종료
   */
  const handleDragEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  /**
   * 크롭된 이미지를 Blob으로 변환
   */
  const cropImage = (): Promise<File> => {
    return new Promise((resolve, reject) => {
      if (!imageRef.current || !canvasRef.current) {
        reject(new Error('이미지 또는 캔버스를 찾을 수 없습니다.'));
        return;
      }

      const img = imageRef.current;
      const canvas = canvasRef.current;

      const scaleX = img.naturalWidth / imageSize.width;
      const scaleY = img.naturalHeight / imageSize.height;

      const cropX = cropArea.x * scaleX;
      const cropY = cropArea.y * scaleY;
      const cropWidth = cropArea.width * scaleX;
      const cropHeight = cropArea.height * scaleY;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('캔버스 컨텍스트를 가져올 수 없습니다.'));
        return;
      }

      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('이미지 변환에 실패했습니다.'));
            return;
          }
          const file = new File([blob], imageFileName, {
            type: 'image/jpeg',
          });
          resolve(file);
        },
        'image/jpeg',
        0.95
      );
    });
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

