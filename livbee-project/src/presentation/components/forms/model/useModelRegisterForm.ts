import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/useFormState';
import { useFormUpload } from '@/presentation/hooks/useFormUpload';
import type { ModelFormData, ModelToggleState } from './types';
import { clearImageUrls, getStoredImageUrls, saveImageUrls } from './utils/modelImageStorage';
import { validateModelForm } from './utils/modelValidation';
import { buildModelRequest } from './utils/modelRequestBuilder';
import { useFormImageSync } from '@/presentation/components/forms/shared/hooks/useFormImageSync';

const FORM_STORAGE_KEY = 'model-register-form';
const TOGGLE_STORAGE_KEY = 'model-register-toggles';

const INITIAL_FORM_DATA: ModelFormData = {
  name: '',
  registrationType: '',
  oneLineIntro: '',
  detailedIntro: '',
  websites: [
    { related: '', content: '' },
    { related: '', content: '' },
    { related: '', content: '' },
  ],
  contact: '',
  openChat: '',
  tags: [
    { label: '키', value: '' },
    { label: '몸무게', value: '' },
    { label: '사이즈', value: '' },
    { label: '경력', value: '' },
    { label: '나이', value: '' },
  ],
};

const INITIAL_TOGGLE_STATE: ModelToggleState = {
  websites: [true, true, true],
  contact: true,
  openChat: true,
  tags: [true, true, true, true, true],
};

export const MAX_GALLERY_IMAGES = 5;

export const useModelRegisterForm = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();
  const modelRepository = useRepository(ModelRepository);

  const { formData, updateField, updateArrayField, clearStorage: clearFormStorage } = useFormState<ModelFormData>(INITIAL_FORM_DATA, FORM_STORAGE_KEY);
  const {
    formData: toggles,
    updateField: updateToggleField,
    updateArrayField: updateToggleArrayField,
    clearStorage: clearToggleStorage,
  } = useFormState<ModelToggleState>(INITIAL_TOGGLE_STATE, TOGGLE_STORAGE_KEY);

  const storedImages = getStoredImageUrls();

  const {
    profileFile: mainThumbnailFile,
    profileUrl: mainThumbnailUrl,
    galleryFiles: galleryImageFiles,
    galleryUrls: galleryImageUrls,
    selectProfileImage,
    removeProfileImage,
    selectGalleryImage,
    removeGalleryImage,
  } = useFormUpload({ maxGalleryImages: MAX_GALLERY_IMAGES });

  const { mainThumbnailUrlState, galleryImageUrlsState } = useFormImageSync({
    initialMainThumbnailUrl: mainThumbnailUrl || null,
    galleryImageUrls,
    storedMainThumbnail: storedImages.mainThumbnail,
    storedGallery: storedImages.gallery,
  });

  const [portfolioFileUrl, setPortfolioFileUrl] = useState(storedImages.portfolio || null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  useEffect(() => {
    saveImageUrls({
      mainThumbnail: mainThumbnailUrlState,
      gallery: galleryImageUrlsState,
      portfolio: portfolioFileUrl,
    });
  }, [galleryImageUrlsState, mainThumbnailUrlState, portfolioFileUrl]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof ModelFormData, value: string, index?: number, subField?: keyof (ModelFormData['websites'][number]) ) => {
      if (index !== undefined) {
        if (field === 'websites') {
          updateArrayField(field, index, value, subField);
          return;
        }
        if (field === 'tags') {
          updateArrayField(field, index, value);
          return;
        }
      }

      updateField(field, value);
    },
    [updateArrayField, updateField]
  );

  const handleToggleChange = useCallback(
    (field: keyof ModelToggleState, index?: number) => {
      if (index !== undefined && Array.isArray(toggles[field])) {
        const currentArray = toggles[field] as boolean[];
        updateToggleArrayField(field, index, !currentArray[index]);
        return;
      }
      const currentValue = toggles[field];
      if (typeof currentValue === 'boolean') {
        updateToggleField(field, (!currentValue) as ModelToggleState[typeof field]);
      }
    },
    [toggles, updateToggleArrayField, updateToggleField]
  );

  const handleGalleryImageSelect = useCallback(
    (file: File) => {
      const added = selectGalleryImage(file);
      if (!added) {
        showToast(`갤러리 이미지는 최대 ${MAX_GALLERY_IMAGES}개까지 업로드 가능합니다.`, undefined, 'error');
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

  const handlePortfolioFileSelect = useCallback((file: File) => {
    setPortfolioFile(file);
    setPortfolioFileUrl(`${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
  }, []);

  const handlePortfolioFileRemove = useCallback(() => {
    setPortfolioFile(null);
    setPortfolioFileUrl('');
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    // 유효성 검사
    const validation = validateModelForm(formData, toggles);
    if (!validation.isValid) {
      showToast(validation.errorMessage || '입력 정보를 확인해주세요.', undefined, 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      let uploadedMainThumbnailUrl: string | undefined;
      const uploadedGalleryUrls: string[] = [];
      let uploadedPortfolioFileUrl: string | undefined;

      if (mainThumbnailFile) {
        const url = await uploadFile(mainThumbnailFile, { type: 'image' });
        if (!url) {
          showToast('프로필 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedMainThumbnailUrl = url;
      }

      for (const file of galleryImageFiles) {
        const url = await uploadFile(file, { type: 'image' });
        if (!url) {
          showToast('갤러리 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedGalleryUrls.push(url);
      }

      if (portfolioFile) {
        const url = await uploadFile(portfolioFile, { type: 'raw' });
        if (!url) {
          showToast('포트폴리오 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedPortfolioFileUrl = url;
      }

      const request = buildModelRequest(
        formData,
        uploadedMainThumbnailUrl,
        uploadedGalleryUrls,
        uploadedPortfolioFileUrl
      );

      const response = await modelRepository.createModel(request);

      if (response.ok) {
        // 제출 성공 시 sessionStorage 삭제
        clearFormStorage();
        clearToggleStorage();
        clearImageUrls();
        showToast('모델이 등록되었습니다.');
        navigate('/models', { replace: true });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '모델 등록에 실패했습니다.';
      showToast(message, undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    clearFormStorage,
    clearToggleStorage,
    formData,
    galleryImageFiles,
    mainThumbnailFile,
    modelRepository,
    navigate,
    portfolioFile,
    toggles,
    showToast,
    uploadFile,
  ]);

  return {
    formData,
    toggles,
    mainThumbnailUrl: mainThumbnailUrlState || mainThumbnailUrl,
    galleryImageUrls: galleryImageUrlsState.length > 0 ? galleryImageUrlsState : galleryImageUrls,
    portfolioFileUrl,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleToggleChange,
    handleProfileImageSelect: selectProfileImage,
    handleProfileImageRemove: removeProfileImage,
    handleGalleryImageSelect,
    handleGalleryImageRemove,
    handlePortfolioFileSelect,
    handlePortfolioFileRemove,
    handleSubmit,
  };
};

