import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/useFormState';
import { useFormUpload } from '@/presentation/hooks/useFormUpload';
import type { CreateModelRequest } from '@/domain/entities/Model';
import type { ModelFormData, ModelToggleState } from './types';
import { isValidPhoneNumber, isValidUrl } from '@/shared/utils/validation';

const FORM_STORAGE_KEY = 'model-register-form';
const TOGGLE_STORAGE_KEY = 'model-register-toggles';
const IMAGE_STORAGE_KEY = 'model-register-images';

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

  // 이미지 URL 복원
  const getStoredImageUrls = (): { mainThumbnail: string; gallery: string[]; portfolio: string } => {
    if (typeof window === 'undefined') {
      return { mainThumbnail: '', gallery: [], portfolio: '' };
    }
    try {
      const stored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to restore image URLs from sessionStorage:', error);
    }
    return { mainThumbnail: '', gallery: [], portfolio: '' };
  };

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

  // 복원된 이미지 URL로 초기화
  const [mainThumbnailUrlState, setMainThumbnailUrlState] = useState(storedImages.mainThumbnail || mainThumbnailUrl);
  const [galleryImageUrlsState, setGalleryImageUrlsState] = useState<string[]>(storedImages.gallery.length > 0 ? storedImages.gallery : galleryImageUrls);
  const [portfolioFileUrl, setPortfolioFileUrl] = useState(storedImages.portfolio);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이미지 URL 동기화 및 저장
  useEffect(() => {
    if (mainThumbnailUrl && mainThumbnailUrl !== mainThumbnailUrlState) {
      setMainThumbnailUrlState(mainThumbnailUrl);
    }
  }, [mainThumbnailUrl]);

  useEffect(() => {
    if (galleryImageUrls.length > 0 && JSON.stringify(galleryImageUrls) !== JSON.stringify(galleryImageUrlsState)) {
      setGalleryImageUrlsState(galleryImageUrls);
    }
  }, [galleryImageUrls]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const currentStored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
      const newValue = JSON.stringify({
        mainThumbnail: mainThumbnailUrlState,
        gallery: galleryImageUrlsState,
        portfolio: portfolioFileUrl,
      });
      
      // 이전 값과 다를 때만 저장 (불필요한 저장 방지)
      if (currentStored !== newValue) {
        sessionStorage.setItem(IMAGE_STORAGE_KEY, newValue);
      }
    } catch (error) {
      console.warn('Failed to save image URLs to sessionStorage:', error);
    }
  }, [mainThumbnailUrlState, galleryImageUrlsState, portfolioFileUrl]);

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

  const parseNumber = (value: string): number | undefined => {
    const num = parseFloat(value.trim());
    return Number.isNaN(num) ? undefined : num;
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    const trimmedContact = formData.contact.trim();
    if (trimmedContact && !isValidPhoneNumber(trimmedContact)) {
      showToast('연락처 형식이 올바르지 않습니다.', undefined, 'error');
      setIsSubmitting(false);
      return;
    }

    const hasInvalidWebsite = formData.websites.some((website, index) => {
      const trimmed = website.content.trim();
      if (!trimmed || !toggles.websites[index]) {
        return false;
      }
      return !isValidUrl(trimmed);
    });

    if (hasInvalidWebsite) {
      showToast('SNS 링크를 올바르게 입력해주세요.', undefined, 'error');
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

      const websiteUrl = formData.websites[0]?.content.trim() || undefined;
      const instagramUrl = formData.websites[1]?.content.trim() || undefined;
      const youtubeUrl = formData.websites[2]?.content.trim() || undefined;

      const height = parseNumber(formData.tags[0]?.value || '');
      const weight = parseNumber(formData.tags[1]?.value || '');
      const topSize = formData.tags[2]?.value.trim() || undefined;
      const experienceYears = parseNumber(formData.tags[3]?.value || '');
      const age = parseNumber(formData.tags[4]?.value || '');

      const request: CreateModelRequest = {
        nickname: formData.name.trim() || undefined,
        oneLineIntro: formData.oneLineIntro.trim() || undefined,
        detailedIntro: formData.detailedIntro.trim() || undefined,
        mainThumbnailUrl: uploadedMainThumbnailUrl,
        subThumbnailUrls: uploadedGalleryUrls.length > 0 ? uploadedGalleryUrls : undefined,
        websiteUrl,
        instagramUrl,
        youtubeUrl,
        attachedFileUrl: uploadedPortfolioFileUrl,
        height,
        weight,
        topSize,
        experienceYears,
        age,
        status: 'published',
        publicScope: '전체공개',
        isAgePublic: true,
        isSizingPublic: true,
        isReceivingOffers: true,
      };

      const response = await modelRepository.createModel(request);

      if (response.ok) {
        // 제출 성공 시 sessionStorage 삭제
        clearFormStorage();
        clearToggleStorage();
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.removeItem(IMAGE_STORAGE_KEY);
          } catch (error) {
            console.warn('Failed to remove image URLs from sessionStorage:', error);
          }
        }
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

