import { getStoredImageUrls, saveImageUrls, clearImageUrls, saveImageFileNames, getStoredImageFileNames } from '@/presentation/components/forms/model/utils/modelImageStorage';
import { useImageManagement } from '@/presentation/components/forms/shared/hooks/useImageManagement';

interface UseModelImageManagementOptions {
  onImageRestored?: () => void;
}

/**
 * 모델 등록 폼의 이미지 관리 로직을 처리하는 훅
 * 제네릭 useImageManagement 훅을 사용하여 구현
 */
export const useModelImageManagement = ({ onImageRestored }: UseModelImageManagementOptions = {}) => {
  const storage = {
    getStoredImageUrls,
    saveImageUrls: (urls: {
      mainThumbnail: string | null;
      gallery: string[];
      resume?: string | null;
      portfolio?: string | null;
    }) => {
      saveImageUrls({
        mainThumbnail: urls.mainThumbnail,
        gallery: urls.gallery,
        portfolio: urls.portfolio ?? null,
      });
    },
    clearImageUrls,
    saveImageFileNames,
    getStoredImageFileNames,
  };

  return useImageManagement({
    storage,
    maxGalleryImages: 5,
    hookName: 'useModelImageManagement',
    onImageRestored,
  });
};

