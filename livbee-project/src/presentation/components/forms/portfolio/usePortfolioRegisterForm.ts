import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/common/useCloudinaryUpload';
import { useFormState } from '@/presentation/hooks/form/useFormState';
import type { PortfolioFormData, PortfolioToggleState } from '@/presentation/components/forms/portfolio/types';
import { clearImageUrls } from '@/presentation/components/forms/portfolio/utils/portfolioImageStorage';
import { validatePortfolioForm } from '@/presentation/components/forms/portfolio/utils/portfolioValidation';
import { buildPortfolioRequest } from '@/presentation/components/forms/portfolio/utils/portfolioRequestBuilder';
import { usePortfolioImageManagement } from '@/presentation/components/forms/portfolio/hooks/usePortfolioImageManagement';
import { usePortfolioFormStorage } from '@/presentation/components/forms/portfolio/hooks/usePortfolioFormStorage';
import { formatFileSize } from '@/shared/constants/fileUpload';

const INITIAL_FORM_DATA: PortfolioFormData = {
  registrationType: '',
  name: '',
  oneLineIntro: '',
  detailedIntro: '',
  websites: ['', '', ''],
  recentLiveLink: '',
  contact: '',
  openChat: '',
  tags: ['', '', '', '', ''],
};

const INITIAL_TOGGLE_STATE: PortfolioToggleState = {
  websites: [true, true, true],
  contact: true,
  openChat: true,
  tags: [true, true, true, true, true],
};

