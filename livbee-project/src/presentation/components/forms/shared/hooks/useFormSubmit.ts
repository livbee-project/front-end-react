import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormImageUpload } from './useFormImageUpload';
import { useFormFileUpload } from './useFormFileUpload';

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface UseFormSubmitOptions<TFormData, TToggleState> {
  formData: TFormData;
  toggles: TToggleState;
  mainThumbnailFile: File | null;
  galleryImageFiles: File[];
  portfolioFile?: File | null;
  resumeFile?: File | null;
  validateForm: (formData: TFormData, toggles: TToggleState) => ValidationResult;
  buildRequest: (
    formData: TFormData,
    mainThumbnailUrl: string | undefined,
    galleryUrls: string[],
    attachedFileUrl: string | undefined
  ) => unknown;
  createEntity: (request: unknown) => Promise<{ ok: boolean }>;
  clearStorage: () => void;
  clearToggleStorage: () => void;
  clearImageUrls: () => void;
  successMessage: string;
  successNavigatePath: string;
  portfolioFileErrorMessage?: string;
  resumeFileErrorMessage?: string;
}

/**
 * 폼 제출 로직을 처리하는 공통 훅
 */
export const useFormSubmit = <TFormData, TToggleState>({
  formData,
  toggles,
  mainThumbnailFile,
  galleryImageFiles,
  portfolioFile,
  resumeFile,
  validateForm,
  buildRequest,
  createEntity,
  clearStorage,
  clearToggleStorage,
  clearImageUrls,
  successMessage,
  successNavigatePath,
  portfolioFileErrorMessage = '포트폴리오 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.',
  resumeFileErrorMessage = '이력서 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.',
}: UseFormSubmitOptions<TFormData, TToggleState>) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadMainThumbnail, uploadGalleryImages, isUploading: isImageUploading } = useFormImageUpload();
  const { uploadFile: uploadRawFile, isUploading: isFileUploading } = useFormFileUpload();

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    // 유효성 검사
    const validation = validateForm(formData, toggles);
    if (!validation.isValid) {
      showToast(validation.errorMessage || '입력 정보를 확인해주세요.', undefined, 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      // 이미지 업로드
      const uploadedMainThumbnailUrl = await uploadMainThumbnail(mainThumbnailFile);
      if (mainThumbnailFile && !uploadedMainThumbnailUrl) {
        setIsSubmitting(false);
        return;
      }

      const uploadedGalleryUrls = await uploadGalleryImages(galleryImageFiles);
      if (galleryImageFiles.length > 0 && uploadedGalleryUrls.length !== galleryImageFiles.length) {
        setIsSubmitting(false);
        return;
      }

      // 파일 업로드 (portfolio 또는 resume)
      let uploadedAttachedFileUrl: string | undefined;
      if (resumeFile) {
        uploadedAttachedFileUrl = await uploadRawFile(resumeFile, resumeFileErrorMessage);
        if (!uploadedAttachedFileUrl) {
          setIsSubmitting(false);
          return;
        }
      } else if (portfolioFile) {
        uploadedAttachedFileUrl = await uploadRawFile(portfolioFile, portfolioFileErrorMessage);
        if (!uploadedAttachedFileUrl) {
          setIsSubmitting(false);
          return;
        }
      }

      // 요청 생성 및 제출
      const request = buildRequest(formData, uploadedMainThumbnailUrl, uploadedGalleryUrls, uploadedAttachedFileUrl);
      const response = await createEntity(request);

      if (response.ok) {
        // 제출 성공 시 sessionStorage 삭제
        clearStorage();
        clearToggleStorage();
        clearImageUrls();
        showToast(successMessage);
        navigate(successNavigatePath, { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '등록에 실패했습니다.';
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData,
    toggles,
    mainThumbnailFile,
    galleryImageFiles,
    portfolioFile,
    resumeFile,
    validateForm,
    buildRequest,
    createEntity,
    clearStorage,
    clearToggleStorage,
    clearImageUrls,
    successMessage,
    successNavigatePath,
    portfolioFileErrorMessage,
    resumeFileErrorMessage,
    uploadMainThumbnail,
    uploadGalleryImages,
    uploadRawFile,
    showToast,
    navigate,
  ]);

  return {
    handleSubmit,
    isSubmitting,
    isUploading: isImageUploading || isFileUploading,
  };
};

