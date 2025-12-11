import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import type { PortfolioFormData, PortfolioToggleState } from '@/presentation/components/forms/portfolio/types';
import { clearImageUrls } from '@/presentation/components/forms/portfolio/utils/portfolioImageStorage';
import { debug } from '@/shared/utils/logger';

const FORM_STORAGE_KEY = 'portfolio-register-form';
const TOGGLE_STORAGE_KEY = 'portfolio-register-toggles';

const INITIAL_FORM_DATA: PortfolioFormData = {
  registrationType: '',
  name: '',
  oneLineIntro: '',
  detailedIntro: '',
  websites: ['', '', ''],
  recentLiveLink: '',
  contact: '',
  openChat: '',
  tags: ['', '', '', '', ''],
};

const INITIAL_TOGGLE_STATE: PortfolioToggleState = {
  websites: [true, true, true],
  contact: true,
  openChat: true,
  tags: [true, true, true, true, true],
};

interface UsePortfolioFormStorageOptions {
  formData: PortfolioFormData;
  setFormData: (data: PortfolioFormData) => void;
  toggles: PortfolioToggleState;
  setToggles: (data: PortfolioToggleState) => void;
  hasStoredImages: boolean;
  mainThumbnailUrl: string;
  galleryImageUrls: string[];
  onImageRestored?: () => void;
}

/**
 * 포트폴리오 등록 폼의 sessionStorage 관리 로직을 처리하는 훅
 */
