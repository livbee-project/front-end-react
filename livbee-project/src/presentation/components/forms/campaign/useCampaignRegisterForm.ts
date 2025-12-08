import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/common/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/form/useFormState';
import type { CampaignFormData } from '@/presentation/components/forms/campaign/types';
import { clearImageUrls } from '@/presentation/components/forms/campaign/utils/campaignImageStorage';
import { validateCampaignForm } from '@/presentation/components/forms/campaign/utils/campaignValidation';
import { buildCampaignRequest } from '@/presentation/components/forms/campaign/utils/campaignRequestBuilder';
import { useCampaignFormStorage } from '@/presentation/components/forms/campaign/hooks/useCampaignFormStorage';
import { useCampaignImageManagement } from '@/presentation/components/forms/campaign/hooks/useCampaignImageManagement';

const INITIAL_FORM_DATA: CampaignFormData = {
  brandName: '',
  brandIntroduction: '',
  title: '',
  content: '',
  detailedContent: '',
  recruitmentType: 'showhost',
  category: 'food',
  location: '',
  filmingDate: '',
  deadline: '',
  startTime: '',
  endTime: '',
  productName: '',
  fee: '',
  feeNegotiable: false,
};

export const useCampaignRegisterForm = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();
  const campaignRepository = useRepository(CampaignRepository);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 자동 저장 비활성화: 이미지 선택 시점에만 수동으로 저장
  const { formData, updateField, setFormData } = useFormState<CampaignFormData>(INITIAL_FORM_DATA, undefined);

  // 이미지 관리 훅
  const {
    coverImageUrl,
    productImageUrl,
    liveCoverImageUrl,
    coverImageFile,
    productImageFile,
    liveCoverImageFile,
    hasStoredImages,
    handleImageSelect: baseHandleImageSelect,
    clearImageStates,
  } = useCampaignImageManagement({
    onImageRestored: () => {
      // 이미지 복원 후 폼 데이터 세션도 삭제
      clearStorage();
    },
  });

  // sessionStorage 관리 훅
  const { clearStorage, saveFormData } = useCampaignFormStorage({
    formData,
    setFormData,
    hasStoredImages,
    coverImageUrl,
    productImageUrl,
    liveCoverImageUrl,
    onClearImageStates: clearImageStates,
  });

  // 이미지 선택 핸들러 (폼 데이터 저장 포함)
  const handleImageSelect = useCallback(
    (file: File, type: 'cover' | 'product' | 'liveCover') => {
      baseHandleImageSelect(file, type);
      saveFormData();
    },
    [baseHandleImageSelect, saveFormData]
  );

  // 협의 가능이 체크되어 있으면 수당 필드 초기화
  useEffect(() => {
    if (formData.feeNegotiable && formData.fee.trim() !== '') {
      updateField('fee', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.feeNegotiable]); // feeNegotiable이 변경될 때만 실행

  const handleInputChange = useCallback(
    (field: keyof CampaignFormData, value: string | boolean) => {
      updateField(field, value);
    },
    [updateField]
  );

  const handleSubmit = useCallback(async () => {
    // 유효성 검사
    const validation = validateCampaignForm(formData);
    if (!validation.isValid) {
      showToast(validation.errorMessage || '입력 정보를 확인해주세요.', undefined, 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedCoverImageUrl: string | undefined;
      let uploadedProductImageUrl: string | undefined;
      let uploadedLiveCoverImageUrl: string | undefined;

      if (coverImageFile) {
        const url = await uploadFile(coverImageFile, { type: 'image' });
        if (!url) {
          showToast('커버 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedCoverImageUrl = url;
      }

      if (productImageFile) {
        const url = await uploadFile(productImageFile, { type: 'image' });
        if (!url) {
          showToast('상품 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedProductImageUrl = url;
      }

      if (liveCoverImageFile) {
        const url = await uploadFile(liveCoverImageFile, { type: 'image' });
        if (!url) {
          showToast('라이브 커버 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedLiveCoverImageUrl = url;
      }

      const request = buildCampaignRequest(
        formData,
        uploadedCoverImageUrl,
        uploadedProductImageUrl,
        uploadedLiveCoverImageUrl
      );

      const response = await campaignRepository.createCampaign(request);

      if (response.ok) {
        // 제출 성공 시 sessionStorage 삭제
        clearStorage();
        clearImageUrls();
        showToast('모집 공고가 등록되었습니다.');
        navigate('/campaigns', { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '모집 공고 등록에 실패했습니다.';
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    campaignRepository,
    clearStorage,
    clearImageUrls,
    coverImageFile,
    formData,
    liveCoverImageFile,
    navigate,
    productImageFile,
    showToast,
    uploadFile,
  ]);

  return {
    formData,
    coverImageUrl,
    productImageUrl,
    liveCoverImageUrl,
    isSubmitting,
    isImageUploading,
    handleInputChange,
    handleImageSelect,
    handleSubmit,
  };
};
