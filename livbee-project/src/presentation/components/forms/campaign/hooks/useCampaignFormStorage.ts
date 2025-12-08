import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import type { CampaignFormData } from '@/presentation/components/forms/campaign/types';
import { clearImageUrls } from '@/presentation/components/forms/campaign/utils/campaignImageStorage';
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

interface UseCampaignFormStorageOptions {
  formData: CampaignFormData;
  setFormData: (data: CampaignFormData) => void;
  hasStoredImages: boolean;
  coverImageUrl: string;
  productImageUrl: string;
  liveCoverImageUrl: string;
  onClearImageStates?: () => void;
}

/**
 * 캠페인 등록 폼의 sessionStorage 관리 로직을 처리하는 훅
 */
export const useCampaignFormStorage = ({
  formData,
  setFormData,
  hasStoredImages,
  coverImageUrl,
  productImageUrl,
  liveCoverImageUrl,
  onClearImageStates,
}: UseCampaignFormStorageOptions) => {
  const location = useLocation();
  const currentPathRef = useRef(location.pathname);
  const isInitialMountRef = useRef(true);

  // sessionStorage에서 폼 데이터를 삭제하는 함수
  const clearStorage = useCallback(() => {
    debug('useCampaignFormStorage', '🗑️ clearStorage 호출', {
      storageKey: STORAGE_KEY,
      hasStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(STORAGE_KEY) : false,
    });

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
        debug('useCampaignFormStorage', '🗑️ clearStorage 완료', {
          storageKey: STORAGE_KEY,
          hasStorage: !!sessionStorage.getItem(STORAGE_KEY),
        });
      } catch (error) {
        debug('useCampaignFormStorage', '🗑️ clearStorage 실패', { error });
        // 삭제 실패는 무시
      }
    }
  }, []);

  // sessionStorage에 폼 데이터 저장
  const saveFormData = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch (error) {
        debug('useCampaignFormStorage', '💾 saveFormData 실패', { error });
        // 저장 실패는 무시
      }
    }
  }, [formData]);

  // 경로 변경 시 ref 업데이트
  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  // 초기 마운트 시 폼 데이터 복원 또는 초기화
  useEffect(() => {
    if (isInitialMountRef.current) {
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
      isInitialMountRef.current = false;
    }
  }, [hasStoredImages, setFormData]);

  // 페이지를 벗어났다가 돌아올 때 데이터 초기화 감지
  useEffect(() => {
    const handleVisibilityChange = () => {
      // 페이지가 다시 보이게 되었을 때
      if (document.visibilityState === 'visible') {
        const { getStoredImageUrls } = require('@/presentation/components/forms/campaign/utils/campaignImageStorage');
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
          clearStorage();
          onClearImageStates?.();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [setFormData, coverImageUrl, productImageUrl, liveCoverImageUrl, clearStorage, onClearImageStates]);

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

    debug('useCampaignFormStorage', '📍 경로 변경 감지', {
      currentPath: location.pathname,
      isRegisterPage,
      isCropPage,
      shouldClear: !isRegisterPage && !isCropPage,
      timestamp: Date.now(),
    });

    // 등록 페이지가 아니고 크롭 페이지도 아니면 세션 데이터 삭제
    if (!isRegisterPage && !isCropPage) {
      debug('useCampaignFormStorage', '📍 등록 페이지를 벗어남, 세션 데이터 삭제 시작', {
        newPath: location.pathname,
        previousPath: currentPathRef.current,
      });

      // 경로 ref 업데이트
      currentPathRef.current = location.pathname;

      debug('useCampaignFormStorage', '📍 clearStorage 호출 전');
      clearStorage();
      debug('useCampaignFormStorage', '📍 clearImageUrls 호출 전');
      clearImageUrls();
      debug('useCampaignFormStorage', '📍 세션 데이터 삭제 완료');
    } else {
      debug('useCampaignFormStorage', '📍 등록 페이지 또는 크롭 페이지이므로 세션 데이터 유지', {
        isRegisterPage,
        isCropPage,
      });
    }
  }, [location.pathname, clearStorage]);

  // 컴포넌트 언마운트 시에도 세션 데이터 초기화 (경로 변경 감지가 실행되지 않은 경우 대비)
  useEffect(() => {
    debug('useCampaignFormStorage', '📦 cleanup useEffect 등록', {
      currentPath: location.pathname,
    });

    return () => {
      debug('useCampaignFormStorage', '🧹 cleanup 함수 실행 시작', {
        currentPath: location.pathname,
        refPath: currentPathRef.current,
        windowPath: typeof window !== 'undefined' ? window.location.pathname : '',
        timestamp: Date.now(),
      });

      // cleanup 시점에는 이미 경로가 변경되었을 수 있으므로 window.location 확인
      const windowPath = typeof window !== 'undefined' ? window.location.pathname : '';
      const isCropPage = windowPath === '/image/crop';
      const isRegisterPage = windowPath === '/campaigns/register';

      debug('useCampaignFormStorage', '🧹 cleanup 경로 확인', {
        windowPath,
        isCropPage,
        isRegisterPage,
        shouldClear: !isCropPage && !isRegisterPage,
      });

      // 크롭 페이지가 아니고 등록 페이지도 아니면 세션 데이터 삭제
      if (!isCropPage && !isRegisterPage) {
        debug('useCampaignFormStorage', '🧹 cleanup에서 세션 데이터 삭제 시작');
        clearStorage();
        clearImageUrls();
        debug('useCampaignFormStorage', '🧹 cleanup에서 세션 데이터 삭제 완료');
      } else {
        debug('useCampaignFormStorage', '🧹 cleanup에서 세션 데이터 유지', {
          isCropPage,
          isRegisterPage,
        });
      }
    };
  }, [clearStorage, location.pathname]);

  return {
    clearStorage,
    saveFormData,
  };
};

