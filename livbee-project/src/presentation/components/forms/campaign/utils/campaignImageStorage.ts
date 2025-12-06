import { warn, debug } from '@/shared/utils/logger';

const IMAGE_STORAGE_KEY = 'campaign-register-images';

interface StoredImageUrls {
  cover: string;
  product: string;
  liveCover: string;
}

/**
 * 세션 스토리지에서 이미지 URL 복원
 */
export const getStoredImageUrls = (): StoredImageUrls => {
  if (typeof window === 'undefined') {
    return { cover: '', product: '', liveCover: '' };
  }
  try {
    const stored = sessionStorage.getItem(IMAGE_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    warn('campaignImageStorage', 'Failed to restore image URLs from sessionStorage:', error);
  }
  return { cover: '', product: '', liveCover: '' };
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
    warn('campaignImageStorage', 'Failed to save image URLs to sessionStorage:', error);
  }
};

/**
 * 세션 스토리지에서 이미지 URL 삭제
 */
export const clearImageUrls = (): void => {
  debug('campaignImageStorage', '🗑️ clearImageUrls 호출', {
    storageKey: IMAGE_STORAGE_KEY,
    hasStorage: typeof window !== 'undefined' ? !!sessionStorage.getItem(IMAGE_STORAGE_KEY) : false,
  });
  
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(IMAGE_STORAGE_KEY);
    debug('campaignImageStorage', '🗑️ clearImageUrls 완료', {
      storageKey: IMAGE_STORAGE_KEY,
      hasStorage: !!sessionStorage.getItem(IMAGE_STORAGE_KEY),
    });
  } catch (error) {
    warn('campaignImageStorage', 'Failed to remove image URLs from sessionStorage:', error);
    debug('campaignImageStorage', '🗑️ clearImageUrls 실패', { error });
  }
};

