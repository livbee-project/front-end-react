import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getStoredImageUrls, saveImageUrls, clearImageUrls, saveImageFileNames, getStoredImageFileNames } from '@/presentation/components/forms/portfolio/utils/portfolioImageStorage';
import { debug } from '@/shared/utils/logger';

interface UsePortfolioImageManagementOptions {
  onImageRestored?: () => void;
}

/**
 * 포트폴리오 등록 폼의 이미지 관리 로직을 처리하는 훅
 */
export const usePortfolioImageManagement = ({ onImageRestored }: UsePortfolioImageManagementOptions = {}) => {
  const location = useLocation();
  const storedImages = getStoredImageUrls();
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
    const currentStoredImages = getStoredImageUrls();
    let hasRestoredImage = false;

    debug('usePortfolioImageManagement', '🖼️ 이미지 복원 체크 시작', {
      currentPath: location.pathname,
      storedMainThumbnail: !!currentStoredImages.mainThumbnail,
      storedGallery: currentStoredImages.gallery.length,
      currentMainThumbnail: !!mainThumbnailUrl,
      currentGallery: galleryImageUrls.length,
    });

    // sessionStorage에 이미지가 있고 현재 상태와 다르면 복원 (크롭 완료 후 돌아온 경우)
    if (currentStoredImages.mainThumbnail && currentStoredImages.mainThumbnail !== mainThumbnailUrl) {
      debug('usePortfolioImageManagement', '🖼️ mainThumbnail 이미지 복원', {
        stored: currentStoredImages.mainThumbnail,
        current: mainThumbnailUrl,
      });
      setMainThumbnailUrl(currentStoredImages.mainThumbnail);
      hasRestoredImage = true;
    }
    if (currentStoredImages.gallery.length > 0 && JSON.stringify(currentStoredImages.gallery) !== JSON.stringify(galleryImageUrls)) {
      debug('usePortfolioImageManagement', '🖼️ gallery 이미지 복원', {
        stored: currentStoredImages.gallery.length,
        current: galleryImageUrls.length,
      });
      setGalleryImageUrls(currentStoredImages.gallery);
      hasRestoredImage = true;
    }

    // 크롭 완료 후 돌아온 경우: 이미지 복원 후 콜백 호출 (폼 데이터 복원을 위해)
    if (hasRestoredImage) {
      debug('usePortfolioImageManagement', '🖼️ 이미지 복원 완료, onImageRestored 호출');
      onImageRestored?.();
      // 폼 데이터 복원 후 이미지 URL 삭제 (약간의 지연을 두어 복원이 완료되도록)
      setTimeout(() => {
        clearImageUrls();
        debug('usePortfolioImageManagement', '🖼️ 이미지 복원 완료, 이미지 URL 삭제');
      }, 100);
    } else {
      debug('usePortfolioImageManagement', '⏭️ 이미지 복원 없음');
    }
  }, [location.pathname, mainThumbnailUrl, galleryImageUrls, onImageRestored]);

  // 메인 썸네일 이미지 선택 핸들러
  const handleMainThumbnailSelect = useCallback(
    (file: File) => {
      const blobUrl = URL.createObjectURL(file);

      debug('usePortfolioImageManagement', '🖼️ handleMainThumbnailSelect 호출', {
        fileName: file.name,
        fileSize: file.size,
      });

      setMainThumbnailFile(file);
      mainThumbnailFileRef.current = file; // ref에도 저장
      setMainThumbnailUrl(blobUrl);
      
      // 이미지 선택 시 sessionStorage에 저장 (크롭 페이지로 이동하기 전)
      saveImageUrls({
        mainThumbnail: blobUrl,
        gallery: galleryImageUrls,
        resume: null,
        portfolio: null,
      });
      
      // 파일명도 함께 저장
      const currentFileNames = getStoredImageFileNames();
      saveImageFileNames({
        ...currentFileNames,
        mainThumbnail: file.name,
      });
      
      debug('usePortfolioImageManagement', '✅ mainThumbnail 이미지 저장 완료', {
        hasFile: !!file,
        blobUrl,
        fileName: file.name,
        fileSize: file.size,
      });
    },
    [galleryImageUrls]
  );

  // 갤러리 이미지 선택 핸들러
  const handleGalleryImageSelect = useCallback(
    (file: File) => {
      const blobUrl = URL.createObjectURL(file);

      debug('usePortfolioImageManagement', '🖼️ handleGalleryImageSelect 호출', {
        fileName: file.name,
        fileSize: file.size,
        currentGalleryCount: galleryImageUrls.length,
      });

      // 최대 9개 제한
      if (galleryImageUrls.length >= 9) {
        debug('usePortfolioImageManagement', '⚠️ 갤러리 이미지 최대 개수 초과');
        return false;
      }

      const newGalleryUrls = [...galleryImageUrls, blobUrl];
      const newGalleryFiles = [...galleryImageFiles, file];
      
      setGalleryImageFiles(newGalleryFiles);
      galleryImageFilesRef.current = newGalleryFiles; // ref에도 저장
      setGalleryImageUrls(newGalleryUrls);
      
      // 이미지 선택 시 sessionStorage에 저장
      saveImageUrls({
        mainThumbnail: mainThumbnailUrl,
        gallery: newGalleryUrls,
        resume: null,
        portfolio: null,
      });
      
      // 파일명도 함께 저장
      const currentFileNames = getStoredImageFileNames();
      const currentGalleryFileNames = currentFileNames.gallery || [];
      saveImageFileNames({
        ...currentFileNames,
        gallery: [...currentGalleryFileNames, file.name],
      });
      
      debug('usePortfolioImageManagement', '✅ gallery 이미지 저장 완료', {
        hasFile: !!file,
        blobUrl,
        fileName: file.name,
        fileSize: file.size,
        galleryCount: newGalleryUrls.length,
      });
      
      return true;
    },
    [galleryImageUrls, galleryImageFiles, mainThumbnailUrl]
  );

  // 갤러리 이미지 교체 핸들러
  const handleGalleryImageReplace = useCallback(
    (index: number, file: File) => {
      const blobUrl = URL.createObjectURL(file);

      debug('usePortfolioImageManagement', '🖼️ handleGalleryImageReplace 호출', {
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
      saveImageUrls({
        mainThumbnail: mainThumbnailUrl,
        gallery: newGalleryUrls,
        resume: null,
        portfolio: null,
      });
      
      // 파일명도 업데이트
      const currentFileNames = getStoredImageFileNames();
      const currentGalleryFileNames = currentFileNames.gallery || [];
      const newGalleryFileNames = [...currentGalleryFileNames];
      newGalleryFileNames[index] = file.name;
      saveImageFileNames({
        ...currentFileNames,
        gallery: newGalleryFileNames,
      });
      
      debug('usePortfolioImageManagement', '✅ gallery 이미지 교체 완료', {
        index,
        fileName: file.name,
        fileSize: file.size,
      });
    },
    [galleryImageUrls, galleryImageFiles, mainThumbnailUrl]
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
      saveImageUrls({
        mainThumbnail: mainThumbnailUrl,
        gallery: newGalleryUrls,
        resume: null,
        portfolio: null,
      });
      
      // 파일명도 업데이트
      const currentFileNames = getStoredImageFileNames();
      const currentGalleryFileNames = currentFileNames.gallery || [];
      const newGalleryFileNames = currentGalleryFileNames.filter((_, idx) => idx !== index);
      saveImageFileNames({
        ...currentFileNames,
        gallery: newGalleryFileNames,
      });
      
      // blob URL 정리
      const removedUrl = galleryImageUrls[index];
      if (removedUrl && removedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(removedUrl);
      }
    },
    [galleryImageUrls, galleryImageFiles, mainThumbnailUrl]
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
    clearImageUrls();
  }, [mainThumbnailUrl, galleryImageUrls]);

  // blob URL에서 File 객체를 생성하는 헬퍼 함수
  const blobUrlToFile = useCallback(async (blobUrl: string, fileName: string): Promise<File | null> => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      debug('usePortfolioImageManagement', '❌ blobUrlToFile 실패', { blobUrl, fileName, error });
      return null;
    }
  }, []);

  // ref에서 파일을 가져오는 getter 함수들 (항상 최신 값을 반환)
  const getMainThumbnailFile = useCallback(async (): Promise<File | null> => {
    // 먼저 상태나 ref에서 확인
    const file = mainThumbnailFile || mainThumbnailFileRef.current;
    if (file) {
      debug('usePortfolioImageManagement', '📂 getMainThumbnailFile - 상태/ref에서 가져옴', {
        mainThumbnailFile: !!mainThumbnailFile,
        refFile: !!mainThumbnailFileRef.current,
      });
      return file;
    }

    // blob URL에서 File 생성 시도
    if (mainThumbnailUrl && mainThumbnailUrl.startsWith('blob:')) {
      const storedFileNames = getStoredImageFileNames();
      const fileName = storedFileNames.mainThumbnail || mainThumbnailUrl.split('/').pop() || 'main-thumbnail.jpg';
      debug('usePortfolioImageManagement', '📂 getMainThumbnailFile - blob URL에서 생성 시도', {
        mainThumbnailUrl,
        fileName,
      });
      return await blobUrlToFile(mainThumbnailUrl, fileName);
    }

    debug('usePortfolioImageManagement', '📂 getMainThumbnailFile - 파일 없음', {
      mainThumbnailFile: !!mainThumbnailFile,
      refFile: !!mainThumbnailFileRef.current,
      mainThumbnailUrl,
    });
    return null;
  }, [mainThumbnailFile, mainThumbnailUrl, blobUrlToFile]);

  const getGalleryImageFiles = useCallback(async (): Promise<File[]> => {
    const files = galleryImageFiles.length > 0 ? galleryImageFiles : galleryImageFilesRef.current;
    if (files.length > 0) {
      debug('usePortfolioImageManagement', '📂 getGalleryImageFiles - 상태/ref에서 가져옴', {
        galleryImageFiles: galleryImageFiles.length,
        refFiles: galleryImageFilesRef.current.length,
      });
      return files;
    }

    // blob URL에서 File 생성 시도
    if (galleryImageUrls.length > 0) {
      const storedFileNames = getStoredImageFileNames();
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
        debug('usePortfolioImageManagement', '📂 getGalleryImageFiles - blob URL에서 생성 시도', {
          galleryImageUrls: galleryImageUrls.length,
          filesCreated: files.length,
        });
        return files;
      }
    }

    debug('usePortfolioImageManagement', '📂 getGalleryImageFiles - 파일 없음', {
      galleryImageFiles: galleryImageFiles.length,
      refFiles: galleryImageFilesRef.current.length,
      galleryImageUrls: galleryImageUrls.length,
    });
    return [];
  }, [galleryImageFiles, galleryImageUrls, blobUrlToFile]);

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

