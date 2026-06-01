import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getStoredImageUrls, saveImageUrls, clearImageUrls, saveImageFileNames, getStoredImageFileNames } from '@/presentation/components/forms/campaign/utils/campaignImageStorage';
import { debug } from '@/shared/utils/logger';

interface UseCampaignImageManagementOptions {
  onImageRestored?: () => void;
}

/**
 * 캠페인 등록 폼의 이미지 관리 로직을 처리하는 훅
 */
export const useCampaignImageManagement = ({ onImageRestored }: UseCampaignImageManagementOptions = {}) => {
  const location = useLocation();
  const storedImages = getStoredImageUrls();
  const hasStoredImages = !!(storedImages.cover || storedImages.product || storedImages.liveCover);

  const [coverImageUrl, setCoverImageUrl] = useState(storedImages.cover || '');
  const [productImageUrl, setProductImageUrl] = useState(storedImages.product || '');
  const [liveCoverImageUrl, setLiveCoverImageUrl] = useState(storedImages.liveCover || '');
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [liveCoverImageFile, setLiveCoverImageFile] = useState<File | null>(null);
  
  // File 객체를 ref로도 저장하여 페이지 재마운트 시에도 유지
  const coverImageFileRef = useRef<File | null>(null);
  const productImageFileRef = useRef<File | null>(null);
  const liveCoverImageFileRef = useRef<File | null>(null);

  // 페이지 복귀 시 sessionStorage에서 이미지 URL 복원 및 처리
  useEffect(() => {
    const currentStoredImages = getStoredImageUrls();
    let hasRestoredImage = false;

    debug('useCampaignImageManagement', '🖼️ 이미지 복원 체크 시작', {
      currentPath: location.pathname,
      storedCover: !!currentStoredImages.cover,
      storedProduct: !!currentStoredImages.product,
      storedLiveCover: !!currentStoredImages.liveCover,
      currentCover: !!coverImageUrl,
      currentProduct: !!productImageUrl,
      currentLiveCover: !!liveCoverImageUrl,
    });

    // sessionStorage에 이미지가 있고 현재 상태와 다르면 복원 (크롭 완료 후 돌아온 경우)
    if (currentStoredImages.cover && currentStoredImages.cover !== coverImageUrl) {
      debug('useCampaignImageManagement', '🖼️ cover 이미지 복원', {
        stored: currentStoredImages.cover,
        current: coverImageUrl,
      });
      setCoverImageUrl(currentStoredImages.cover);
      hasRestoredImage = true;
    }
    if (currentStoredImages.product && currentStoredImages.product !== productImageUrl) {
      debug('useCampaignImageManagement', '🖼️ product 이미지 복원', {
        stored: currentStoredImages.product,
        current: productImageUrl,
      });
      setProductImageUrl(currentStoredImages.product);
      hasRestoredImage = true;
    }
    if (currentStoredImages.liveCover && currentStoredImages.liveCover !== liveCoverImageUrl) {
      debug('useCampaignImageManagement', '🖼️ liveCover 이미지 복원', {
        stored: currentStoredImages.liveCover,
        current: liveCoverImageUrl,
      });
      setLiveCoverImageUrl(currentStoredImages.liveCover);
      hasRestoredImage = true;
    }

    // 크롭 완료 후 돌아온 경우: 이미지 복원 후 콜백 호출 (폼 데이터 복원을 위해)
    // clearImageUrls는 폼 데이터 복원 후에 호출되어야 함
    if (hasRestoredImage) {
      debug('useCampaignImageManagement', '🖼️ 이미지 복원 완료, onImageRestored 호출');
      onImageRestored?.();
      // 폼 데이터 복원 후 이미지 URL 삭제 (약간의 지연을 두어 복원이 완료되도록)
      setTimeout(() => {
        clearImageUrls();
        debug('useCampaignImageManagement', '🖼️ 이미지 복원 완료, 이미지 URL 삭제');
      }, 100);
    } else {
      debug('useCampaignImageManagement', '⏭️ 이미지 복원 없음');
    }
  }, [location.pathname, coverImageUrl, productImageUrl, liveCoverImageUrl, onImageRestored]);

  // 이미지 선택 핸들러
  const handleImageSelect = useCallback(
    (file: File, type?: 'cover' | 'product' | 'liveCover') => {
      // type이 없으면 기본값으로 'cover' 사용 (하위 호환성)
      const imageType = type || 'cover';
      const blobUrl = URL.createObjectURL(file);

      debug('useCampaignImageManagement', '🖼️ handleImageSelect 호출', {
        fileName: file.name,
        fileSize: file.size,
        type: imageType,
      });

      if (imageType === 'cover') {
        setCoverImageFile(file);
        coverImageFileRef.current = file; // ref에도 저장
        setCoverImageUrl(blobUrl);
        // 이미지 선택 시 sessionStorage에 저장 (크롭 페이지로 이동하기 전)
        saveImageUrls({
          cover: blobUrl,
          product: productImageUrl,
          liveCover: liveCoverImageUrl,
        });
        // 파일명도 함께 저장
        const currentFileNames = getStoredImageFileNames();
        saveImageFileNames({
          ...currentFileNames,
          cover: file.name,
        });
        debug('useCampaignImageManagement', '✅ cover 이미지 저장 완료', {
          hasFile: !!file,
          blobUrl,
          fileName: file.name,
          fileSize: file.size,
        });
        // 폼 데이터 저장은 handleImageSelect에서 처리됨
      } else if (imageType === 'product') {
        setProductImageFile(file);
        productImageFileRef.current = file; // ref에도 저장
        setProductImageUrl(blobUrl);
        // 이미지 선택 시 sessionStorage에 저장
        saveImageUrls({
          cover: coverImageUrl,
          product: blobUrl,
          liveCover: liveCoverImageUrl,
        });
        // 파일명도 함께 저장
        const currentFileNames = getStoredImageFileNames();
        saveImageFileNames({
          ...currentFileNames,
          product: file.name,
        });
        debug('useCampaignImageManagement', '✅ product 이미지 저장 완료', {
          hasFile: !!file,
          blobUrl,
          fileName: file.name,
          fileSize: file.size,
        });
        // 폼 데이터 저장은 handleImageSelect에서 처리됨
      } else {
        setLiveCoverImageFile(file);
        liveCoverImageFileRef.current = file; // ref에도 저장
        setLiveCoverImageUrl(blobUrl);
        // 이미지 선택 시 sessionStorage에 저장
        saveImageUrls({
          cover: coverImageUrl,
          product: productImageUrl,
          liveCover: blobUrl,
        });
        // 파일명도 함께 저장
        const currentFileNames = getStoredImageFileNames();
        saveImageFileNames({
          ...currentFileNames,
          liveCover: file.name,
        });
        debug('useCampaignImageManagement', '✅ liveCover 이미지 저장 완료', {
          hasFile: !!file,
          blobUrl,
          fileName: file.name,
          fileSize: file.size,
        });
        // 폼 데이터 저장은 handleImageSelect에서 처리됨
      }
    },
    [coverImageUrl, productImageUrl, liveCoverImageUrl]
  );

  // 이미지 상태 초기화
  const clearImageStates = useCallback(() => {
    setCoverImageUrl('');
    setProductImageUrl('');
    setLiveCoverImageUrl('');
    setCoverImageFile(null);
    setProductImageFile(null);
    setLiveCoverImageFile(null);
    coverImageFileRef.current = null;
    productImageFileRef.current = null;
    liveCoverImageFileRef.current = null;
    clearImageUrls();
  }, []);

  // blob URL에서 File 객체를 생성하는 헬퍼 함수
  const blobUrlToFile = useCallback(async (blobUrl: string, fileName: string): Promise<File | null> => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      debug('useCampaignImageManagement', '❌ blobUrlToFile 실패', { blobUrl, fileName, error });
      return null;
    }
  }, []);

  // ref에서 파일을 가져오는 getter 함수들 (항상 최신 값을 반환)
  // 상태나 ref에 파일이 없으면 blob URL에서 파일을 생성
  const getCoverImageFile = useCallback(async (): Promise<File | null> => {
    // 먼저 상태나 ref에서 확인
    const file = coverImageFile || coverImageFileRef.current;
    if (file) {
      debug('useCampaignImageManagement', '📂 getCoverImageFile - 상태/ref에서 가져옴', {
        coverImageFile: !!coverImageFile,
        refFile: !!coverImageFileRef.current,
      });
      return file;
    }

    // blob URL에서 File 생성 시도
    if (coverImageUrl && coverImageUrl.startsWith('blob:')) {
      const storedFileNames = getStoredImageFileNames();
      const fileName = storedFileNames.cover || coverImageUrl.split('/').pop() || 'cover-image.jpg';
      debug('useCampaignImageManagement', '📂 getCoverImageFile - blob URL에서 생성 시도', {
        coverImageUrl,
        fileName,
      });
      return await blobUrlToFile(coverImageUrl, fileName);
    }

    debug('useCampaignImageManagement', '📂 getCoverImageFile - 파일 없음', {
      coverImageFile: !!coverImageFile,
      refFile: !!coverImageFileRef.current,
      coverImageUrl,
    });
    return null;
  }, [coverImageFile, coverImageUrl, blobUrlToFile]);
  
  const getProductImageFile = useCallback(async (): Promise<File | null> => {
    const file = productImageFile || productImageFileRef.current;
    if (file) {
      debug('useCampaignImageManagement', '📂 getProductImageFile - 상태/ref에서 가져옴', {
        productImageFile: !!productImageFile,
        refFile: !!productImageFileRef.current,
      });
      return file;
    }

    if (productImageUrl && productImageUrl.startsWith('blob:')) {
      const storedFileNames = getStoredImageFileNames();
      const fileName = storedFileNames.product || productImageUrl.split('/').pop() || 'product-image.jpg';
      debug('useCampaignImageManagement', '📂 getProductImageFile - blob URL에서 생성 시도', {
        productImageUrl,
        fileName,
      });
      return await blobUrlToFile(productImageUrl, fileName);
    }

    debug('useCampaignImageManagement', '📂 getProductImageFile - 파일 없음', {
      productImageFile: !!productImageFile,
      refFile: !!productImageFileRef.current,
      productImageUrl,
    });
    return null;
  }, [productImageFile, productImageUrl, blobUrlToFile]);
  
  const getLiveCoverImageFile = useCallback(async (): Promise<File | null> => {
    const file = liveCoverImageFile || liveCoverImageFileRef.current;
    if (file) {
      debug('useCampaignImageManagement', '📂 getLiveCoverImageFile - 상태/ref에서 가져옴', {
        liveCoverImageFile: !!liveCoverImageFile,
        refFile: !!liveCoverImageFileRef.current,
      });
      return file;
    }

    if (liveCoverImageUrl && liveCoverImageUrl.startsWith('blob:')) {
      const storedFileNames = getStoredImageFileNames();
      const fileName = storedFileNames.liveCover || liveCoverImageUrl.split('/').pop() || 'live-cover-image.jpg';
      debug('useCampaignImageManagement', '📂 getLiveCoverImageFile - blob URL에서 생성 시도', {
        liveCoverImageUrl,
        fileName,
      });
      return await blobUrlToFile(liveCoverImageUrl, fileName);
    }

    debug('useCampaignImageManagement', '📂 getLiveCoverImageFile - 파일 없음', {
      liveCoverImageFile: !!liveCoverImageFile,
      refFile: !!liveCoverImageFileRef.current,
      liveCoverImageUrl,
    });
    return null;
  }, [liveCoverImageFile, liveCoverImageUrl, blobUrlToFile]);

  return {
    coverImageUrl,
    productImageUrl,
    liveCoverImageUrl,
    coverImageFile,
    productImageFile,
    liveCoverImageFile,
    // ref에서 파일을 가져오는 함수들도 노출
    getCoverImageFile,
    getProductImageFile,
    getLiveCoverImageFile,
    hasStoredImages,
    handleImageSelect,
    clearImageStates,
    setCoverImageUrl,
    setProductImageUrl,
    setLiveCoverImageUrl,
  };
};

