import { warn } from '@/shared/utils/logger';

const IMAGE_STORAGE_KEY = 'portfolio-register-images';

interface StoredImageUrls {
  mainThumbnail: string | null;
  gallery: string[];
  resume: string | null;
  portfolio: string | null;
}

/**
 * 세션 스토리지에서 이미지 URL 복원
 */
export const getStoredImageUrls = (): StoredImageUrls => {
  if (typeof window === 'undefined') {
    return { mainThumbnail: null, gallery: [], resume: null, portfolio: null };
  }
  try {
    const stored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    warn('portfolioImageStorage', 'Failed to restore image URLs from sessionStorage:', error);
  }
  return { mainThumbnail: null, gallery: [], resume: null, portfolio: null };
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
    warn('portfolioImageStorage', 'Failed to save image URLs to sessionStorage:', error);
  }
};

/**
 * 세션 스토리지에서 이미지 URL 삭제
 */
export const clearImageUrls = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(IMAGE_STORAGE_KEY);
  } catch (error) {
    warn('portfolioImageStorage', 'Failed to remove image URLs from sessionStorage:', error);
  }
};

