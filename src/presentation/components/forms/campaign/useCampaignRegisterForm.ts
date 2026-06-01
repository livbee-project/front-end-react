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
import { error as logError } from '@/shared/utils/logger';

const INITIAL_FORM_DATA: CampaignFormData = {
  brandName: '',
  brandIntroduction: '',
  title: '',
  content: '',
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
  qualifications: [],
};

export const useCampaignRegisterForm = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();
  const campaignRepository = useRepository(CampaignRepository);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 자동 저장 비활성화: 이미지 선택 시점에만 수동으로 저장
  const { formData, updateField, updateArrayField, setFormData } = useFormState<CampaignFormData>(INITIAL_FORM_DATA, undefined);

  // 이미지 관리 훅 (saveFormData는 나중에 설정)
  const {
    coverImageUrl,
    productImageUrl,
    liveCoverImageUrl,
    coverImageFile,
    productImageFile,
    liveCoverImageFile,
    getCoverImageFile,
    getProductImageFile,
    getLiveCoverImageFile,
    hasStoredImages,
    handleImageSelect: baseHandleImageSelect,
    clearImageStates,
  } = useCampaignImageManagement({
    onImageRestored: () => {
      // 이미지 복원 후 폼 데이터 복원 트리거
      // useCampaignFormStorage의 onImageRestored가 호출되어 폼 데이터 복원
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
    onImageRestored: () => {
      // 이미지 복원 후 추가 처리 필요 시 여기서 수행
    },
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

  // 자격 요건 초기값 설정: 빈 배열이면 기본 항목 하나 추가
  // 단, sessionStorage에서 복원 중이면 초기화하지 않음 (복원이 완료될 때까지 대기)
  useEffect(() => {
    // sessionStorage에 저장된 데이터가 있는지 확인
    const hasStoredData = typeof window !== 'undefined' && 
      sessionStorage.getItem('campaign-register-form') !== null;
    
    // 저장된 데이터가 없고, qualifications가 빈 배열일 때만 초기화
    if (!hasStoredData && Array.isArray(formData.qualifications) && formData.qualifications.length === 0) {
      setFormData((prev) => ({
        ...prev,
        qualifications: [''],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 마운트 시 한 번만 실행

  const handleInputChange = useCallback(
    (field: keyof CampaignFormData, value: string | boolean, index?: number) => {
      if (index !== undefined && field === 'qualifications') {
        updateArrayField(field, index, value);
        return;
      }
      updateField(field, value);
    },
    [updateField, updateArrayField]
  );

  // 자격 요건 추가
  const handleAddQualification = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, ''],
    }));
  }, [setFormData]);

  // 자격 요건 삭제
  const handleRemoveQualification = useCallback(
    (index: number) => {
      setFormData((prev) => {
        const newQualifications = prev.qualifications.filter((_, idx) => idx !== index);
        // 첫번째 항목을 삭제한 경우, 빈 배열이 되면 빈 문자열 하나로 초기화
        // 그 외의 경우는 배열에서 제거만 함
        return {
          ...prev,
          qualifications: newQualifications.length > 0 ? newQualifications : [''],
        };
      });
    },
    [setFormData]
  );

  // 자격 요건 변경
  const handleQualificationChange = useCallback(
    (index: number, value: string) => {
      updateArrayField('qualifications', index, value);
    },
    [updateArrayField]
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

      // ref에서도 파일 확인 (상태가 null일 수 있으므로)
      // blob URL에서 파일을 생성할 수 있으므로 await 필요
      const finalCoverImageFile = coverImageFile || await getCoverImageFile();
      const finalProductImageFile = productImageFile || await getProductImageFile();
      const finalLiveCoverImageFile = liveCoverImageFile || await getLiveCoverImageFile();

      if (finalCoverImageFile) {
        // 모집공고 등록 시 category는 'campaign', resourceId는 아직 생성되지 않았으므로 undefined
        // publicId는 'cover'로 지정 (백엔드 폴더 구조에 따라)
        const url = await uploadFile(finalCoverImageFile, {
          type: 'image',
          category: 'campaign',
          publicId: 'cover',
        });
        if (!url) {
          showToast('커버 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedCoverImageUrl = url;
      }

      if (finalProductImageFile) {
        // 상품 이미지는 'product'로 지정 (백엔드 폴더 구조에 따라 'product.jpg' 또는 'products/{product_id}.jpg')
        const url = await uploadFile(finalProductImageFile, {
          type: 'image',
          category: 'campaign',
          publicId: 'product',
        });
        if (!url) {
          showToast('상품 이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }
        uploadedProductImageUrl = url;
      }

      if (finalLiveCoverImageFile) {
        // 라이브 커버 이미지는 'live-cover'로 지정 (백엔드 폴더 구조에 따라)
        const url = await uploadFile(finalLiveCoverImageFile, {
          type: 'image',
          category: 'campaign',
          publicId: 'live-cover',
        });
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
        showToast('모집 공고가 등록되었습니다.', undefined, 'success');
        navigate('/campaigns', { replace: true });
      } else {
        // 응답은 받았지만 ok가 false인 경우
        // fetchApi가 이미 에러를 throw하므로 이 경우는 발생하지 않아야 하지만, 안전을 위해 처리
        const errorMessage = '모집 공고 등록에 실패했습니다.';
        showToast(errorMessage, undefined, 'error');
      }
    } catch (error) {
      // fetchApi의 notifyApiError가 이미 ApiErrorToastListener를 통해 토스트를 표시하므로
      // 여기서는 추가로 토스트를 표시하지 않음
      // 에러는 로깅만 수행
      logError('useCampaignRegisterForm', '모집 공고 등록 실패', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    campaignRepository,
    clearStorage,
    coverImageFile,
    formData,
    getCoverImageFile,
    getLiveCoverImageFile,
    getProductImageFile,
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
    handleAddQualification,
    handleRemoveQualification,
    handleQualificationChange,
  };
};
