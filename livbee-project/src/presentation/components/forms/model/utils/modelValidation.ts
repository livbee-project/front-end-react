import { isValidPhoneNumber, isValidUrl } from '@/shared/utils/validation';
import type { ModelFormData, ModelToggleState } from '../types';

/**
 * 모델 폼 데이터 유효성 검사
 */
export const validateModelForm = (
  formData: ModelFormData,
  toggles: ModelToggleState
): { isValid: boolean; errorMessage?: string } => {
  const trimmedContact = formData.contact.trim();
  if (trimmedContact && !isValidPhoneNumber(trimmedContact)) {
    return { isValid: false, errorMessage: '연락처 형식이 올바르지 않습니다.' };
  }

  const hasInvalidWebsite = formData.websites.some((website, index) => {
    const trimmed = website.content.trim();
    if (!trimmed || !toggles.websites[index]) {
      return false;
    }
    return !isValidUrl(trimmed);
  });

  if (hasInvalidWebsite) {
    return { isValid: false, errorMessage: 'SNS 링크를 올바르게 입력해주세요.' };
  }

  return { isValid: true };
};

