import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useFormState } from '@/presentation/hooks/useFormState';
import { useFormUpload } from '@/presentation/hooks/useFormUpload';
import type { CreatePortfolioRequest } from '@/domain/entities/Portfolio';
import { isValidPhoneNumber, isValidUrl } from '@/shared/utils/validation';
import type { PortfolioFormData, PortfolioToggleState } from './types';

const FORM_STORAGE_KEY = 'portfolio-register-form';
const TOGGLE_STORAGE_KEY = 'portfolio-register-toggles';
const IMAGE_STORAGE_KEY = 'portfolio-register-images';

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

  const { formData, updateField, updateArrayField, clearStorage: clearFormStorage } = useFormState<PortfolioFormData>(INITIAL_FORM_DATA, FORM_STORAGE_KEY);
  const {
    formData: toggles,
    updateField: updateToggleField,
    updateArrayField: updateToggleArrayField,
    clearStorage: clearToggleStorage,
  } = useFormState<PortfolioToggleState>(INITIAL_TOGGLE_STATE, TOGGLE_STORAGE_KEY);

  // 이미지 URL 복원
  const getStoredImageUrls = (): { mainThumbnail: string; gallery: string[]; resume: string; portfolio: string } => {
    if (typeof window === 'undefined') {
      return { mainThumbnail: '', gallery: [], resume: '', portfolio: '' };
    }
    try {
      const stored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to restore image URLs from sessionStorage:', error);
    }
    return { mainThumbnail: '', gallery: [], resume: '', portfolio: '' };
  };

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

  // 복원된 이미지 URL로 초기화
  const [mainThumbnailUrlState, setMainThumbnailUrlState] = useState(storedImages.mainThumbnail || mainThumbnailUrl);
  const [galleryImageUrlsState, setGalleryImageUrlsState] = useState<string[]>(storedImages.gallery.length > 0 ? storedImages.gallery : galleryImageUrls);
  const [resumeFileUrl, setResumeFileUrl] = useState(storedImages.resume);
  const [portfolioFileUrl, setPortfolioFileUrl] = useState(storedImages.portfolio);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
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
      sessionStorage.setItem(
        IMAGE_STORAGE_KEY,
        JSON.stringify({
          mainThumbnail: mainThumbnailUrlState,
          gallery: galleryImageUrlsState,
          resume: resumeFileUrl,
          portfolio: portfolioFileUrl,
        })
      );
    } catch (error) {
      console.warn('Failed to save image URLs to sessionStorage:', error);
    }
  }, [mainThumbnailUrlState, galleryImageUrlsState, resumeFileUrl, portfolioFileUrl]);

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

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

    const trimmedContact = formData.contact.trim();
    if (trimmedContact && !isValidPhoneNumber(trimmedContact)) {
      showToast('연락처 형식이 올바르지 않습니다.', undefined, 'error');
      setIsSubmitting(false);
      return;
    }

    const trimmedRecentLive = formData.recentLiveLink.trim();
    if (trimmedRecentLive && !isValidUrl(trimmedRecentLive)) {
      showToast('최근 라이브 링크가 올바르지 않습니다.', undefined, 'error');
      setIsSubmitting(false);
      return;
    }

    const hasInvalidWebsite = formData.websites.some((url, index) => {
      const trimmed = url.trim();
      if (!trimmed || !toggles.websites[index]) {
        return false;
      }
      return !isValidUrl(trimmed);
    });

    if (hasInvalidWebsite) {
      showToast('SNS / 사이트 링크를 올바르게 입력해주세요.', undefined, 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      let uploadedMainThumbnailUrl: string | undefined;
      const uploadedGalleryUrls: string[] = [];
      let uploadedAttachedFileUrl: string | undefined;

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

      if (resumeFile) {
        const url = await uploadFile(resumeFile, { type: 'raw' });
        if (!url) {
          showToast('이력서 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedAttachedFileUrl = url;
      } else if (portfolioFile) {
        const url = await uploadFile(portfolioFile, { type: 'raw' });
        if (!url) {
          showToast('포트폴리오 파일 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedAttachedFileUrl = url;
      }

      const websiteUrl = formData.websites[0]?.trim() || undefined;
      const instagramUrl = formData.websites[1]?.trim() || undefined;
      const youtubeUrl = formData.websites[2]?.trim() || undefined;

      const recentLives = trimmedRecentLive
        ? [
            {
              url: trimmedRecentLive,
              title: undefined,
              date: undefined,
            },
          ]
        : undefined;

      const request: CreatePortfolioRequest = {
        nickname: formData.name.trim() || undefined,
        oneLineIntro: formData.oneLineIntro.trim() || undefined,
        detailedIntro: formData.detailedIntro.trim() || undefined,
        mainThumbnailUrl: uploadedMainThumbnailUrl,
        subThumbnailUrls: uploadedGalleryUrls.length > 0 ? uploadedGalleryUrls : undefined,
        websiteUrl,
        instagramUrl,
        youtubeUrl,
        recentLives,
        attachedFileUrl: uploadedAttachedFileUrl,
        status: 'published',
        publicScope: '전체공개',
        isAgePublic: true,
        isSizingPublic: true,
        isReceivingOffers: true,
      };

      const response = await portfolioRepository.createPortfolio(request);

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
        showToast('포트폴리오가 등록되었습니다.');
        navigate('/portfolios', { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '포트폴리오 등록에 실패했습니다.';
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData,
    galleryImageFiles,
    mainThumbnailFile,
    navigate,
    portfolioFile,
    portfolioRepository,
    resumeFile,
    toggles,
    showToast,
    uploadFile,
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

