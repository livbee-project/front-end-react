import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { debug } from '@/shared/utils/logger';

/**
 * 이미지 스토리지 인터페이스
 * 각 폼 타입별로 구현해야 하는 스토리지 함수들
 */
export interface ImageStorageFunctions {
  getStoredImageUrls: () => {
    mainThumbnail: string | null;
    gallery: string[];
    resume?: string | null;
    portfolio?: string | null;
  };
  saveImageUrls: (urls: {
    mainThumbnail: string | null;
    gallery: string[];
    resume?: string | null;
    portfolio?: string | null;
  }) => void;
  clearImageUrls: () => void;
  saveImageFileNames: (fileNames: {
    mainThumbnail?: string;
    gallery?: string[];
    resume?: string;
    portfolio?: string;
  }) => void;
  getStoredImageFileNames: () => {
    mainThumbnail?: string;
    gallery?: string[];
    resume?: string;
    portfolio?: string;
  };
}

interface UseImageManagementOptions {
  storage: ImageStorageFunctions;
  maxGalleryImages: number;
  hookName: string;
  onImageRestored?: () => void;
}

/**
 * 제네릭 이미지 관리 훅
 * 포트폴리오와 모델 등록 폼에서 공통으로 사용하는 이미지 관리 로직
 */
export const useImageManagement = ({
  storage,
  maxGalleryImages,
  hookName,
  onImageRestored,
}: UseImageManagementOptions) => {
  const location = useLocation();
  const storedImages = storage.getStoredImageUrls();
  const hasStoredImages = !!(storedImages.mainThumbnail || storedImages.gallery.length > 0);

  const [mainThumbnailUrl, setMainThumbnailUrl] = useState(storedImages.mainThumbnail || '');
  const [galleryImageUrls, setGalleryImageUrls] = useState<string[]>(storedImages.gallery || []);
  const [mainThumbnailFile, setMainThumbnailFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  
  // File 객체를 ref로도 저장하여 페이지 재마운트 시에도 유지
  const mainThumbnailFileRef = useRef<File | null>(null);
  const galleryImageFilesRef = useRef<File[]>([]);

  // 페이지 복귀 시 sessionStorage에서 이미지 URL 복원 및 처리
  useEffect(() => {
    const currentStoredImages = storage.getStoredImageUrls();
    let hasRestoredImage = false;

    debug(hookName, '🖼️ 이미지 복원 체크 시작', {
      currentPath: location.pathname,
      storedMainThumbnail: !!currentStoredImages.mainThumbnail,
      storedGallery: currentStoredImages.gallery.length,
      currentMainThumbnail: !!mainThumbnailUrl,
      currentGallery: galleryImageUrls.length,
    });

    // sessionStorage에 이미지가 있고 현재 상태와 다르면 복원 (크롭 완료 후 돌아온 경우)
    if (currentStoredImages.mainThumbnail && currentStoredImages.mainThumbnail !== mainThumbnailUrl) {
      debug(hookName, '🖼️ mainThumbnail 이미지 복원', {
        stored: currentStoredImages.mainThumbnail,
        current: mainThumbnailUrl,
      });
      setMainThumbnailUrl(currentStoredImages.mainThumbnail);
      hasRestoredImage = true;
    }
    if (currentStoredImages.gallery.length > 0 && JSON.stringify(currentStoredImages.gallery) !== JSON.stringify(galleryImageUrls)) {
      debug(hookName, '🖼️ gallery 이미지 복원', {
        stored: currentStoredImages.gallery.length,
        current: galleryImageUrls.length,
      });
      setGalleryImageUrls(currentStoredImages.gallery);
      hasRestoredImage = true;
    }

    // 크롭 완료 후 돌아온 경우: 이미지 복원 후 콜백 호출 (폼 데이터 복원을 위해)
    if (hasRestoredImage) {
      debug(hookName, '🖼️ 이미지 복원 완료, onImageRestored 호출');
      onImageRestored?.();
      // 폼 데이터 복원 후 이미지 URL 삭제 (약간의 지연을 두어 복원이 완료되도록)
      setTimeout(() => {
        storage.clearImageUrls();
        debug(hookName, '🖼️ 이미지 복원 완료, 이미지 URL 삭제');
      }, 100);
    } else {
      debug(hookName, '⏭️ 이미지 복원 없음');
    }
  }, [location.pathname, mainThumbnailUrl, galleryImageUrls, onImageRestored, storage, hookName]);

  // 메인 썸네일 이미지 선택 핸들러
  const handleMainThumbnailSelect = useCallback(
    (file: File) => {
      const blobUrl = URL.createObjectURL(file);

      debug(hookName, '🖼️ handleMainThumbnailSelect 호출', {
        fileName: file.name,
        fileSize: file.size,
      });

      setMainThumbnailFile(file);
      mainThumbnailFileRef.current = file; // ref에도 저장
      setMainThumbnailUrl(blobUrl);
      
      // 이미지 선택 시 sessionStorage에 저장 (크롭 페이지로 이동하기 전)
      storage.saveImageUrls({
        mainThumbnail: blobUrl,
        gallery: galleryImageUrls,
        resume: null,
        portfolio: null,
      });
      
      // 파일명도 함께 저장
      const currentFileNames = storage.getStoredImageFileNames();
      storage.saveImageFileNames({
        ...currentFileNames,
        mainThumbnail: file.name,
      });
      
      debug(hookName, '✅ mainThumbnail 이미지 저장 완료', {
        hasFile: !!file,
        blobUrl,
        fileName: file.name,
        fileSize: file.size,
      });
    },
    [galleryImageUrls, storage, hookName]
  );

  // 갤러리 이미지 선택 핸들러
  const handleGalleryImageSelect = useCallback(
    (file: File) => {
      const blobUrl = URL.createObjectURL(file);

      debug(hookName, '🖼️ handleGalleryImageSelect 호출', {
        fileName: file.name,
        fileSize: file.size,
        currentGalleryCount: galleryImageUrls.length,
      });

      // 최대 개수 제한
      if (galleryImageUrls.length >= maxGalleryImages) {
        debug(hookName, '⚠️ 갤러리 이미지 최대 개수 초과');
        return false;
      }

      const newGalleryUrls = [...galleryImageUrls, blobUrl];
      const newGalleryFiles = [...galleryImageFiles, file];
      
      setGalleryImageFiles(newGalleryFiles);
      galleryImageFilesRef.current = newGalleryFiles; // ref에도 저장
      setGalleryImageUrls(newGalleryUrls);
      
      // 이미지 선택 시 sessionStorage에 저장
      storage.saveImageUrls({
        mainThumbnail: mainThumbnailUrl,
        gallery: newGalleryUrls,
        resume: null,
        portfolio: null,
      });
      
      // 파일명도 함께 저장
      const currentFileNames = storage.getStoredImageFileNames();
      const currentGalleryFileNames = currentFileNames.gallery || [];
      storage.saveImageFileNames({
        ...currentFileNames,
        gallery: [...currentGalleryFileNames, file.name],
      });
      
      debug(hookName, '✅ gallery 이미지 저장 완료', {
        hasFile: !!file,
        blobUrl,
        fileName: file.name,
        fileSize: file.size,
        galleryCount: newGalleryUrls.length,
      });
      
      return true;
    },
    [galleryImageUrls, galleryImageFiles, mainThumbnailUrl, maxGalleryImages, storage, hookName]
  );

  // 갤러리 이미지 교체 핸들러
  const handleGalleryImageReplace = useCallback(
    (index: number, file: File) => {
      const blobUrl = URL.createObjectURL(file);

      debug(hookName, '🖼️ handleGalleryImageReplace 호출', {
        index,
        fileName: file.name,
        fileSize: file.size,
      });

      // 기존 blob URL 정리
      const oldUrl = galleryImageUrls[index];
      if (oldUrl && oldUrl.startsWith('blob:')) {
        URL.revokeObjectURL(oldUrl);
      }

      const newGalleryUrls = [...galleryImageUrls];
      const newGalleryFiles = [...galleryImageFiles];
      newGalleryUrls[index] = blobUrl;
      newGalleryFiles[index] = file;
      
      setGalleryImageFiles(newGalleryFiles);
      galleryImageFilesRef.current = newGalleryFiles;
      setGalleryImageUrls(newGalleryUrls);
      
      // sessionStorage 업데이트
      storage.saveImageUrls({
        mainThumbnail: mainThumbnailUrl,
        gallery: newGalleryUrls,
        resume: null,
        portfolio: null,
      });
      
      // 파일명도 업데이트
      const currentFileNames = storage.getStoredImageFileNames();
      const currentGalleryFileNames = currentFileNames.gallery || [];
      const newGalleryFileNames = [...currentGalleryFileNames];
      newGalleryFileNames[index] = file.name;
      storage.saveImageFileNames({
        ...currentFileNames,
        gallery: newGalleryFileNames,
      });
      
      debug(hookName, '✅ gallery 이미지 교체 완료', {
        index,
        fileName: file.name,
        fileSize: file.size,
      });
    },
    [galleryImageUrls, galleryImageFiles, mainThumbnailUrl, storage, hookName]
  );

  // 갤러리 이미지 제거 핸들러
  const handleGalleryImageRemove = useCallback(
    (index: number) => {
      const newGalleryUrls = galleryImageUrls.filter((_, idx) => idx !== index);
      const newGalleryFiles = galleryImageFiles.filter((_, idx) => idx !== index);
      
      setGalleryImageFiles(newGalleryFiles);
      galleryImageFilesRef.current = newGalleryFiles;
      setGalleryImageUrls(newGalleryUrls);
      
      // sessionStorage 업데이트
      storage.saveImageUrls({
        mainThumbnail: mainThumbnailUrl,
        gallery: newGalleryUrls,
        resume: null,
        portfolio: null,
      });
      
      // 파일명도 업데이트
      const currentFileNames = storage.getStoredImageFileNames();
      const currentGalleryFileNames = currentFileNames.gallery || [];
      const newGalleryFileNames = currentGalleryFileNames.filter((_, idx) => idx !== index);
      storage.saveImageFileNames({
        ...currentFileNames,
        gallery: newGalleryFileNames,
      });
      
      // blob URL 정리
      const removedUrl = galleryImageUrls[index];
      if (removedUrl && removedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(removedUrl);
      }
    },
    [galleryImageUrls, galleryImageFiles, mainThumbnailUrl, storage, hookName]
  );

  // 이미지 상태 초기화
  const clearImageStates = useCallback(() => {
    // blob URL 정리
    if (mainThumbnailUrl && mainThumbnailUrl.startsWith('blob:')) {
      URL.revokeObjectURL(mainThumbnailUrl);
    }
    galleryImageUrls.forEach((url) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    
    setMainThumbnailUrl('');
    setGalleryImageUrls([]);
    setMainThumbnailFile(null);
    setGalleryImageFiles([]);
    mainThumbnailFileRef.current = null;
    galleryImageFilesRef.current = [];
    storage.clearImageUrls();
  }, [mainThumbnailUrl, galleryImageUrls, storage]);

  // blob URL에서 File 객체를 생성하는 헬퍼 함수
  const blobUrlToFile = useCallback(async (blobUrl: string, fileName: string): Promise<File | null> => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      debug(hookName, '❌ blobUrlToFile 실패', { blobUrl, fileName, error });
      return null;
    }
  }, [hookName]);

  // ref에서 파일을 가져오는 getter 함수들 (항상 최신 값을 반환)
  const getMainThumbnailFile = useCallback(async (): Promise<File | null> => {
    // 먼저 상태나 ref에서 확인
    const file = mainThumbnailFile || mainThumbnailFileRef.current;
    if (file) {
      debug(hookName, '📂 getMainThumbnailFile - 상태/ref에서 가져옴', {
        mainThumbnailFile: !!mainThumbnailFile,
        refFile: !!mainThumbnailFileRef.current,
      });
      return file;
    }

    // blob URL에서 File 생성 시도
    if (mainThumbnailUrl && mainThumbnailUrl.startsWith('blob:')) {
      const storedFileNames = storage.getStoredImageFileNames();
      const fileName = storedFileNames.mainThumbnail || mainThumbnailUrl.split('/').pop() || 'main-thumbnail.jpg';
      debug(hookName, '📂 getMainThumbnailFile - blob URL에서 생성 시도', {
        mainThumbnailUrl,
        fileName,
      });
      return await blobUrlToFile(mainThumbnailUrl, fileName);
    }

    debug(hookName, '📂 getMainThumbnailFile - 파일 없음', {
      mainThumbnailFile: !!mainThumbnailFile,
      refFile: !!mainThumbnailFileRef.current,
      mainThumbnailUrl,
    });
    return null;
  }, [mainThumbnailFile, mainThumbnailUrl, blobUrlToFile, storage, hookName]);

  const getGalleryImageFiles = useCallback(async (): Promise<File[]> => {
    const files = galleryImageFiles.length > 0 ? galleryImageFiles : galleryImageFilesRef.current;
    if (files.length > 0) {
      debug(hookName, '📂 getGalleryImageFiles - 상태/ref에서 가져옴', {
        galleryImageFiles: galleryImageFiles.length,
        refFiles: galleryImageFilesRef.current.length,
      });
      return files;
    }

    // blob URL에서 File 생성 시도
    if (galleryImageUrls.length > 0) {
      const storedFileNames = storage.getStoredImageFileNames();
      const galleryFileNames = storedFileNames.gallery || [];
      const files: File[] = [];
      
      for (let i = 0; i < galleryImageUrls.length; i++) {
        const url = galleryImageUrls[i];
        if (url.startsWith('blob:')) {
          const fileName = galleryFileNames[i] || url.split('/').pop() || `gallery-${i}.jpg`;
          const file = await blobUrlToFile(url, fileName);
          if (file) {
            files.push(file);
          }
        }
      }
      
      if (files.length > 0) {
        debug(hookName, '📂 getGalleryImageFiles - blob URL에서 생성 시도', {
          galleryImageUrls: galleryImageUrls.length,
          filesCreated: files.length,
        });
        return files;
      }
    }

    debug(hookName, '📂 getGalleryImageFiles - 파일 없음', {
      galleryImageFiles: galleryImageFiles.length,
      refFiles: galleryImageFilesRef.current.length,
      galleryImageUrls: galleryImageUrls.length,
    });
    return [];
  }, [galleryImageFiles, galleryImageUrls, blobUrlToFile, storage, hookName]);

  return {
    mainThumbnailUrl,
    galleryImageUrls,
    mainThumbnailFile,
    galleryImageFiles,
    getMainThumbnailFile,
    getGalleryImageFiles,
    hasStoredImages,
    handleMainThumbnailSelect,
    handleGalleryImageSelect,
    handleGalleryImageReplace,
    handleGalleryImageRemove,
    clearImageStates,
    setMainThumbnailUrl,
    setGalleryImageUrls,
  };
};

