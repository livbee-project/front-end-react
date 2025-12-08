import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getStoredImageUrls, saveImageUrls, clearImageUrls } from '@/presentation/components/forms/campaign/utils/campaignImageStorage';
import { debug } from '@/shared/utils/logger';

interface UseCampaignImageManagementOptions {
  onImageRestored?: () => void;
  onSaveFormData?: () => void;
}

/**
 * 캠페인 등록 폼의 이미지 관리 로직을 처리하는 훅
 */
export const useCampaignImageManagement = ({ onImageRestored, onSaveFormData }: UseCampaignImageManagementOptions = {}) => {
  const location = useLocation();
  const storedImages = getStoredImageUrls();
  const hasStoredImages = !!(storedImages.cover || storedImages.product || storedImages.liveCover);

  const [coverImageUrl, setCoverImageUrl] = useState(storedImages.cover || '');
  const [productImageUrl, setProductImageUrl] = useState(storedImages.product || '');
  const [liveCoverImageUrl, setLiveCoverImageUrl] = useState(storedImages.liveCover || '');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [liveCoverImageFile, setLiveCoverImageFile] = useState<File | null>(null);

  // 페이지 복귀 시 sessionStorage에서 이미지 URL 복원 및 처리
  useEffect(() => {
    const currentStoredImages = getStoredImageUrls();
    let hasRestoredImage = false;

    // sessionStorage에 이미지가 있고 현재 상태와 다르면 복원 (크롭 완료 후 돌아온 경우)
    if (currentStoredImages.cover && currentStoredImages.cover !== coverImageUrl) {
      setCoverImageUrl(currentStoredImages.cover);
      hasRestoredImage = true;
    }
    if (currentStoredImages.product && currentStoredImages.product !== productImageUrl) {
      setProductImageUrl(currentStoredImages.product);
      hasRestoredImage = true;
    }
    if (currentStoredImages.liveCover && currentStoredImages.liveCover !== liveCoverImageUrl) {
      setLiveCoverImageUrl(currentStoredImages.liveCover);
      hasRestoredImage = true;
    }

    // 크롭 완료 후 돌아온 경우: 이미지 복원 후 세션 데이터 모두 삭제
    if (hasRestoredImage) {
      clearImageUrls();
      onImageRestored?.();
      debug('useCampaignImageManagement', '🖼️ 이미지 복원 완료, 세션 데이터 삭제');
    }
  }, [location.pathname, coverImageUrl, productImageUrl, liveCoverImageUrl, onImageRestored]);

  // 이미지 선택 핸들러
  const handleImageSelect = useCallback(
    (file: File, type: 'cover' | 'product' | 'liveCover') => {
      const blobUrl = URL.createObjectURL(file);

      if (type === 'cover') {
        setCoverImageFile(file);
        setCoverImageUrl(blobUrl);
        // 이미지 선택 시 sessionStorage에 저장 (크롭 페이지로 이동하기 전)
        saveImageUrls({
          cover: blobUrl,
          product: productImageUrl,
          liveCover: liveCoverImageUrl,
        });
        // 폼 데이터도 함께 저장 (크롭 페이지로 이동하기 전)
        onSaveFormData?.();
      } else if (type === 'product') {
        setProductImageFile(file);
        setProductImageUrl(blobUrl);
        // 이미지 선택 시 sessionStorage에 저장
        saveImageUrls({
          cover: coverImageUrl,
          product: blobUrl,
          liveCover: liveCoverImageUrl,
        });
        // 폼 데이터도 함께 저장
        onSaveFormData?.();
      } else {
        setLiveCoverImageFile(file);
        setLiveCoverImageUrl(blobUrl);
        // 이미지 선택 시 sessionStorage에 저장
        saveImageUrls({
          cover: coverImageUrl,
          product: productImageUrl,
          liveCover: blobUrl,
        });
        // 폼 데이터도 함께 저장
        onSaveFormData?.();
      }
    },
    [coverImageUrl, productImageUrl, liveCoverImageUrl, onSaveFormData]
  );

  // 이미지 상태 초기화
  const clearImageStates = useCallback(() => {
    setCoverImageUrl('');
    setProductImageUrl('');
    setLiveCoverImageUrl('');
    setCoverImageFile(null);
    setProductImageFile(null);
    setLiveCoverImageFile(null);
    clearImageUrls();
  }, []);

  return {
    coverImageUrl,
    productImageUrl,
    liveCoverImageUrl,
    coverImageFile,
    productImageFile,
    liveCoverImageFile,
    hasStoredImages,
    handleImageSelect,
    clearImageStates,
    setCoverImageUrl,
    setProductImageUrl,
    setLiveCoverImageUrl,
  };
};

