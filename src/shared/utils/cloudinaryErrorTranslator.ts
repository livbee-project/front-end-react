/**
 * Cloudinary 에러 메시지를 한국어로 변환하는 유틸리티
 */

import { formatFileSize } from '@/shared/constants/fileUpload';

export const translateCloudinaryError = (errorMessage: string): string => {
  // 파일 크기 제한 에러
  if (errorMessage.includes('File size too large')) {
    const match = errorMessage.match(/Got (\d+)\. Maximum is (\d+)/);
    if (match) {
      const gotBytes = parseInt(match[1], 10);
      const maxBytes = parseInt(match[2], 10);
      return `파일 크기가 너무 큽니다. 최대 ${formatFileSize(maxBytes)}까지 업로드 가능합니다. (현재: ${formatFileSize(gotBytes)})`;
    }
    return '파일 크기가 너무 큽니다. 최대 10MB까지 업로드 가능합니다.';
  }

  // 기타 일반적인 에러 메시지
  if (errorMessage.includes('Invalid signature')) {
    return '파일 업로드 인증에 실패했습니다. 다시 시도해주세요.';
  }

  if (errorMessage.includes('upload failed')) {
    return '파일 업로드에 실패했습니다. 네트워크 연결을 확인해주세요.';
  }

  // 알 수 없는 에러는 원본 메시지 반환
  return errorMessage;
};