export const usePortfolioRegisterForm = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();
  const portfolioRepository = useRepository(PortfolioRepository);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 자동 저장 비활성화: 이미지 선택 시점에만 수동으로 저장
  const { formData, updateField, updateArrayField, setFormData } = useFormState<PortfolioFormData>(INITIAL_FORM_DATA, undefined);
  const {
    formData: toggles,
    updateField: updateToggleField,
    updateArrayField: updateToggleArrayField,
    setFormData: setToggles,
  } = useFormState<PortfolioToggleState>(INITIAL_TOGGLE_STATE, undefined);

  // 이미지 관리 훅
  const {
    mainThumbnailUrl,
    galleryImageUrls,
    mainThumbnailFile,
    galleryImageFiles,
    getMainThumbnailFile,
    getGalleryImageFiles,
    hasStoredImages,
    handleMainThumbnailSelect: baseHandleMainThumbnailSelect,
    handleGalleryImageSelect: baseHandleGalleryImageSelect,
    handleGalleryImageReplace: baseHandleGalleryImageReplace,
    handleGalleryImageRemove,
  } = usePortfolioImageManagement({
    onImageRestored: () => {
      // 이미지 복원 후 폼 데이터 복원 트리거
    },
  });

  // sessionStorage 관리 훅
  const { clearStorage, saveFormData } = usePortfolioFormStorage({
    formData,
    setFormData,
    toggles,
    setToggles,
    hasStoredImages,
    mainThumbnailUrl,
    galleryImageUrls,
    onImageRestored: () => {
      // 이미지 복원 후 추가 처리 필요 시 여기서 수행
    },
  });

  // 이미지 선택 핸들러 (폼 데이터 저장 포함)
  const handleMainThumbnailSelect = useCallback(
    (file: File) => {
      baseHandleMainThumbnailSelect(file);
      saveFormData();
    },
    [baseHandleMainThumbnailSelect, saveFormData]
  );

  const handleGalleryImageSelect = useCallback(
    (file: File) => {
      const added = baseHandleGalleryImageSelect(file);
      if (added) {
        saveFormData();
      }
      return added;
    },
    [baseHandleGalleryImageSelect, saveFormData]
  );

  const [resumeFileUrl, setResumeFileUrl] = useState<string | null>(null);
  const [portfolioFileUrl, setPortfolioFileUrl] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const handleInputChange = useCallback(
    (field: keyof PortfolioFormData, value: string, index?: number) => {
      if (index !== undefined && (field === 'websites' || field === 'tags')) {
        updateArrayField(field, index, value);
        return;
      }

      updateField(field, value);
    },
    [updateArrayField, updateField]
  );

  const handleToggleChange = useCallback(
    (field: keyof PortfolioToggleState, index?: number) => {
      if (index !== undefined && Array.isArray(toggles[field])) {
        const currentValue = (toggles[field] as boolean[])[index];
        updateToggleArrayField(field, index, !currentValue);
        return;
      }
      const currentValue = toggles[field];
      if (typeof currentValue === 'boolean') {
        updateToggleField(field, (!currentValue) as PortfolioToggleState[typeof field]);
      }
    },
    [toggles, updateToggleArrayField, updateToggleField]
  );

  const handleGalleryImageSelectWithToast = useCallback(
    (file: File) => {
      const added = handleGalleryImageSelect(file);
      if (!added) {
        showToast('갤러리 이미지는 최대 9개까지 업로드 가능합니다.', undefined, 'error');
      }
    },
    [handleGalleryImageSelect, showToast]
  );

  const handleGalleryImageReplace = useCallback(
    (index: number, file: File) => {
      baseHandleGalleryImageReplace(index, file);
      saveFormData();
    },
    [baseHandleGalleryImageReplace, saveFormData]
  );

  const handlePortfolioFileAdd = useCallback((file: File) => {
    if (file.type.startsWith('video')) {
      setPortfolioFile(file);
      setPortfolioFileUrl(`${file.name} (${formatFileSize(file.size)})`);
    } else {
      setResumeFile(file);
      setResumeFileUrl(`${file.name} (${formatFileSize(file.size)})`);
    }
  }, []);

  const handleFileError = useCallback(
    (message: string) => {
      showToast(message, undefined, 'error');
    },
    [showToast]
  );

  const handleResumeFileRemove = useCallback(() => {
    setResumeFile(null);
    setResumeFileUrl('');
  }, []);

  const handlePortfolioFileRemove = useCallback(() => {
    setPortfolioFile(null);
    setPortfolioFileUrl('');
  }, []);

  const handleSubmit = useCallback(async () => {
    // 유효성 검사
    const validation = validatePortfolioForm(formData, toggles);
    if (!validation.isValid) {
      showToast(validation.errorMessage || '입력 정보를 확인해주세요.', undefined, 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedMainThumbnailUrl: string | undefined;
      let uploadedGalleryUrls: string[] = [];
      let uploadedPortfolioFileUrl: string | undefined;
      let uploadedResumeFileUrl: string | undefined;

      // ref에서도 파일 확인 (상태가 null일 수 있으므로)
      const finalMainThumbnailFile = mainThumbnailFile || await getMainThumbnailFile();
      const finalGalleryImageFiles = galleryImageFiles.length > 0 ? galleryImageFiles : await getGalleryImageFiles();

      if (finalMainThumbnailFile) {
        const url = await uploadFile(finalMainThumbnailFile, {
          type: 'image',
          category: 'portfolio',
          publicId: 'main-thumbnail',
        });
        if (!url) {
          showToast('프로필 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedMainThumbnailUrl = url;
      }

      // 갤러리 이미지 업로드
      for (const file of finalGalleryImageFiles) {
        const url = await uploadFile(file, {
          type: 'image',
          category: 'portfolio',
        });
        if (!url) {
          showToast('갤러리 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedGalleryUrls.push(url);
      }

      // 파일 업로드
      if (portfolioFile) {
        const url = await uploadFile(portfolioFile, { type: 'raw' });
        if (!url) {
          showToast('포트폴리오 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedPortfolioFileUrl = url;
      } else if (resumeFile) {
        const url = await uploadFile(resumeFile, { type: 'raw' });
        if (!url) {
          showToast('이력서 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedResumeFileUrl = url;
      }

      const request = buildPortfolioRequest(
        formData,
        uploadedMainThumbnailUrl,
        uploadedGalleryUrls,
        uploadedResumeFileUrl || uploadedPortfolioFileUrl
      );

      console.log('[usePortfolioRegisterForm] 📤 포트폴리오 등록 요청 데이터:', JSON.stringify(request, null, 2));

      const response = await portfolioRepository.createPortfolio(request);

      if (response.ok) {
        // 제출 성공 시 sessionStorage 삭제
        clearStorage();
        clearImageUrls();
        showToast('포트폴리오가 등록되었습니다.', undefined, 'success');
        navigate('/portfolios', { replace: true });
      } else {
        const errorMessage = '포트폴리오 등록에 실패했습니다.';
        showToast(errorMessage, undefined, 'error');
      }
    } catch (error) {
      console.error('포트폴리오 등록 실패:', error);
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
    getMainThumbnailFile,
    getGalleryImageFiles,
    uploadFile,
    portfolioRepository,
    clearStorage,
    clearImageUrls,
    navigate,
    showToast,
  ]);

  const handleSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!isSubmitting && !isImageUploading) {
        void handleSubmit();
      }
    },
    [handleSubmit, isImageUploading, isSubmitting]
  );

  return {
    formData,
    toggles,
    mainThumbnailUrl,
    galleryImageUrls,
    resumeFileUrl,
    portfolioFileUrl,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleToggleChange,
    handleProfileImageSelect: handleMainThumbnailSelect,
    handleGalleryImageSelect: handleGalleryImageSelectWithToast,
    handleGalleryImageReplace,
    handleGalleryImageRemove,
    handlePortfolioFileAdd,
    handleResumeFileRemove,
    handlePortfolioFileRemove,
    handleFileError,
    handleSubmitForm,
  };
};

