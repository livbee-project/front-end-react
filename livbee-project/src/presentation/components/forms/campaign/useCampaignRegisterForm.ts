import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/useFormState';
import { validateRequiredFields, validateTimeRange } from '@/shared/utils/formValidation';
import type { CreateCampaignRequest } from '@/domain/entities/Campaign';
import type { CampaignFormData } from './types';

const INITIAL_FORM_DATA: CampaignFormData = {
  brandName: '',
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
};

const mapRecruitmentType = (type: CampaignFormData['recruitmentType']): 'showhost' | 'staff' | 'model' | 'other' => {
  const typeMap: Record<string, 'showhost' | 'staff' | 'model' | 'other'> = {
    store: 'showhost',
    showhost: 'showhost',
    model: 'model',
    staff: 'staff',
    other: 'other',
  };
  return typeMap[type] || 'showhost';
};

const convertToISO8601 = (dateString: string): string => {
  if (!dateString) return '';
  return `${dateString}T00:00:00.000Z`;
};

const calculateDurationHours = (startTime: string, endTime: string): number => {
  if (!startTime || !endTime) return 0;

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  const diffMinutes = endMinutes - startMinutes;
  return Math.round((diffMinutes / 60) * 10) / 10;
};

export const useCampaignRegisterForm = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();
  const campaignRepository = useRepository(CampaignRepository);

  const { formData, updateField } = useFormState<CampaignFormData>(INITIAL_FORM_DATA);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [productImageUrl, setProductImageUrl] = useState('');
  const [liveCoverImageUrl, setLiveCoverImageUrl] = useState('');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [liveCoverImageFile, setLiveCoverImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((field: keyof CampaignFormData, value: string) => {
    updateField(field, value);
  }, [updateField]);

  const handleImageSelect = useCallback((file: File, type: 'cover' | 'product' | 'liveCover') => {
    const blobUrl = URL.createObjectURL(file);
    if (type === 'cover') {
      setCoverImageFile(file);
      setCoverImageUrl(blobUrl);
    } else if (type === 'product') {
      setProductImageFile(file);
      setProductImageUrl(blobUrl);
    } else {
      setLiveCoverImageFile(file);
      setLiveCoverImageUrl(blobUrl);
    }
  }, []);

  const validateRequired = useCallback(() => {
    const requiredFields = [
      { value: formData.brandName, message: '브랜드명을 입력해주세요.' },
      { value: formData.title, message: '제목을 입력해주세요.' },
      { value: formData.filmingDate, message: '촬영일을 선택해주세요.' },
      { value: formData.deadline, message: '공고 마감일을 선택해주세요.' },
      { value: formData.startTime, message: '시작시간을 선택해주세요.' },
      { value: formData.endTime, message: '종료시간을 선택해주세요.' },
    ];

    const requiredSatisfied = validateRequiredFields(requiredFields, (message) =>
      showToast(message, undefined, 'error')
    );

    if (!requiredSatisfied) {
      return false;
    }

    return validateTimeRange(formData.startTime, formData.endTime, (message) =>
      showToast(message, undefined, 'error')
    );
  }, [formData.deadline, formData.endTime, formData.filmingDate, formData.startTime, formData.title, formData.brandName, showToast]);

  const handleSubmit = useCallback(async () => {
    if (!validateRequired()) {
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

      const request: CreateCampaignRequest = {
        brandName: formData.brandName.trim(),
        title: formData.title.trim(),
        shootDate: convertToISO8601(formData.filmingDate),
        closeAt: convertToISO8601(formData.deadline),
        startTime: formData.startTime,
        endTime: formData.endTime,
        prefix: mapRecruitmentType(formData.recruitmentType),
        category: formData.category as CreateCampaignRequest['category'],
        content: formData.content.trim() || undefined,
        detailedContent: formData.detailedContent.trim() || undefined,
        location: formData.location.trim() || undefined,
        productName: formData.productName.trim() || undefined,
        coverImageUrl: uploadedCoverImageUrl,
        productThumbnailUrl: uploadedProductImageUrl,
        liveVerticalCoverUrl: uploadedLiveCoverImageUrl,
        isPublic: true,
      };

      const response = await campaignRepository.createCampaign(request);

      if (response.ok) {
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
    coverImageFile,
    formData,
    navigate,
    productImageFile,
    liveCoverImageFile,
    showToast,
    uploadFile,
    validateRequired,
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

