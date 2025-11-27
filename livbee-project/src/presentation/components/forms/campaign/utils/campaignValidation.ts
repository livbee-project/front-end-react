import { validateRequiredFields, validateTimeRange } from '@/shared/utils/validation';
import type { CampaignFormData } from '../types';

/**
 * 캠페인 폼 데이터 유효성 검사
 */
export const validateCampaignForm = (
  formData: CampaignFormData
): { isValid: boolean; errorMessage?: string } => {
  let errorMessage: string | undefined;

  const requiredFields = [
    { value: formData.brandName, message: '브랜드명을 입력해주세요.' },
    { value: formData.title, message: '공고 제목을 입력해주세요.' },
    { value: formData.content, message: '공고 내용을 입력해주세요.' },
    { value: formData.filmingDate, message: '촬영 일정을 입력해주세요.' },
    { value: formData.deadline, message: '마감일을 입력해주세요.' },
  ];

  const requiredValid = validateRequiredFields(requiredFields, (message) => {
    errorMessage = message;
  });

  if (!requiredValid) {
    return { isValid: false, errorMessage };
  }

  if (formData.startTime && formData.endTime) {
    const timeValid = validateTimeRange(formData.startTime, formData.endTime, (message) => {
      errorMessage = message;
    });
    if (!timeValid) {
      return { isValid: false, errorMessage };
    }
  }

  return { isValid: true };
};

