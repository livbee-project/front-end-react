import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/useFormState';
import { validateRequiredFields, validateTimeRange } from '@/shared/utils/validation';
import type { CreateCampaignRequest } from '@/domain/entities/Campaign';
import type { CampaignFormData } from './types';

const STORAGE_KEY = 'campaign-register-form';
const IMAGE_STORAGE_KEY = 'campaign-register-images';

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

export const useCampaignRegisterForm = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();
  const campaignRepository = useRepository(CampaignRepository);

  const { formData, updateField, clearStorage } = useFormState<CampaignFormData>(INITIAL_FORM_DATA, STORAGE_KEY);
  
  // 이미지 URL 복원
  const getStoredImageUrls = (): { cover: string; product: string; liveCover: string } => {
    if (typeof window === 'undefined') {
      return { cover: '', product: '', liveCover: '' };
    }
    try {
      const stored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to restore image URLs from sessionStorage:', error);
    }
    return { cover: '', product: '', liveCover: '' };
  };

  const storedImages = getStoredImageUrls();
  const [coverImageUrl, setCoverImageUrl] = useState(storedImages.cover);
  const [productImageUrl, setProductImageUrl] = useState(storedImages.product);
  const [liveCoverImageUrl, setLiveCoverImageUrl] = useState(storedImages.liveCover);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [liveCoverImageFile, setLiveCoverImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이미지 URL 변경 시 sessionStorage에 저장 (값이 실제로 변경되었을 때만)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const currentStored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
      const newValue = JSON.stringify({
        cover: coverImageUrl,
        product: productImageUrl,
        liveCover: liveCoverImageUrl,
      });
      
      // 이전 값과 다를 때만 저장 (불필요한 저장 방지)
      if (currentStored !== newValue) {
        sessionStorage.setItem(IMAGE_STORAGE_KEY, newValue);
      }
    } catch (error) {
      console.warn('Failed to save image URLs to sessionStorage:', error);
    }
  }, [coverImageUrl, productImageUrl, liveCoverImageUrl]);

  const handleInputChange = useCallback((field: keyof CampaignFormData, value: string) => {
    updateField(field, value);
  }, [updateField]);

  const handleImageSelect = useCallback((file: File, type: 'cover' | 'product' | 'liveCover') => {
    const blobUrl = URL.createObjectURL(file);
    if (type === 'cover') {
      setCoverImageFile(file);
      setCoverImageUrl(blobUrl);
      // 즉시 sessionStorage에 저장
      if (typeof window !== 'undefined') {
        try {
          const current = sessionStorage.getItem(IMAGE_STORAGE_KEY);
          const currentData = current ? JSON.parse(current) : { cover: '', product: '', liveCover: '' };
          sessionStorage.setItem(
            IMAGE_STORAGE_KEY,
            JSON.stringify({
              ...currentData,
              cover: blobUrl,
            })
          );
        } catch (error) {
          console.warn('Failed to save image URL to sessionStorage:', error);
        }
      }
    } else if (type === 'product') {
      setProductImageFile(file);
      setProductImageUrl(blobUrl);
      // 즉시 sessionStorage에 저장
      if (typeof window !== 'undefined') {
        try {
          const current = sessionStorage.getItem(IMAGE_STORAGE_KEY);
          const currentData = current ? JSON.parse(current) : { cover: '', product: '', liveCover: '' };
          sessionStorage.setItem(
            IMAGE_STORAGE_KEY,
            JSON.stringify({
              ...currentData,
              product: blobUrl,
            })
          );
        } catch (error) {
          console.warn('Failed to save image URL to sessionStorage:', error);
        }
      }
    } else {
      setLiveCoverImageFile(file);
      setLiveCoverImageUrl(blobUrl);
      // 즉시 sessionStorage에 저장
      if (typeof window !== 'undefined') {
        try {
          const current = sessionStorage.getItem(IMAGE_STORAGE_KEY);
          const currentData = current ? JSON.parse(current) : { cover: '', product: '', liveCover: '' };
          sessionStorage.setItem(
            IMAGE_STORAGE_KEY,
            JSON.stringify({
              ...currentData,
              liveCover: blobUrl,
            })
          );
        } catch (error) {
          console.warn('Failed to save image URL to sessionStorage:', error);
        }
      }
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
        // 제출 성공 시 sessionStorage 삭제
        clearStorage();
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.removeItem(IMAGE_STORAGE_KEY);
          } catch (error) {
            console.warn('Failed to remove image URLs from sessionStorage:', error);
          }
        }
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

