import { isValidPhoneNumber, isValidUrl } from '@/shared/utils/validation';
import type { PortfolioFormData, PortfolioToggleState } from '../types';

/**
 * 포트폴리오 폼 데이터 유효성 검사
 */
export const validatePortfolioForm = (
  formData: PortfolioFormData,
  toggles: PortfolioToggleState
): { isValid: boolean; errorMessage?: string } => {
  // 필수 필드 검증
  if (!formData.name.trim()) {
    return { isValid: false, errorMessage: '닉네임은 필수 입력값입니다.' };
  }

  if (!formData.registrationType.trim()) {
    return { isValid: false, errorMessage: '등록 유형은 필수 입력값입니다.' };
  }

  const trimmedContact = formData.contact.trim();
  if (trimmedContact && !isValidPhoneNumber(trimmedContact)) {
    return { isValid: false, errorMessage: '연락처 형식이 올바르지 않습니다.' };
  }

  const trimmedRecentLive = formData.recentLiveLink.trim();
  if (trimmedRecentLive && !isValidUrl(trimmedRecentLive)) {
    return { isValid: false, errorMessage: '최근 라이브 링크가 올바르지 않습니다.' };
  }

  const hasInvalidWebsite = formData.websites.some((url, index) => {
    const trimmed = url.trim();
    if (!trimmed || !toggles.websites[index]) {
      return false;
    }
    return !isValidUrl(trimmed);
  });

  if (hasInvalidWebsite) {
    return { isValid: false, errorMessage: 'SNS / 사이트 링크를 올바르게 입력해주세요.' };
  }

  return { isValid: true };
};

