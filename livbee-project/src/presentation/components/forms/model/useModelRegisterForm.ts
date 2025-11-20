import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/useFormState';
import { useFormUpload } from '@/presentation/hooks/useFormUpload';
import type { CreateModelRequest } from '@/domain/entities/Model';
import type { ModelFormData, ModelToggleState } from './types';

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

  const { formData, updateField, updateArrayField } = useFormState<ModelFormData>(INITIAL_FORM_DATA);
  const {
    formData: toggles,
    updateField: updateToggleField,
    updateArrayField: updateToggleArrayField,
  } = useFormState<ModelToggleState>(INITIAL_TOGGLE_STATE);

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

  const [portfolioFileUrl, setPortfolioFileUrl] = useState('');

  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

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

  const parseNumber = (value: string): number | undefined => {
    const num = parseFloat(value.trim());
    return Number.isNaN(num) ? undefined : num;
  };

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);

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
    showToast,
    uploadFile,
  ]);

  return {
    formData,
    toggles,
    mainThumbnailUrl,
    galleryImageUrls,
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

