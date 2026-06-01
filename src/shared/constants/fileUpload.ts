/**
 * 파일 업로드 관련 상수
 */

// Cloudinary 무료 플랜 파일 크기 제한 (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10,485,760 bytes

// 파일 크기를 MB 단위로 고정하여 변환
export const formatFileSize = (bytes: number): string => {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

