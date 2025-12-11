import { warn, debug } from '@/shared/utils/logger';

const IMAGE_STORAGE_KEY = 'model-register-images';

interface StoredImageUrls {
  mainThumbnail: string | null;
  gallery: string[];
  portfolio: string | null;
}

interface StoredImageFileNames {
  mainThumbnail?: string;
  gallery?: string[];
  portfolio?: string;
}

const IMAGE_FILE_NAMES_KEY = 'model-register-image-names';

/**
 * 세션 스토리지에서 이미지 URL 복원
 */
export const getStoredImageUrls = (): StoredImageUrls => {
  if (typeof window === 'undefined') {
    return { mainThumbnail: null, gallery: [], portfolio: null };
  }
  try {
    const stored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    warn('modelImageStorage', 'Failed to restore image URLs from sessionStorage:', error);
  }
  return { mainThumbnail: null, gallery: [], portfolio: null };
};

/**
 * 세션 스토리지에 이미지 URL 저장
 */
export const saveImageUrls = (urls: StoredImageUrls): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const currentStored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
    const newValue = JSON.stringify(urls);
    
    // 이전 값과 다를 때만 저장 (불필요한 저장 방지)
    if (currentStored !== newValue) {
      sessionStorage.setItem(IMAGE_STORAGE_KEY, newValue);
    }
  } catch (error) {
    warn('modelImageStorage', 'Failed to save image URLs to sessionStorage:', error);
  }
};

/**
 * 세션 스토리지에 이미지 파일명 저장
 */
export const saveImageFileNames = (fileNames: StoredImageFileNames): void => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(IMAGE_FILE_NAMES_KEY, JSON.stringify(fileNames));
  } catch (error) {
    warn('modelImageStorage', 'Failed to save image file names to sessionStorage:', error);
  }
};

/**
 * 세션 스토리지에서 이미지 파일명 복원
 */
export const getStoredImageFileNames = (): StoredImageFileNames => {
  if (typeof window === 'undefined') {
    return {};
  }
  try {
    const stored = sessionStorage.getItem(IMAGE_FILE_NAMES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    warn('modelImageStorage', 'Failed to restore image file names from sessionStorage:', error);
  }
  return {};
};

/**
 * 세션 스토리지에서 이미지 URL 삭제
 */
export const clearImageUrls = (): void => {
  debug('modelImageStorage', '🗑️ clearImageUrls 호출', {
    storageKey: IMAGE_STORAGE_KEY,
    hasStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(IMAGE_STORAGE_KEY) : false,
  });
  
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(IMAGE_STORAGE_KEY);
    sessionStorage.removeItem(IMAGE_FILE_NAMES_KEY); // 파일명도 함께 삭제
    debug('modelImageStorage', '🗑️ clearImageUrls 완료', {
      storageKey: IMAGE_STORAGE_KEY,
      hasStorage: !!sessionStorage.getItem(IMAGE_STORAGE_KEY),
    });
  } catch (error) {
    warn('modelImageStorage', 'Failed to remove image URLs from sessionStorage:', error);
    debug('modelImageStorage', '🗑️ clearImageUrls 실패', { error });
  }
};

