import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { debug } from '@/shared/utils/logger';

interface UseFormStorageOptions<TFormData, TToggleState> {
  formData: TFormData;
  setFormData: (data: TFormData) => void;
  toggles: TToggleState;
  setToggles: (data: TToggleState) => void;
  hasStoredImages: boolean;
  mainThumbnailUrl: string;
  galleryImageUrls: string[];
  onImageRestored?: () => void;
  formStorageKey: string;
  toggleStorageKey: string;
  initialFormData: TFormData;
  initialToggleState: TToggleState;
  registerPagePath: string;
  clearImageUrls: () => void;
  hookName: string;
}

/**
 * 제네릭 폼 스토리지 관리 훅
 * 포트폴리오와 모델 등록 폼에서 공통으로 사용하는 sessionStorage 관리 로직
 */
export const useFormStorage = <TFormData, TToggleState>({
  formData,
  setFormData,
  toggles,
  setToggles,
  hasStoredImages,
  mainThumbnailUrl,
  galleryImageUrls,
  onImageRestored,
  formStorageKey,
  toggleStorageKey,
  initialFormData,
  initialToggleState,
  registerPagePath,
  clearImageUrls,
  hookName,
}: UseFormStorageOptions<TFormData, TToggleState>) => {
  const location = useLocation();
  const currentPathRef = useRef(location.pathname);
  const isInitialMountRef = useRef(true);
  const restoredDataRef = useRef<{ formData: TFormData; toggles: TToggleState } | null>(null);
  const isRestoringRef = useRef(false);

  // sessionStorage에서 폼 데이터를 삭제하는 함수
  const clearStorage = useCallback(() => {
    debug(hookName, '🗑️ clearStorage 호출', {
      formStorageKey,
      toggleStorageKey,
      hasFormStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(formStorageKey) : false,
      hasToggleStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(toggleStorageKey) : false,
    });

    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(formStorageKey);
        sessionStorage.removeItem(toggleStorageKey);
        debug(hookName, '🗑️ clearStorage 완료');
      } catch (error) {
        debug(hookName, '🗑️ clearStorage 실패', { error });
      }
    }
  }, [formStorageKey, toggleStorageKey, hookName]);

  // sessionStorage에 폼 데이터 저장
  const saveFormData = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        debug(hookName, '💾 saveFormData 호출');
        sessionStorage.setItem(formStorageKey, JSON.stringify(formData));
        sessionStorage.setItem(toggleStorageKey, JSON.stringify(toggles));
        debug(hookName, '✅ saveFormData 완료');
      } catch (error) {
        debug(hookName, '💾 saveFormData 실패', { error });
      }
    }
  }, [formData, toggles, formStorageKey, toggleStorageKey, hookName]);

  // 경로 변경 시 ref 업데이트
  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  // 폼 데이터 복원 함수 (clearStorage 없이)
  const restoreFormDataWithoutClear = useCallback(() => {
    if (typeof window === 'undefined') {
      debug(hookName, '⚠️ restoreFormDataWithoutClear: window is undefined');
      return false;
    }
    
    try {
      const storedForm = sessionStorage.getItem(formStorageKey);
      const storedToggles = sessionStorage.getItem(toggleStorageKey);
      
      debug(hookName, '🔍 restoreFormDataWithoutClear 호출', {
        hasStoredForm: !!storedForm,
        hasStoredToggles: !!storedToggles,
      });
      
      if (storedForm || storedToggles) {
        const parsedForm = storedForm ? (JSON.parse(storedForm) as Partial<TFormData>) : null;
        const parsedToggles = storedToggles ? (JSON.parse(storedToggles) as Partial<TToggleState>) : null;
        
        const restoredFormData = {
          ...initialFormData,
          ...parsedForm,
        } as TFormData;
        
        const restoredToggles = {
          ...initialToggleState,
          ...parsedToggles,
        } as TToggleState;
        
        // 복원한 데이터를 ref에 저장
        restoredDataRef.current = { formData: restoredFormData, toggles: restoredToggles };
        isRestoringRef.current = true;
        setFormData(restoredFormData);
        setToggles(restoredToggles);
        
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 300);
        
        debug(hookName, '✅ 폼 데이터 복원 완료 (clearStorage는 호출하지 않음)');
        return true;
      } else {
        debug(hookName, '⚠️ restoreFormDataWithoutClear: 저장된 데이터 없음');
      }
    } catch (error) {
      debug(hookName, '❌ 폼 데이터 복원 실패', { error });
    }
    return false;
  }, [setFormData, setToggles, formStorageKey, toggleStorageKey, initialFormData, initialToggleState, hookName]);

  // 초기 마운트 시 폼 데이터 복원 또는 초기화
  useEffect(() => {
    if (isInitialMountRef.current) {
      debug(hookName, '🚀 초기 마운트 시작', {
        hasStoredImages,
        currentPath: location.pathname,
      });
      
      if (typeof window !== 'undefined') {
        const storedForm = sessionStorage.getItem(formStorageKey);
        const storedToggles = sessionStorage.getItem(toggleStorageKey);
        
        debug(hookName, '📦 초기 마운트 시 sessionStorage 확인', {
          hasStoredForm: !!storedForm,
          hasStoredToggles: !!storedToggles,
          hasStoredImages,
        });
        
        if (storedForm || storedToggles) {
          debug(hookName, '📦 초기 마운트 시 폼 데이터 복원 시도 (clearStorage 없이)');
          isRestoringRef.current = true;
          restoreFormDataWithoutClear();
          
          if (!hasStoredImages) {
            setTimeout(() => {
              clearStorage();
              isRestoringRef.current = false;
              debug(hookName, '🗑️ 초기 마운트 시 이미지 없음, sessionStorage 삭제');
            }, 500);
          }
        } else {
          debug(hookName, '🔄 초기 마운트 시 폼 데이터 초기화 (저장된 데이터 없음)');
          setFormData(initialFormData);
          setToggles(initialToggleState);
        }
      } else {
        setFormData(initialFormData);
        setToggles(initialToggleState);
      }
      isInitialMountRef.current = false;
    }
  }, [setFormData, setToggles, restoreFormDataWithoutClear, hasStoredImages, location.pathname, clearStorage, formStorageKey, toggleStorageKey, initialFormData, initialToggleState, hookName]);

  // 이미지 복원 후 폼 데이터 복원
  const previousImageUrlsRef = useRef({ mainThumbnail: '', gallery: [] as string[] });
  useEffect(() => {
    const imageUrlsChanged = 
      previousImageUrlsRef.current.mainThumbnail !== mainThumbnailUrl ||
      JSON.stringify(previousImageUrlsRef.current.gallery) !== JSON.stringify(galleryImageUrls);
    
    debug(hookName, '🖼️ 이미지 URL 변경 감지', {
      imageUrlsChanged,
      mainThumbnailUrl: !!mainThumbnailUrl,
      galleryImageUrls: galleryImageUrls.length,
    });
    
    if (typeof window !== 'undefined') {
      const storedForm = sessionStorage.getItem(formStorageKey);
      const storedToggles = sessionStorage.getItem(toggleStorageKey);
      const restoredData = restoredDataRef.current;
      
      if (imageUrlsChanged && restoredData) {
        debug(hookName, '🔄 이미지 복원 감지, 폼 데이터 복원 시작');
        isRestoringRef.current = true;
        setFormData(restoredData.formData);
        setToggles(restoredData.toggles);
        
        setTimeout(() => {
          clearStorage();
          restoredDataRef.current = null;
          isRestoringRef.current = false;
          debug(hookName, '🗑️ 이미지 복원 후 폼 데이터 복원 완료, sessionStorage 삭제');
        }, 500);
        
        onImageRestored?.();
      } else if (imageUrlsChanged && (storedForm || storedToggles)) {
        const restored = restoreFormDataWithoutClear();
        if (restored) {
          setTimeout(() => {
            clearStorage();
            debug(hookName, '🗑️ 이미지 복원 후 폼 데이터 복원 완료, sessionStorage 삭제');
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
  }, [mainThumbnailUrl, galleryImageUrls, formData, toggles, restoreFormDataWithoutClear, onImageRestored, setFormData, setToggles, clearStorage, formStorageKey, toggleStorageKey, hookName]);

  // 경로 변경 감지: 등록 페이지를 벗어날 때 데이터 초기화
  useEffect(() => {
    const isRegisterPage = location.pathname === registerPagePath;
    const isCropPage = location.pathname === '/image/crop';

    debug(hookName, '📍 경로 변경 감지', {
      currentPath: location.pathname,
      isRegisterPage,
      isCropPage,
      shouldClear: !isRegisterPage && !isCropPage,
    });

    if (!isRegisterPage && !isCropPage) {
      debug(hookName, '📍 등록 페이지를 벗어남, 세션 데이터 삭제');
      currentPathRef.current = location.pathname;
      clearStorage();
      clearImageUrls();
    }
  }, [location.pathname, clearStorage, registerPagePath, clearImageUrls, hookName]);

  // 컴포넌트 언마운트 시에도 세션 데이터 초기화
  useEffect(() => {
    return () => {
      const windowPath = typeof window !== 'undefined' ? window.location.pathname : '';
      const isCropPage = windowPath === '/image/crop';
      const isRegisterPage = windowPath === registerPagePath;

      if (!isCropPage && !isRegisterPage) {
        clearStorage();
        clearImageUrls();
      }
    };
  }, [clearStorage, registerPagePath, clearImageUrls]);

  return {
    clearStorage,
    saveFormData,
  };
};

