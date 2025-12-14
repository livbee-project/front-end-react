/**
 * 이미지 크롭 캔버스 처리 훅
 */

import { useRef, useCallback } from 'react';
import type { CropArea, ImageSize } from '@/types/imageCrop';
import { scaleCropArea } from '@/presentation/hooks/utils/imageCropUtils';

interface UseImageCropCanvasParams {
  cropArea: CropArea;
  imageSize: ImageSize;
  imageRef: React.RefObject<HTMLImageElement | null>;
  imageFileName: string;
}

export const useImageCropCanvas = ({
  cropArea,
  imageSize,
  imageRef,
  imageFileName,
}: UseImageCropCanvasParams) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * 크롭된 이미지를 Blob으로 변환
   */
  const cropImage = useCallback((): Promise<File> => {
    return new Promise((resolve, reject) => {
      if (!imageRef.current || !canvasRef.current) {
        reject(new Error('이미지 또는 캔버스를 찾을 수 없습니다.'));
        return;
      }

      const img = imageRef.current;
      const canvas = canvasRef.current;

      const scaled = scaleCropArea(cropArea, imageSize, img);
      const cropX = scaled.x;
      const cropY = scaled.y;
      const cropWidth = scaled.width;
      const cropHeight = scaled.height;

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
  }, [cropArea, imageSize, imageRef, imageFileName]);

  return {
    canvasRef,
    cropImage,
  };
};

