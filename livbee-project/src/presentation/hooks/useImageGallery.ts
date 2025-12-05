import { useCallback, useEffect, useMemo, useState } from 'react';

export interface ImageGallery {
  images: string[];
  setImages: (images: string[]) => void;
  activeIndex: number | null;
  currentImage: string | undefined;
  isOpen: boolean;
  open: (index: number) => void;
  close: () => void;
  showNext: () => void;
  showPrev: () => void;
}

export const useImageGallery = (initialImages: string[] = []): ImageGallery => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  useEffect(() => {
    setActiveIndex((prev) => {
      if (prev == null) {
        return prev;
      }
      if (images.length === 0) {
        return null;
      }
      return prev >= images.length ? images.length - 1 : prev;
    });
  }, [images]);

  const open = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length) {
        return;
      }
      setActiveIndex(index);
    },
    [images]
  );

  const close = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev == null || images.length === 0) {
        return prev;
      }
      return (prev + 1) % images.length;
    });
  }, [images]);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev == null || images.length === 0) {
        return prev;
      }
      return (prev - 1 + images.length) % images.length;
    });
  }, [images]);

  const currentImage = useMemo(() => {
    if (activeIndex == null) {
      return undefined;
    }
    return images[activeIndex];
  }, [activeIndex, images]);

  return {
    images,
    setImages,
    activeIndex,
    currentImage,
    isOpen: activeIndex != null && images.length > 0,
    open,
    close,
    showNext,
    showPrev,
  };
};

