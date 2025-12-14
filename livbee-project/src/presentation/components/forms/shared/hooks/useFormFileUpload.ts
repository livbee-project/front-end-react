import { useCallback } from 'react';
import { useCloudinaryUpload } from '@/presentation/hooks/common/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';

interface UseFormFileUploadReturn {
  uploadFile: (file: File | null, errorMessage: string) => Promise<string | undefined>;
  isUploading: boolean;
}

/**
 * 폼에서 파일 업로드를 처리하는 공통 훅
 */
export const useFormFileUpload = (): UseFormFileUploadReturn => {
  const { uploadFile: cloudinaryUpload, isUploading } = useCloudinaryUpload();
  const { showToast } = useToast();

  const uploadFile = useCallback(
    async (file: File | null, errorMessage: string): Promise<string | undefined> => {
      if (!file) return undefined;

      const url = await cloudinaryUpload(file, { type: 'raw' });
      if (!url) {
        showToast(errorMessage, undefined, 'error');
        return undefined;
      }
      return url;
    },
    [cloudinaryUpload, showToast]
  );

  return {
    uploadFile,
    isUploading,
  };
};

