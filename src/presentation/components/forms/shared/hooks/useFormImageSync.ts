import { useState, useEffect } from 'react';

interface UseFormImageSyncOptions {
  initialMainThumbnailUrl?: string | null;
  galleryImageUrls: string[];
  storedMainThumbnail?: string | null;
  storedGallery?: string[];
}

export const useFormImageSync = ({
  initialMainThumbnailUrl,
  galleryImageUrls,
  storedMainThumbnail,
  storedGallery,
}: UseFormImageSyncOptions) => {
  const [mainThumbnailUrlState, setMainThumbnailUrlState] = useState<string | null>(
    storedMainThumbnail ?? initialMainThumbnailUrl ?? null,
  );
  const [galleryImageUrlsState, setGalleryImageUrlsState] = useState<string[]>(
    storedGallery && storedGallery.length > 0 ? storedGallery : galleryImageUrls,
  );

  useEffect(() => {
    if (initialMainThumbnailUrl && initialMainThumbnailUrl !== mainThumbnailUrlState) {
      setMainThumbnailUrlState(initialMainThumbnailUrl);
    }
  }, [initialMainThumbnailUrl, mainThumbnailUrlState]);

  useEffect(() => {
    if (galleryImageUrls.length > 0 && JSON.stringify(galleryImageUrls) !== JSON.stringify(galleryImageUrlsState)) {
      setGalleryImageUrlsState(galleryImageUrls);
    }
  }, [galleryImageUrls, galleryImageUrlsState]);

  return {
    mainThumbnailUrlState,
    galleryImageUrlsState,
  };
};

