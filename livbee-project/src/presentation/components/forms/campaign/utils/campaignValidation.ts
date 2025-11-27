import { validateRequiredFields, validateTimeRange } from '@/shared/utils/validation';
import type { CampaignFormData } from '../types';

/**
 * 캠페인 폼 데이터 유효성 검사
 */
export const validateCampaignForm = (
  formData: CampaignFormData
): { isValid: boolean; errorMessage?: string } => {
  // 필수 필드 검사
  const requiredFields = {
    brandName: formData.brandName,
    title: formData.title,
    content: formData.content,
    filmingDate: formData.filmingDate,
    deadline: formData.deadline,
  };

  const requiredValidation = validateRequiredFields(requiredFields);
  if (!requiredValidation.isValid) {
    return { isValid: false, errorMessage: requiredValidation.errorMessage };
  }

  // 시간 범위 검사
  if (formData.startTime && formData.endTime) {
    const timeValidation = validateTimeRange(formData.startTime, formData.endTime);
    if (!timeValidation.isValid) {
      return { isValid: false, errorMessage: timeValidation.errorMessage };
    }
  }

  return { isValid: true };
};

