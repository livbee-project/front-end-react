import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import type { CampaignFormData } from '@/presentation/components/forms/campaign/types';
import { clearImageUrls, getStoredImageUrls } from '@/presentation/components/forms/campaign/utils/campaignImageStorage';
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
  qualifications: [],
};

interface UseCampaignFormStorageOptions {
  formData: CampaignFormData;
  setFormData: (data: CampaignFormData) => void;
  hasStoredImages: boolean;
  coverImageUrl: string;
  productImageUrl: string;
  liveCoverImageUrl: string;
  onClearImageStates?: () => void;
  onImageRestored?: () => void;
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
  onImageRestored,
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
        debug('useCampaignFormStorage', '💾 saveFormData 호출', {
          qualifications: formData.qualifications,
          qualificationsLength: Array.isArray(formData.qualifications) ? formData.qualifications.length : 0,
        });
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        debug('useCampaignFormStorage', '✅ saveFormData 완료', {
          stored: sessionStorage.getItem(STORAGE_KEY) ? '있음' : '없음',
        });
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

  // 폼 데이터 복원 함수 (clearStorage 없이)
  const restoreFormDataWithoutClear = useCallback(() => {
    if (typeof window === 'undefined') {
      debug('useCampaignFormStorage', '⚠️ restoreFormDataWithoutClear: window is undefined');
      return false;
    }
    
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      debug('useCampaignFormStorage', '🔍 restoreFormDataWithoutClear 호출', {
        hasStored: !!stored,
        storageKey: STORAGE_KEY,
      });
      
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<CampaignFormData>;
        debug('useCampaignFormStorage', '📦 저장된 데이터 파싱', {
          hasQualifications: Array.isArray(parsed.qualifications),
          qualificationsLength: Array.isArray(parsed.qualifications) ? parsed.qualifications.length : 0,
          qualifications: parsed.qualifications,
        });
        
        // 기본값과 병합하여 누락된 필드(qualifications 등) 보완
        const restoredData = {
          ...INITIAL_FORM_DATA,
          ...parsed,
          // qualifications 필드가 없거나 배열이 아니면 기본값 사용
          qualifications: Array.isArray(parsed.qualifications)
            ? parsed.qualifications
            : INITIAL_FORM_DATA.qualifications,
        };
        
        debug('useCampaignFormStorage', '💾 복원할 데이터', {
          restoredQualifications: restoredData.qualifications,
          restoredQualificationsLength: restoredData.qualifications.length,
        });
        
        // 복원한 데이터를 ref에 저장 (이미지 복원 후 체크에서 사용)
        restoredDataRef.current = restoredData;
        isRestoringRef.current = true; // 복원 시작 플래그
        setFormData(restoredData);
        
        // 복원 완료 후 플래그 해제 (setFormData가 비동기이므로 약간의 지연 후)
        // formData가 업데이트될 시간을 확보하기 위해 300ms로 증가
        setTimeout(() => {
          isRestoringRef.current = false;
        }, 300);
        
        debug('useCampaignFormStorage', '✅ 폼 데이터 복원 완료 (clearStorage는 호출하지 않음)', {
          hasQualifications: Array.isArray(parsed.qualifications) && parsed.qualifications.length > 0,
          qualifications: restoredData.qualifications,
        });
        return true;
      } else {
        debug('useCampaignFormStorage', '⚠️ restoreFormDataWithoutClear: 저장된 데이터 없음');
      }
    } catch (error) {
      debug('useCampaignFormStorage', '❌ 폼 데이터 복원 실패', { error });
    }
    return false;
  }, [setFormData]);

  // 폼 데이터 복원 함수 (clearStorage 포함)
  const restoreFormData = useCallback(() => {
    const restored = restoreFormDataWithoutClear();
    if (restored) {
      // 복원 후 sessionStorage 삭제 (다음 진입 시 초기화를 위해)
      clearStorage();
    }
    return restored;
  }, [restoreFormDataWithoutClear, clearStorage]);

  // 초기 마운트 시 폼 데이터 복원 또는 초기화
  useEffect(() => {
    if (isInitialMountRef.current) {
      debug('useCampaignFormStorage', '🚀 초기 마운트 시작', {
        hasStoredImages,
        currentPath: location.pathname,
      });
      
      // sessionStorage에 폼 데이터가 있으면 복원 시도 (크롭 페이지에서 돌아온 경우)
      // hasStoredImages 체크를 제거하여 이미지 복원 전에도 폼 데이터를 복원할 수 있도록 함
      if (typeof window !== 'undefined') {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        debug('useCampaignFormStorage', '📦 초기 마운트 시 sessionStorage 확인', {
          hasStored: !!stored,
          hasStoredImages,
        });
        
        if (stored) {
          // 이미지가 있거나 없거나 상관없이 폼 데이터가 있으면 복원
          // (이미지 복원은 별도로 처리됨)
          // 초기 마운트에서는 clearStorage를 호출하지 않음 (이미지 복원 후 체크를 위해)
          debug('useCampaignFormStorage', '📦 초기 마운트 시 폼 데이터 복원 시도 (clearStorage 없이)');
          isRestoringRef.current = true; // 복원 시작 플래그
          restoreFormDataWithoutClear();
          
          // 이미지가 없으면 (일반적인 페이지 진입) 복원 후 sessionStorage 삭제
          // 이미지가 있으면 (크롭 페이지에서 돌아온 경우) 이미지 복원 후 체크에서 삭제
          if (!hasStoredImages) {
            setTimeout(() => {
              clearStorage();
              isRestoringRef.current = false; // 복원 완료 플래그
              debug('useCampaignFormStorage', '🗑️ 초기 마운트 시 이미지 없음, sessionStorage 삭제');
            }, 500);
          }
        } else {
          // 폼 데이터가 없으면 초기화
          debug('useCampaignFormStorage', '🔄 초기 마운트 시 폼 데이터 초기화 (저장된 데이터 없음)');
          setFormData(INITIAL_FORM_DATA);
        }
      } else {
        setFormData(INITIAL_FORM_DATA);
      }
      isInitialMountRef.current = false;
    }
  }, [setFormData, restoreFormDataWithoutClear, hasStoredImages, location.pathname, clearStorage]);

  // 이미지 복원 후 폼 데이터 복원 (이미지 복원이 먼저 일어나는 경우 대비)
  const previousImageUrlsRef = useRef({ cover: '', product: '', liveCover: '' });
  const restoredDataRef = useRef<CampaignFormData | null>(null); // 초기 마운트에서 복원한 데이터 저장
  const isRestoringRef = useRef(false); // 초기 마운트에서 복원 중인지 여부
  useEffect(() => {
    // 이미지가 복원되었는지 확인 (이전 값과 비교)
    const imageUrlsChanged = 
      previousImageUrlsRef.current.cover !== coverImageUrl ||
      previousImageUrlsRef.current.product !== productImageUrl ||
      previousImageUrlsRef.current.liveCover !== liveCoverImageUrl;
    
    debug('useCampaignFormStorage', '🖼️ 이미지 URL 변경 감지', {
      imageUrlsChanged,
      coverImageUrl: !!coverImageUrl,
      productImageUrl: !!productImageUrl,
      liveCoverImageUrl: !!liveCoverImageUrl,
      previousCover: !!previousImageUrlsRef.current.cover,
      previousProduct: !!previousImageUrlsRef.current.product,
      previousLiveCover: !!previousImageUrlsRef.current.liveCover,
    });
    
    // 이미지 URL이 변경되었을 때 또는 초기 마운트 복원 후 formData가 업데이트되지 않은 경우 폼 데이터 복원 체크
    // 초기 마운트에서 복원했지만 setFormData가 비동기라 아직 반영되지 않았을 수 있음
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      const restoredData = restoredDataRef.current; // 초기 마운트에서 복원한 데이터
      
      // 이미지 URL이 변경되지 않았어도, restoredDataRef가 있고 formData가 비어있으면 복원 필요
      const needsRestore = restoredData && (
        !formData.qualifications || 
        (Array.isArray(formData.qualifications) && 
         (formData.qualifications.length === 0 || 
          (formData.qualifications.length === 1 && formData.qualifications[0] === '')))
      );
      
      debug('useCampaignFormStorage', '🔍 복원 필요 여부 확인', {
        imageUrlsChanged,
        needsRestore,
        isRestoring: isRestoringRef.current,
        hasRestoredData: !!restoredData,
        currentQualifications: formData.qualifications,
        restoredQualifications: restoredData?.qualifications,
      });
      
      // 복원이 필요한 경우에는 isRestoring 플래그를 무시하고 복원 진행
      // (초기 마운트에서 복원했지만 formData가 아직 업데이트되지 않은 경우)
      if (isRestoringRef.current && !needsRestore) {
        debug('useCampaignFormStorage', '⏳ 초기 마운트 복원 중, 이미지 URL 변경 감지 useEffect 대기');
        // 이전 이미지 URL 업데이트만 수행
        previousImageUrlsRef.current = {
          cover: coverImageUrl,
          product: productImageUrl,
          liveCover: liveCoverImageUrl,
        };
        return;
      }
      
      // 이미지 URL이 변경되었거나 복원이 필요한 경우에만 복원 체크
      if (imageUrlsChanged || needsRestore) {
      
      debug('useCampaignFormStorage', '🔄 이미지 복원 후 폼 데이터 복원 체크', {
        hasStored: !!stored,
        hasRestoredData: !!restoredData,
        restoredQualifications: restoredData?.qualifications,
        currentQualifications: formData.qualifications,
        currentQualificationsLength: Array.isArray(formData.qualifications) ? formData.qualifications.length : 0,
      });
      
      // 초기 마운트에서 복원한 데이터가 있고, 현재 formData가 비어있으면 복원
      if (restoredData) {
        const currentQualificationsEmpty = !formData.qualifications || 
          (Array.isArray(formData.qualifications) && 
           (formData.qualifications.length === 0 || 
            (formData.qualifications.length === 1 && formData.qualifications[0] === '')));
        
        const qualificationsMatch = JSON.stringify(restoredData.qualifications) === JSON.stringify(formData.qualifications);
        
        debug('useCampaignFormStorage', '🔍 복원 조건 확인 (restoredDataRef 사용)', {
          hasRestoredQualifications: Array.isArray(restoredData.qualifications) && restoredData.qualifications.length > 0,
          currentQualificationsEmpty,
          qualificationsMatch,
          restoredQualifications: restoredData.qualifications,
          currentQualifications: formData.qualifications,
        });
        
        // 현재 qualifications가 비어있거나 다르면 복원
        if (currentQualificationsEmpty || !qualificationsMatch) {
          debug('useCampaignFormStorage', '🔄 이미지 복원 감지, 폼 데이터 복원 시작 (restoredDataRef 사용)', {
            restoredQualifications: restoredData.qualifications,
            currentQualifications: formData.qualifications,
            currentEmpty: currentQualificationsEmpty,
            match: qualificationsMatch,
          });
          
          // ref에 저장된 데이터로 직접 복원
          isRestoringRef.current = true; // 복원 시작 플래그
          setFormData(restoredData);
          // restoredDataRef는 formData가 업데이트될 때까지 유지 (다음 useEffect 실행에서 확인하기 위해)
          
          // 복원 성공 후 약간의 지연을 두고 sessionStorage 삭제 및 ref 초기화
          setTimeout(() => {
            clearStorage();
            restoredDataRef.current = null; // formData 업데이트 후 초기화
            isRestoringRef.current = false; // 복원 완료 플래그
            debug('useCampaignFormStorage', '🗑️ 이미지 복원 후 폼 데이터 복원 완료, sessionStorage 삭제');
          }, 500); // 300ms에서 500ms로 증가하여 formData 업데이트 시간 확보
          
          onImageRestored?.();
        } else {
          debug('useCampaignFormStorage', '✅ 이미 복원됨 (restoredDataRef), sessionStorage만 정리', {
            restoredQualifications: restoredData.qualifications,
            currentQualifications: formData.qualifications,
          });
          restoredDataRef.current = null; // 사용 후 초기화
          clearStorage();
        }
      } else if (stored) {
        // restoredDataRef가 없으면 sessionStorage에서 복원 시도
        try {
          const parsed = JSON.parse(stored) as Partial<CampaignFormData>;
          const hasStoredQualifications = Array.isArray(parsed.qualifications) && parsed.qualifications.length > 0;
          const currentQualificationsEmpty = !formData.qualifications || 
            (Array.isArray(formData.qualifications) && 
             (formData.qualifications.length === 0 || 
              (formData.qualifications.length === 1 && formData.qualifications[0] === '')));
          
          const qualificationsMatch = JSON.stringify(parsed.qualifications) === JSON.stringify(formData.qualifications);
          
          debug('useCampaignFormStorage', '🔍 복원 조건 확인 (sessionStorage 사용)', {
            hasStoredQualifications,
            currentQualificationsEmpty,
            qualificationsMatch,
            storedQualifications: parsed.qualifications,
            currentQualifications: formData.qualifications,
          });
          
          if (hasStoredQualifications && (currentQualificationsEmpty || !qualificationsMatch)) {
            debug('useCampaignFormStorage', '🔄 이미지 복원 감지, 폼 데이터 복원 시작 (sessionStorage 사용)', {
              storedQualifications: parsed.qualifications,
              currentQualifications: formData.qualifications,
            });
            const restored = restoreFormDataWithoutClear();
            if (restored) {
              setTimeout(() => {
                clearStorage();
                debug('useCampaignFormStorage', '🗑️ 이미지 복원 후 폼 데이터 복원 완료, sessionStorage 삭제');
              }, 300);
            }
            onImageRestored?.();
          } else {
            debug('useCampaignFormStorage', '⏭️ 복원 조건 불만족, 복원 건너뜀', {
              hasStoredQualifications,
              currentQualificationsEmpty,
              qualificationsMatch,
            });
            clearStorage();
          }
        } catch (error) {
          debug('useCampaignFormStorage', '❌ 이미지 복원 후 폼 데이터 복원 실패', { error });
        }
      } else {
        debug('useCampaignFormStorage', '⚠️ 이미지 복원 후 sessionStorage에 폼 데이터 없음');
      }
      }
      
      // 이전 이미지 URL 업데이트
      previousImageUrlsRef.current = {
        cover: coverImageUrl,
        product: productImageUrl,
        liveCover: liveCoverImageUrl,
      };
    }
  }, [coverImageUrl, productImageUrl, liveCoverImageUrl, formData.qualifications, restoreFormData, onImageRestored]);

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

