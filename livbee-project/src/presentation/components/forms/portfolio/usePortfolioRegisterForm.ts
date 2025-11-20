import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useFormState } from '@/presentation/hooks/useFormState';
import { useFormUpload } from '@/presentation/hooks/useFormUpload';
import type { CreatePortfolioRequest } from '@/domain/entities/Portfolio';
import type { PortfolioFormData, PortfolioToggleState } from './types';

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

  const { formData, updateField, updateArrayField } = useFormState<PortfolioFormData>(INITIAL_FORM_DATA);
  const {
    formData: toggles,
    updateField: updateToggleField,
    updateArrayField: updateToggleArrayField,
  } = useFormState<PortfolioToggleState>(INITIAL_TOGGLE_STATE);

  const {
    profileFile: mainThumbnailFile,
    profileUrl: mainThumbnailUrl,
    galleryFiles: galleryImageFiles,
    galleryUrls: galleryImageUrls,
    selectProfileImage,
    selectGalleryImage,
    removeGalleryImage,
  } = useFormUpload({ maxGalleryImages: 9 });

  const [resumeFileUrl, setResumeFileUrl] = useState('');
  const [portfolioFileUrl, setPortfolioFileUrl] = useState('');

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const recentLives = formData.recentLiveLink.trim()
        ? [
            {
              url: formData.recentLiveLink.trim(),
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
    mainThumbnailUrl,
    galleryImageUrls,
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

