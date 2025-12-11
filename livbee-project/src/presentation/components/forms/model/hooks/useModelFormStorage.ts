import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import type { ModelFormData, ModelToggleState } from '@/presentation/components/forms/model/types';
import { clearImageUrls, getStoredImageUrls } from '@/presentation/components/forms/model/utils/modelImageStorage';
import { debug } from '@/shared/utils/logger';

const FORM_STORAGE_KEY = 'model-register-form';
const TOGGLE_STORAGE_KEY = 'model-register-toggles';

const INITIAL_FORM_DATA: ModelFormData = {
  name: '',
  registrationType: '',
  oneLineIntro: '',
  detailedIntro: '',
  websites: [
    { related: '', content: '' },
    { related: '', content: '' },
    { related: '', content: '' },
  ],
  contact: '',
  openChat: '',
  tags: [
    { label: '키', value: '' },
    { label: '몸무게', value: '' },
    { label: '사이즈', value: '' },
    { label: '경력', value: '' },
    { label: '나이', value: '' },
  ],
};

const INITIAL_TOGGLE_STATE: ModelToggleState = {
  websites: [true, true, true],
  contact: true,
  openChat: true,
  tags: [true, true, true, true, true],
};

interface UseModelFormStorageOptions {
  formData: ModelFormData;
  setFormData: (data: ModelFormData) => void;
  toggles: ModelToggleState;
  setToggles: (data: ModelToggleState) => void;
  hasStoredImages: boolean;
  mainThumbnailUrl: string;
  galleryImageUrls: string[];
  onClearImageStates?: () => void;
  onImageRestored?: () => void;
}

/**
 * 모델 등록 폼의 sessionStorage 관리 로직을 처리하는 훅
 */
