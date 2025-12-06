import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/useFormState';
import type { CampaignFormData } from './types';
import { getStoredImageUrls, saveImageUrls, clearImageUrls } from './utils/campaignImageStorage';
import { validateCampaignForm } from './utils/campaignValidation';
import { buildCampaignRequest } from './utils/campaignRequestBuilder';

const STORAGE_KEY = 'campaign-register-form';

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
};

export const useCampaignRegisterForm = () => {
  const navigate = useNavigate();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();
  const campaignRepository = useRepository(CampaignRepository);

  const { formData, updateField, clearStorage } = useFormState<CampaignFormData>(INITIAL_FORM_DATA, STORAGE_KEY);
  
  const storedImages = getStoredImageUrls();
  const [coverImageUrl, setCoverImageUrl] = useState(storedImages.cover);
  const [productImageUrl, setProductImageUrl] = useState(storedImages.product);
  const [liveCoverImageUrl, setLiveCoverImageUrl] = useState(storedImages.liveCover);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [liveCoverImageFile, setLiveCoverImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이미지 URL 변경 시 sessionStorage에 저장
  useEffect(() => {
    saveImageUrls({
      cover: coverImageUrl,
      product: productImageUrl,
      liveCover: liveCoverImageUrl,
    });
  }, [coverImageUrl, productImageUrl, liveCoverImageUrl]);

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
    // useEffect에서 자동으로 저장되므로 여기서는 상태만 업데이트
  }, []);

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

