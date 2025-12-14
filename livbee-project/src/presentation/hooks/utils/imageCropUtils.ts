import type { CropRatio, CropArea, ImageSize } from '@/types/imageCrop';

export const getRatioValue = (ratio: CropRatio, imgWidth: number, imgHeight: number): number => {
  if (ratio === 'original') {
    return imgWidth > 0 && imgHeight > 0 ? imgWidth / imgHeight : 1;
  }
  const [w, h] = ratio.split(':').map(Number);
  return w / h;
};

export const calculateMaxCropSize = (ratio: number, width: number, height: number) => {
  if (ratio > width / height) {
    const cropWidth = width;
    const cropHeight = cropWidth / ratio;
    return { cropWidth, cropHeight };
  }
  const cropHeight = height;
  const cropWidth = cropHeight * ratio;
  return { cropWidth, cropHeight };
};

export const clampCropPosition = (x: number, y: number, width: number, height: number, imageSize: ImageSize) => {
  const maxX = imageSize.width - width;
  const maxY = imageSize.height - height;
  return {
    x: Math.max(0, Math.min(x, maxX)),
    y: Math.max(0, Math.min(y, maxY)),
  };
};

export const scaleCropArea = (cropArea: CropArea, imageSize: ImageSize, image: HTMLImageElement) => {
  const scaleX = image.naturalWidth / imageSize.width;
  const scaleY = image.naturalHeight / imageSize.height;

  return {
    x: cropArea.x * scaleX,
    y: cropArea.y * scaleY,
    width: cropArea.width * scaleX,
    height: cropArea.height * scaleY,
  };
};