export const useModelFormStorage = ({
  formData,
  setFormData,
  toggles,
  setToggles,
  hasStoredImages,
  mainThumbnailUrl,
  galleryImageUrls,
  onClearImageStates,
  onImageRestored,
}: UseModelFormStorageOptions) => {
  const location = useLocation();
  const currentPathRef = useRef(location.pathname);
  const isInitialMountRef = useRef(true);
  const restoredDataRef = useRef<{ formData: ModelFormData; toggles: ModelToggleState } | null>(null);
  const isRestoringRef = useRef(false);

  // sessionStorage에서 폼 데이터를 삭제하는 함수
  const clearStorage = useCallback(() => {
    debug('useModelFormStorage', '🗑️ clearStorage 호출', {
      formStorageKey: FORM_STORAGE_KEY,
      toggleStorageKey: TOGGLE_STORAGE_KEY,
      hasFormStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(FORM_STORAGE_KEY) : false,
      hasToggleStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(TOGGLE_STORAGE_KEY) : false,
    });

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(FORM_STORAGE_KEY);
        sessionStorage.removeItem(TOGGLE_STORAGE_KEY);
        debug('useModelFormStorage', '🗑️ clearStorage 완료');
      } catch (error) {
        debug('useModelFormStorage', '🗑️ clearStorage 실패', { error });
      }
    }
  }, []);

  // sessionStorage에 폼 데이터 저장
  const saveFormData = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        debug('useModelFormStorage', '💾 saveFormData 호출');
        sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
        sessionStorage.setItem(TOGGLE_STORAGE_KEY, JSON.stringify(toggles));
        debug('useModelFormStorage', '✅ saveFormData 완료');
      } catch (error) {
        debug('useModelFormStorage', '💾 saveFormData 실패', { error });
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
      debug('useModelFormStorage', '⚠️ restoreFormDataWithoutClear: window is undefined');
      return false;
    }
    
    try {
      const storedForm = sessionStorage.getItem(FORM_STORAGE_KEY);
      const storedToggles = sessionStorage.getItem(TOGGLE_STORAGE_KEY);
      
      debug('useModelFormStorage', '🔍 restoreFormDataWithoutClear 호출', {
        hasStoredForm: !!storedForm,
        hasStoredToggles: !!storedToggles,
      });
      
      if (storedForm || storedToggles) {
        const parsedForm = storedForm ? (JSON.parse(storedForm) as Partial<ModelFormData>) : null;
        const parsedToggles = storedToggles ? (JSON.parse(storedToggles) as Partial<ModelToggleState>) : null;
        
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
        
        debug('useModelFormStorage', '✅ 폼 데이터 복원 완료 (clearStorage는 호출하지 않음)');
        return true;
      } else {
        debug('useModelFormStorage', '⚠️ restoreFormDataWithoutClear: 저장된 데이터 없음');
      }
    } catch (error) {
      debug('useModelFormStorage', '❌ 폼 데이터 복원 실패', { error });
    }
    return false;
  }, [setFormData, setToggles]);

  // 초기 마운트 시 폼 데이터 복원 또는 초기화
  useEffect(() => {
    if (isInitialMountRef.current) {
      debug('useModelFormStorage', '🚀 초기 마운트 시작', {
        hasStoredImages,
        currentPath: location.pathname,
      });
      
      if (typeof window !== 'undefined') {
        const storedForm = sessionStorage.getItem(FORM_STORAGE_KEY);
        const storedToggles = sessionStorage.getItem(TOGGLE_STORAGE_KEY);
        
        debug('useModelFormStorage', '📦 초기 마운트 시 sessionStorage 확인', {
          hasStoredForm: !!storedForm,
          hasStoredToggles: !!storedToggles,
          hasStoredImages,
        });
        
        if (storedForm || storedToggles) {
          debug('useModelFormStorage', '📦 초기 마운트 시 폼 데이터 복원 시도 (clearStorage 없이)');
          isRestoringRef.current = true;
          restoreFormDataWithoutClear();
          
          if (!hasStoredImages) {
            setTimeout(() => {
              clearStorage();
              isRestoringRef.current = false;
              debug('useModelFormStorage', '🗑️ 초기 마운트 시 이미지 없음, sessionStorage 삭제');
            }, 500);
          }
        } else {
          debug('useModelFormStorage', '🔄 초기 마운트 시 폼 데이터 초기화 (저장된 데이터 없음)');
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
    
    debug('useModelFormStorage', '🖼️ 이미지 URL 변경 감지', {
      imageUrlsChanged,
      mainThumbnailUrl: !!mainThumbnailUrl,
      galleryImageUrls: galleryImageUrls.length,
    });
    
    if (typeof window !== 'undefined') {
      const storedForm = sessionStorage.getItem(FORM_STORAGE_KEY);
      const storedToggles = sessionStorage.getItem(TOGGLE_STORAGE_KEY);
      const restoredData = restoredDataRef.current;
      
      if (imageUrlsChanged && restoredData) {
        debug('useModelFormStorage', '🔄 이미지 복원 감지, 폼 데이터 복원 시작');
        isRestoringRef.current = true;
        setFormData(restoredData.formData);
        setToggles(restoredData.toggles);
        
        setTimeout(() => {
          clearStorage();
          restoredDataRef.current = null;
          isRestoringRef.current = false;
          debug('useModelFormStorage', '🗑️ 이미지 복원 후 폼 데이터 복원 완료, sessionStorage 삭제');
        }, 500);
        
        onImageRestored?.();
      } else if (imageUrlsChanged && (storedForm || storedToggles)) {
        const restored = restoreFormDataWithoutClear();
        if (restored) {
          setTimeout(() => {
            clearStorage();
            debug('useModelFormStorage', '🗑️ 이미지 복원 후 폼 데이터 복원 완료, sessionStorage 삭제');
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
    const isRegisterPage = location.pathname === '/models/register';
    const isCropPage = location.pathname === '/image/crop';

    debug('useModelFormStorage', '📍 경로 변경 감지', {
      currentPath: location.pathname,
      isRegisterPage,
      isCropPage,
      shouldClear: !isRegisterPage && !isCropPage,
    });

    if (!isRegisterPage && !isCropPage) {
      debug('useModelFormStorage', '📍 등록 페이지를 벗어남, 세션 데이터 삭제');
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
      const isRegisterPage = windowPath === '/models/register';

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

