import { useCallback } from 'react';
import { useCloudinaryUpload } from '@/presentation/hooks/common/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';

interface UseFormImageUploadReturn {
  uploadMainThumbnail: (file: File | null) => Promise<string | undefined>;
  uploadGalleryImages: (files: File[]) => Promise<string[]>;
  isUploading: boolean;
}

/**
 * 폼에서 이미지 업로드를 처리하는 공통 훅
 */
export const useFormImageUpload = (): UseFormImageUploadReturn => {
  const { uploadFile, isUploading } = useCloudinaryUpload();
  const { showToast } = useToast();

  const uploadMainThumbnail = useCallback(
    async (file: File | null): Promise<string | undefined> => {
      if (!file) return undefined;

      const url = await uploadFile(file, { type: 'image' });
      if (!url) {
        showToast('프로필 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
        return undefined;
      }
      return url;
    },
    [uploadFile, showToast]
  );

  const uploadGalleryImages = useCallback(
    async (files: File[]): Promise<string[]> => {
      if (files.length === 0) return [];

      const uploadedUrls: string[] = [];
      for (const file of files) {
        const url = await uploadFile(file, { type: 'image' });
        if (!url) {
          showToast('갤러리 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          return uploadedUrls; // 실패 시 지금까지 업로드된 것만 반환
        }
        uploadedUrls.push(url);
      }
      return uploadedUrls;
    },
    [uploadFile, showToast]
  );

  return {
    uploadMainThumbnail,
    uploadGalleryImages,
    isUploading,
  };
};

