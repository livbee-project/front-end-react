import { useCallback, useState, useEffect } from 'react';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useFormState } from '@/presentation/hooks/useFormState';
import { useFormUpload } from '@/presentation/hooks/useFormUpload';
import type { PortfolioFormData, PortfolioToggleState } from './types';
import { clearImageUrls, getStoredImageUrls, saveImageUrls } from './utils/portfolioImageStorage';
import { validatePortfolioForm } from './utils/portfolioValidation';
import { buildPortfolioRequest } from './utils/portfolioRequestBuilder';
import { useFormImageSync } from '@/presentation/components/forms/shared/hooks/useFormImageSync';
import { useFormSubmit } from '@/presentation/components/forms/shared/hooks/useFormSubmit';

const FORM_STORAGE_KEY = 'portfolio-register-form';
const TOGGLE_STORAGE_KEY = 'portfolio-register-toggles';

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
  const { showToast } = useToast();
  const portfolioRepository = useRepository(PortfolioRepository);

  const { formData, updateField, updateArrayField, clearStorage: clearFormStorage } = useFormState<PortfolioFormData>(INITIAL_FORM_DATA, FORM_STORAGE_KEY);
  const {
    formData: toggles,
    updateField: updateToggleField,
    updateArrayField: updateToggleArrayField,
    clearStorage: clearToggleStorage,
  } = useFormState<PortfolioToggleState>(INITIAL_TOGGLE_STATE, TOGGLE_STORAGE_KEY);

  const storedImages = getStoredImageUrls();

  const {
    profileFile: mainThumbnailFile,
    profileUrl: mainThumbnailUrl,
    galleryFiles: galleryImageFiles,
    galleryUrls: galleryImageUrls,
    selectProfileImage,
    selectGalleryImage,
    removeGalleryImage,
  } = useFormUpload({ maxGalleryImages: 9 });

  const { mainThumbnailUrlState, galleryImageUrlsState } = useFormImageSync({
    initialMainThumbnailUrl: mainThumbnailUrl || null,
    galleryImageUrls,
    storedMainThumbnail: storedImages.mainThumbnail,
    storedGallery: storedImages.gallery,
  });

  const [resumeFileUrl, setResumeFileUrl] = useState(storedImages.resume || null);
  const [portfolioFileUrl, setPortfolioFileUrl] = useState(storedImages.portfolio || null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  useEffect(() => {
    saveImageUrls({
      mainThumbnail: mainThumbnailUrlState,
      gallery: galleryImageUrlsState,
      resume: resumeFileUrl,
      portfolio: portfolioFileUrl,
    });
  }, [galleryImageUrlsState, mainThumbnailUrlState, portfolioFileUrl, resumeFileUrl]);

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

  const handleGalleryImageSelect = useCallback(
    (file: File) => {
      const added = selectGalleryImage(file);
      if (!added) {
        showToast('갤러리 이미지는 최대 9개까지 업로드 가능합니다.', undefined, 'error');
      }
    },
    [selectGalleryImage, showToast]
  );

  const handleGalleryImageRemove = useCallback(
    (index: number) => {
      removeGalleryImage(index);
    },
    [removeGalleryImage]
  );

  const handlePortfolioFileAdd = useCallback((file: File) => {
    if (file.type.startsWith('video')) {
      setPortfolioFile(file);
      setPortfolioFileUrl(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    } else {
      setResumeFile(file);
      setResumeFileUrl(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
    }
  }, []);

  const handleResumeFileRemove = useCallback(() => {
    setResumeFile(null);
    setResumeFileUrl('');
  }, []);

  const handlePortfolioFileRemove = useCallback(() => {
    setPortfolioFile(null);
    setPortfolioFileUrl('');
  }, []);

  const { handleSubmit, isSubmitting, isUploading: isImageUploading } = useFormSubmit({
    formData,
    toggles,
    mainThumbnailFile,
    galleryImageFiles,
    portfolioFile,
    resumeFile,
    validateForm: validatePortfolioForm,
    buildRequest: buildPortfolioRequest,
    createEntity: (request) => portfolioRepository.createPortfolio(request as Parameters<typeof portfolioRepository.createPortfolio>[0]),
    clearStorage: clearFormStorage,
    clearToggleStorage: clearToggleStorage,
    clearImageUrls: clearImageUrls,
    successMessage: '포트폴리오가 등록되었습니다.',
    successNavigatePath: '/portfolios',
    portfolioFileErrorMessage: '포트폴리오 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.',
    resumeFileErrorMessage: '이력서 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.',
  });

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
    mainThumbnailUrl: mainThumbnailUrlState || mainThumbnailUrl,
    galleryImageUrls: galleryImageUrlsState.length > 0 ? galleryImageUrlsState : galleryImageUrls,
    resumeFileUrl,
    portfolioFileUrl,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleToggleChange,
    handleProfileImageSelect: selectProfileImage,
    handleGalleryImageSelect,
    handleGalleryImageRemove,
    handlePortfolioFileAdd,
    handleResumeFileRemove,
    handlePortfolioFileRemove,
    handleSubmitForm,
  };
};

