import { useCallback, useState } from 'react';

interface UseFormUploadOptions {
  maxGalleryImages?: number;
}

export const useFormUpload = ({ maxGalleryImages = 9 }: UseFormUploadOptions = {}) => {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  const selectProfileImage = useCallback((file: File) => {
    if (profileUrl && profileUrl.startsWith('blob:')) {
      URL.revokeObjectURL(profileUrl);
    }
    setProfileFile(file);
    setProfileUrl(URL.createObjectURL(file));
  }, [profileUrl]);

  const removeProfileImage = useCallback(() => {
    if (profileUrl && profileUrl.startsWith('blob:')) {
      URL.revokeObjectURL(profileUrl);
    }
    setProfileFile(null);
    setProfileUrl('');
  }, [profileUrl]);

  const selectGalleryImage = useCallback(
    (file: File) => {
      if (galleryFiles.length >= maxGalleryImages) {
        return false;
      }
      setGalleryFiles((prev) => [...prev, file]);
      setGalleryUrls((prev) => [...prev, URL.createObjectURL(file)]);
      return true;
    },
    [galleryFiles.length, maxGalleryImages]
  );

  const removeGalleryImage = useCallback(
    (index: number) => {
      setGalleryFiles((prev) => prev.filter((_, idx) => idx !== index));
      setGalleryUrls((prev) => {
        const target = prev[index];
        if (target && target.startsWith('blob:')) {
          URL.revokeObjectURL(target);
        }
        return prev.filter((_, idx) => idx !== index);
      });
    },
    []
  );

  return {
    profileFile,
    profileUrl,
    galleryFiles,
    galleryUrls,
    selectProfileImage,
    removeProfileImage,
    selectGalleryImage,
    removeGalleryImage,
  };
};