export const usePortfolioFormStorage = ({
  formData,
  setFormData,
  toggles,
  setToggles,
  hasStoredImages,
  mainThumbnailUrl,
  galleryImageUrls,
  onImageRestored,
}: UsePortfolioFormStorageOptions) => {
  const location = useLocation();
  const currentPathRef = useRef(location.pathname);
  const isInitialMountRef = useRef(true);
  const restoredDataRef = useRef<{ formData: PortfolioFormData; toggles: PortfolioToggleState } | null>(null);
  const isRestoringRef = useRef(false);

  // sessionStorage에서 폼 데이터를 삭제하는 함수
  const clearStorage = useCallback(() => {
    debug('usePortfolioFormStorage', '🗑️ clearStorage 호출', {
      formStorageKey: FORM_STORAGE_KEY,
      toggleStorageKey: TOGGLE_STORAGE_KEY,
      hasFormStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(FORM_STORAGE_KEY) : false,
      hasToggleStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(TOGGLE_STORAGE_KEY) : false,
    });

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(FORM_STORAGE_KEY);
        sessionStorage.removeItem(TOGGLE_STORAGE_KEY);
        debug('usePortfolioFormStorage', '🗑️ clearStorage 완료');
      } catch (error) {
        debug('usePortfolioFormStorage', '🗑️ clearStorage 실패', { error });
      }
    }
  }, []);

  // sessionStorage에 폼 데이터 저장
  const saveFormData = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        debug('usePortfolioFormStorage', '💾 saveFormData 호출');
        sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
        sessionStorage.setItem(TOGGLE_STORAGE_KEY, JSON.stringify(toggles));
        debug('usePortfolioFormStorage', '✅ saveFormData 완료');
      } catch (error) {
        debug('usePortfolioFormStorage', '💾 saveFormData 실패', { error });
      }
    }
  }, [formData, toggles]);

  // 경로 변경 시 ref 업데이트
  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  // 폼 데이터 복원 함수 (clearStorage 없이)
  const restoreFormDataWithoutClear = useCallback(() => {
    if (typeof window === 'undefined') {
      debug('usePortfolioFormStorage', '⚠️ restoreFormDataWithoutClear: window is undefined');
      return false;
    }
    
    try {
      const storedForm = sessionStorage.getItem(FORM_STORAGE_KEY);
      const storedToggles = sessionStorage.getItem(TOGGLE_STORAGE_KEY);
      
      debug('usePortfolioFormStorage', '🔍 restoreFormDataWithoutClear 호출', {
        hasStoredForm: !!storedForm,
        hasStoredToggles: !!storedToggles,
      });
      
      if (storedForm || storedToggles) {
        const parsedForm = storedForm ? (JSON.parse(storedForm) as Partial<PortfolioFormData>) : null;
        const parsedToggles = storedToggles ? (JSON.parse(storedToggles) as Partial<PortfolioToggleState>) : null;
        
        const restoredFormData = {
          ...INITIAL_FORM_DATA,
          ...parsedForm,
        };
        
        const restoredToggles = {
          ...INITIAL_TOGGLE_STATE,
          ...parsedToggles,
        };
        
        // 복원한 데이터를 ref에 저장
        restoredDataRef.current = { formData: restoredFormData, toggles: restoredToggles };
        isRestoringRef.current = true;
        setFormData(restoredFormData);
        setToggles(restoredToggles);
        
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 300);
        
        debug('usePortfolioFormStorage', '✅ 폼 데이터 복원 완료 (clearStorage는 호출하지 않음)');
        return true;
      } else {
        debug('usePortfolioFormStorage', '⚠️ restoreFormDataWithoutClear: 저장된 데이터 없음');
      }
    } catch (error) {
      debug('usePortfolioFormStorage', '❌ 폼 데이터 복원 실패', { error });
    }
    return false;
  }, [setFormData, setToggles]);

  // 초기 마운트 시 폼 데이터 복원 또는 초기화
  useEffect(() => {
    if (isInitialMountRef.current) {
      debug('usePortfolioFormStorage', '🚀 초기 마운트 시작', {
        hasStoredImages,
        currentPath: location.pathname,
      });
      
      if (typeof window !== 'undefined') {
        const storedForm = sessionStorage.getItem(FORM_STORAGE_KEY);
        const storedToggles = sessionStorage.getItem(TOGGLE_STORAGE_KEY);
        
        debug('usePortfolioFormStorage', '📦 초기 마운트 시 sessionStorage 확인', {
          hasStoredForm: !!storedForm,
          hasStoredToggles: !!storedToggles,
          hasStoredImages,
        });
        
        if (storedForm || storedToggles) {
          debug('usePortfolioFormStorage', '📦 초기 마운트 시 폼 데이터 복원 시도 (clearStorage 없이)');
          isRestoringRef.current = true;
          restoreFormDataWithoutClear();
          
          if (!hasStoredImages) {
            setTimeout(() => {
              clearStorage();
              isRestoringRef.current = false;
              debug('usePortfolioFormStorage', '🗑️ 초기 마운트 시 이미지 없음, sessionStorage 삭제');
            }, 500);
          }
        } else {
          debug('usePortfolioFormStorage', '🔄 초기 마운트 시 폼 데이터 초기화 (저장된 데이터 없음)');
          setFormData(INITIAL_FORM_DATA);
          setToggles(INITIAL_TOGGLE_STATE);
        }
      } else {
        setFormData(INITIAL_FORM_DATA);
        setToggles(INITIAL_TOGGLE_STATE);
      }
      isInitialMountRef.current = false;
    }
  }, [setFormData, setToggles, restoreFormDataWithoutClear, hasStoredImages, location.pathname, clearStorage]);

  // 이미지 복원 후 폼 데이터 복원
  const previousImageUrlsRef = useRef({ mainThumbnail: '', gallery: [] as string[] });
  useEffect(() => {
    const imageUrlsChanged = 
      previousImageUrlsRef.current.mainThumbnail !== mainThumbnailUrl ||
      JSON.stringify(previousImageUrlsRef.current.gallery) !== JSON.stringify(galleryImageUrls);
    
    debug('usePortfolioFormStorage', '🖼️ 이미지 URL 변경 감지', {
      imageUrlsChanged,
      mainThumbnailUrl: !!mainThumbnailUrl,
      galleryImageUrls: galleryImageUrls.length,
    });
    
    if (typeof window !== 'undefined') {
      const storedForm = sessionStorage.getItem(FORM_STORAGE_KEY);
      const storedToggles = sessionStorage.getItem(TOGGLE_STORAGE_KEY);
      const restoredData = restoredDataRef.current;
      
      if (imageUrlsChanged && restoredData) {
        debug('usePortfolioFormStorage', '🔄 이미지 복원 감지, 폼 데이터 복원 시작');
        isRestoringRef.current = true;
        setFormData(restoredData.formData);
        setToggles(restoredData.toggles);
        
        setTimeout(() => {
          clearStorage();
          restoredDataRef.current = null;
          isRestoringRef.current = false;
          debug('usePortfolioFormStorage', '🗑️ 이미지 복원 후 폼 데이터 복원 완료, sessionStorage 삭제');
        }, 500);
        
        onImageRestored?.();
      } else if (imageUrlsChanged && (storedForm || storedToggles)) {
        const restored = restoreFormDataWithoutClear();
        if (restored) {
          setTimeout(() => {
            clearStorage();
            debug('usePortfolioFormStorage', '🗑️ 이미지 복원 후 폼 데이터 복원 완료, sessionStorage 삭제');
          }, 300);
        }
        onImageRestored?.();
      } else if (!imageUrlsChanged && (storedForm || storedToggles)) {
        clearStorage();
      }
      
      previousImageUrlsRef.current = {
        mainThumbnail: mainThumbnailUrl,
        gallery: galleryImageUrls,
      };
    }
  }, [mainThumbnailUrl, galleryImageUrls, formData, toggles, restoreFormDataWithoutClear, onImageRestored, setFormData, setToggles, clearStorage]);

  // 경로 변경 감지: 등록 페이지를 벗어날 때 데이터 초기화
  useEffect(() => {
    const isRegisterPage = location.pathname === '/portfolios/register';
    const isCropPage = location.pathname === '/image/crop';

    debug('usePortfolioFormStorage', '📍 경로 변경 감지', {
      currentPath: location.pathname,
      isRegisterPage,
      isCropPage,
      shouldClear: !isRegisterPage && !isCropPage,
    });

    if (!isRegisterPage && !isCropPage) {
      debug('usePortfolioFormStorage', '📍 등록 페이지를 벗어남, 세션 데이터 삭제');
      currentPathRef.current = location.pathname;
      clearStorage();
      clearImageUrls();
    }
  }, [location.pathname, clearStorage]);

  // 컴포넌트 언마운트 시에도 세션 데이터 초기화
  useEffect(() => {
    return () => {
      const windowPath = typeof window !== 'undefined' ? window.location.pathname : '';
      const isCropPage = windowPath === '/image/crop';
      const isRegisterPage = windowPath === '/portfolios/register';

      if (!isCropPage && !isRegisterPage) {
        clearStorage();
        clearImageUrls();
      }
    };
  }, [clearStorage]);

  return {
    clearStorage,
    saveFormData,
  };
};

