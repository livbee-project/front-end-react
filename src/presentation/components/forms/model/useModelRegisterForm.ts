import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/common/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/form/useFormState';
import type { ModelFormData, ModelToggleState } from '@/presentation/components/forms/model/types';
import { clearImageUrls } from '@/presentation/components/forms/model/utils/modelImageStorage';
import { validateModelForm } from '@/presentation/components/forms/model/utils/modelValidation';
import { buildModelRequest } from '@/presentation/components/forms/model/utils/modelRequestBuilder';
import { useModelImageManagement } from '@/presentation/components/forms/model/hooks/useModelImageManagement';
import { useModelFormStorage } from '@/presentation/components/forms/model/hooks/useModelFormStorage';
import { formatFileSize } from '@/shared/constants/fileUpload';
import { error as logError } from '@/shared/utils/logger';

const INITIAL_FORM_DATA: ModelFormData = {
  name: '',
  registrationType: 'model',
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 자동 저장 비활성화: 이미지 선택 시점에만 수동으로 저장
  const { formData, updateField, updateArrayField, setFormData } = useFormState<ModelFormData>(INITIAL_FORM_DATA, undefined);
  const {
    formData: toggles,
    updateField: updateToggleField,
    updateArrayField: updateToggleArrayField,
    setFormData: setToggles,
  } = useFormState<ModelToggleState>(INITIAL_TOGGLE_STATE, undefined);

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
    handleGalleryImageRemove: baseHandleGalleryImageRemove,
    clearImageStates,
  } = useModelImageManagement({
    onImageRestored: () => {
      // 이미지 복원 후 폼 데이터 복원 트리거
    },
  });

  // sessionStorage 관리 훅
  const { clearStorage, saveFormData } = useModelFormStorage({
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

  const [portfolioFileUrl, setPortfolioFileUrl] = useState<string | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

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

  // registrationType이 비어있으면 기본값 'model'로 설정
  useEffect(() => {
    if (!formData.registrationType || formData.registrationType.trim() === '') {
      updateField('registrationType', 'model');
    }
  }, [formData.registrationType, updateField]);

  const handleGalleryImageSelectWithToast = useCallback(
    (file: File) => {
      const added = handleGalleryImageSelect(file);
      if (!added) {
        showToast(`갤러리 이미지는 최대 ${MAX_GALLERY_IMAGES}개까지 업로드 가능합니다.`, undefined, 'error');
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

  const handleGalleryImageRemove = useCallback(
    (index: number) => {
      baseHandleGalleryImageRemove(index);
      saveFormData();
    },
    [baseHandleGalleryImageRemove, saveFormData]
  );

  const handlePortfolioFileSelect = useCallback((file: File) => {
    setPortfolioFile(file);
    setPortfolioFileUrl(`${file.name} (${formatFileSize(file.size)})`);
  }, []);

  const handlePortfolioFileRemove = useCallback(() => {
    setPortfolioFile(null);
    setPortfolioFileUrl('');
  }, []);

  const handleFileError = useCallback(
    (message: string) => {
      showToast(message, undefined, 'error');
    },
    [showToast]
  );

  const handleSubmit = useCallback(async () => {
    // 유효성 검사
    const validation = validateModelForm(formData, toggles);
    if (!validation.isValid) {
      showToast(validation.errorMessage || '입력 정보를 확인해주세요.', undefined, 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedMainThumbnailUrl: string | undefined;
      const uploadedGalleryUrls: string[] = [];
      let uploadedPortfolioFileUrl: string | undefined;

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
        clearStorage();
        clearImageUrls();
        showToast('모델이 등록되었습니다.', undefined, 'success');
        navigate(-1);
      } else {
        const errorMessage = '모델 등록에 실패했습니다.';
        showToast(errorMessage, undefined, 'error');
        setIsSubmitting(false);
      }
    } catch (error) {
      logError('useModelRegisterForm', '모델 등록 실패', error);
      const errorMessage = error instanceof Error ? error.message : '모델 등록 중 오류가 발생했습니다.';
      showToast(errorMessage, undefined, 'error');
      setIsSubmitting(false);
    }
  }, [
    formData,
    toggles,
    mainThumbnailFile,
    galleryImageFiles,
    portfolioFile,
    getMainThumbnailFile,
    getGalleryImageFiles,
    uploadFile,
    modelRepository,
    clearStorage,
    navigate,
    showToast,
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
    handleProfileImageSelect: handleMainThumbnailSelect,
    handleProfileImageRemove: clearImageStates,
    handleGalleryImageSelect: handleGalleryImageSelectWithToast,
    handleGalleryImageReplace,
    handleGalleryImageRemove,
    handlePortfolioFileSelect,
    handlePortfolioFileRemove,
    handleFileError,
    handleSubmit,
  };
};

