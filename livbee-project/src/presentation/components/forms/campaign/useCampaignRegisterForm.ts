import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useCloudinaryUpload } from '@/presentation/hooks/useCloudinaryUpload';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useFormState } from '@/presentation/hooks/useFormState';
import type { CampaignFormData } from './types';
import { getStoredImageUrls, saveImageUrls, clearImageUrls } from './utils/campaignImageStorage';
import { validateCampaignForm } from './utils/campaignValidation';
import { buildCampaignRequest } from './utils/campaignRequestBuilder';
import { debug } from '@/shared/utils/logger';

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
  fee: '',
  feeNegotiable: false,
};

export const useCampaignRegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();
  const { showToast } = useToast();
  const campaignRepository = useRepository(CampaignRepository);

  // 이미지가 sessionStorage에 있는지 확인 (이미지 업로드 플로우 진행 중인지 판단)
  const storedImages = getStoredImageUrls();
  const hasStoredImages = !!(storedImages.cover || storedImages.product || storedImages.liveCover);
  
  // 자동 저장 비활성화: 이미지 선택 시점에만 수동으로 저장
  const { formData, updateField, setFormData } = useFormState<CampaignFormData>(INITIAL_FORM_DATA, undefined);
  
  const [coverImageUrl, setCoverImageUrl] = useState(storedImages.cover);
  const [productImageUrl, setProductImageUrl] = useState(storedImages.product);
  const [liveCoverImageUrl, setLiveCoverImageUrl] = useState(storedImages.liveCover);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [liveCoverImageFile, setLiveCoverImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);
  
  // 현재 경로를 추적하기 위한 ref (cleanup에서 사용)
  const currentPathRef = useRef(location.pathname);
  
  // 경로 변경 시 ref 업데이트
  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  // sessionStorage에서 폼 데이터를 삭제하는 함수
  const clearStorage = useCallback(() => {
    debug('useCampaignRegisterForm', '🗑️ clearStorage 호출', {
      storageKey: STORAGE_KEY,
      hasStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(STORAGE_KEY) : false,
    });
    
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
        debug('useCampaignRegisterForm', '🗑️ clearStorage 완료', {
          storageKey: STORAGE_KEY,
          hasStorage: !!sessionStorage.getItem(STORAGE_KEY),
        });
      } catch (error) {
        debug('useCampaignRegisterForm', '🗑️ clearStorage 실패', { error });
        // 삭제 실패는 무시
      }
    }
  }, []);

  // 폼 데이터가 sessionStorage에 있는지 확인 및 복원
  useEffect(() => {
    if (isInitialMount) {
      // sessionStorage에서 폼 데이터 복원 (크롭 페이지에서 돌아온 경우)
      if (hasStoredImages && typeof window !== 'undefined') {
        try {
          const stored = sessionStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored) as CampaignFormData;
            setFormData(parsed);
          }
        } catch (error) {
          // 복원 실패 시 초기값 사용
          setFormData(INITIAL_FORM_DATA);
        }
      } else {
        // 이미지가 없으면 (일반적인 페이지 진입) 폼 데이터 초기화
        setFormData(INITIAL_FORM_DATA);
      }
      setIsInitialMount(false);
    }
  }, [isInitialMount, hasStoredImages, setFormData]);

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
      clearStorage(); // 폼 데이터 세션도 삭제
      // 경로 ref도 업데이트 (크롭 완료 후 돌아온 상태)
      currentPathRef.current = location.pathname;
    }
  }, [location.pathname]); // location.pathname을 의존성에 추가하여 경로 변경 시 업데이트

  // 페이지를 벗어났다가 돌아올 때 데이터 초기화 감지
  useEffect(() => {
    const handleVisibilityChange = () => {
      // 페이지가 다시 보이게 되었을 때
      if (document.visibilityState === 'visible') {
        const currentStoredImages = getStoredImageUrls();
        const hasStoredImages = !!(currentStoredImages.cover || currentStoredImages.product || currentStoredImages.liveCover);
        // 상태의 이미지도 확인 (크롭 완료 후 돌아온 경우 이미지가 상태에 있을 수 있음)
        const hasStateImages = !!(coverImageUrl || productImageUrl || liveCoverImageUrl);
        const hasStoredFormData = (() => {
          if (typeof window === 'undefined' || !STORAGE_KEY) return false;
          try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
              const parsed = JSON.parse(stored) as CampaignFormData;
              return JSON.stringify(parsed) !== JSON.stringify(INITIAL_FORM_DATA);
            }
          } catch {
            return false;
          }
          return false;
        })();

        // 이미지도 없고 폼 데이터만 있으면 (뒤로가기나 다른 페이지에서 돌아온 경우) 모두 초기화
        // 단, 상태에 이미지가 있으면 초기화하지 않음 (크롭 완료 후 돌아온 경우)
        if (!hasStoredImages && !hasStateImages && hasStoredFormData) {
          setFormData(INITIAL_FORM_DATA);
          // 폼 데이터 세션 삭제
          if (typeof window !== 'undefined') {
            try {
              sessionStorage.removeItem(STORAGE_KEY);
            } catch (error) {
              // 삭제 실패는 무시
            }
          }
          // 이미지 상태도 초기화
          setCoverImageUrl('');
          setProductImageUrl('');
          setLiveCoverImageUrl('');
          setCoverImageFile(null);
          setProductImageFile(null);
          setLiveCoverImageFile(null);
          clearImageUrls();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [setFormData, coverImageUrl, productImageUrl, liveCoverImageUrl]);

  // 브라우저를 닫을 때 데이터 초기화
  useEffect(() => {
    const handleBeforeUnload = () => {
      clearStorage();
      clearImageUrls();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [clearStorage]);

  // 경로 변경 감지: 등록 페이지를 벗어날 때 데이터 초기화
  useEffect(() => {
    const isRegisterPage = location.pathname === '/campaigns/register';
    const isCropPage = location.pathname === '/image/crop';
    
    debug('useCampaignRegisterForm', '📍 경로 변경 감지', {
      currentPath: location.pathname,
      isRegisterPage,
      isCropPage,
      shouldClear: !isRegisterPage && !isCropPage,
      timestamp: Date.now(),
    });
    
    // 등록 페이지가 아니고 크롭 페이지도 아니면 세션 데이터 삭제
    if (!isRegisterPage && !isCropPage) {
      debug('useCampaignRegisterForm', '📍 등록 페이지를 벗어남, 세션 데이터 삭제 시작', {
        newPath: location.pathname,
        previousPath: currentPathRef.current,
      });
      
      // 경로 ref 업데이트
      currentPathRef.current = location.pathname;
      
      debug('useCampaignRegisterForm', '📍 clearStorage 호출 전');
      clearStorage();
      debug('useCampaignRegisterForm', '📍 clearImageUrls 호출 전');
      clearImageUrls();
      debug('useCampaignRegisterForm', '📍 세션 데이터 삭제 완료');
    } else {
      debug('useCampaignRegisterForm', '📍 등록 페이지 또는 크롭 페이지이므로 세션 데이터 유지', {
        isRegisterPage,
        isCropPage,
      });
    }
  }, [location.pathname, clearStorage]);

  // 컴포넌트 언마운트 시에도 세션 데이터 초기화 (경로 변경 감지가 실행되지 않은 경우 대비)
  useEffect(() => {
    debug('useCampaignRegisterForm', '📦 cleanup useEffect 등록', {
      currentPath: location.pathname,
    });
    
    return () => {
      debug('useCampaignRegisterForm', '🧹 cleanup 함수 실행 시작', {
        currentPath: location.pathname,
        refPath: currentPathRef.current,
        windowPath: typeof window !== 'undefined' ? window.location.pathname : '',
        timestamp: Date.now(),
      });
      
      // cleanup 시점에는 이미 경로가 변경되었을 수 있으므로 window.location 확인
      const windowPath = typeof window !== 'undefined' ? window.location.pathname : '';
      const isCropPage = windowPath === '/image/crop';
      const isRegisterPage = windowPath === '/campaigns/register';
      
      debug('useCampaignRegisterForm', '🧹 cleanup 경로 확인', {
        windowPath,
        isCropPage,
        isRegisterPage,
        shouldClear: !isCropPage && !isRegisterPage,
      });
      
      // 크롭 페이지가 아니고 등록 페이지도 아니면 세션 데이터 삭제
      if (!isCropPage && !isRegisterPage) {
        debug('useCampaignRegisterForm', '🧹 cleanup에서 세션 데이터 삭제 시작');
        clearStorage();
        clearImageUrls();
        debug('useCampaignRegisterForm', '🧹 cleanup에서 세션 데이터 삭제 완료');
      } else {
        debug('useCampaignRegisterForm', '🧹 cleanup에서 세션 데이터 유지', {
          isCropPage,
          isRegisterPage,
        });
      }
    };
  }, [clearStorage, location.pathname]);

  // 협의 가능이 체크되어 있으면 수당 필드 초기화
  useEffect(() => {
    if (formData.feeNegotiable && formData.fee.trim() !== '') {
      updateField('fee', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.feeNegotiable]); // feeNegotiable이 변경될 때만 실행

  const handleInputChange = useCallback((field: keyof CampaignFormData, value: string | boolean) => {
    updateField(field, value);
  }, [updateField]);

  const handleImageSelect = useCallback((file: File, type: 'cover' | 'product' | 'liveCover') => {
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
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        } catch (error) {
          // 저장 실패는 무시
        }
      }
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
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        } catch (error) {
          // 저장 실패는 무시
        }
      }
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
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        } catch (error) {
          // 저장 실패는 무시
        }
      }
    }
  }, [coverImageUrl, productImageUrl, liveCoverImageUrl, formData]);

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

