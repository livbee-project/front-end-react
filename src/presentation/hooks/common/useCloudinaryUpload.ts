import { useState, useCallback, useRef } from 'react';
import { CloudinaryUploader } from '@/data/sources/cloudinary/cloudinaryUploader';
import type { UploadOptions } from '@/data/sources/cloudinary/types';
import { translateCloudinaryError } from '@/shared/utils/cloudinaryErrorTranslator';

/**
 * Cloudinary 업로드 Hook 반환 타입
 */
interface UseCloudinaryUploadReturn {
  /** 업로드 중인지 여부 */
  isUploading: boolean;
  /** 에러 메시지 */
  error: string | null;
  /** 파일 업로드 함수 */
  uploadFile: (file: File | Blob, options?: UploadOptions) => Promise<string | null>;
  /** 에러 초기화 함수 */
  clearError: () => void;
}

/**
 * Cloudinary 파일 업로드를 위한 React Hook
 * @returns 업로드 상태 및 함수
 */
export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Uploader 인스턴스를 ref로 관리하여 재사용
  const uploaderRef = useRef<CloudinaryUploader | null>(null);
  if (!uploaderRef.current) {
    uploaderRef.current = new CloudinaryUploader();
  }
  const uploader = uploaderRef.current;

  /**
   * 파일 업로드 함수
   * @param file - 업로드할 파일
   * @param options - 업로드 옵션
   * @returns 업로드된 파일의 secure_url 또는 null (실패 시)
   */
  const uploadFile = useCallback(
    async (file: File | Blob, options?: UploadOptions): Promise<string | null> => {
      setIsUploading(true);
      setError(null);

      try {
        const secureUrl = await uploader.uploadFile(file, options);
        setIsUploading(false);
        return secureUrl;
      } catch (err) {
        const rawErrorMessage = err instanceof Error ? err.message : '파일 업로드에 실패했습니다.';
        const errorMessage = translateCloudinaryError(rawErrorMessage);
        console.error('[useCloudinaryUpload] ❌ 업로드 에러 발생', {
          error: err,
          rawErrorMessage,
          errorMessage,
          errorStack: err instanceof Error ? err.stack : undefined,
          options,
        });
        setError(errorMessage);
        setIsUploading(false);
        return null;
      }
    },
    [uploader]
  );

  /**
   * 에러 초기화 함수
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isUploading,
    error,
    uploadFile,
    clearError,
  };
};

