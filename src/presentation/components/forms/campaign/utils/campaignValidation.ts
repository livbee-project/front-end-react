import { validateTimeRange } from '@/shared/utils/validation';
import { validateRequiredFields, type ValidationResult } from '@/shared/utils/formValidation';
import type { CampaignFormData } from '@/presentation/components/forms/campaign/types';

/**
 * 캠페인 폼 데이터 유효성 검사
 */
export const validateCampaignForm = (
  formData: CampaignFormData
): ValidationResult => {
  const requiredFields = [
    { value: formData.brandName, message: '브랜드명을 입력해주세요.' },
    { value: formData.title, message: '공고 제목을 입력해주세요.' },
    { value: formData.content, message: '공고 내용을 입력해주세요.' },
    { value: formData.filmingDate, message: '촬영 일정을 입력해주세요.' },
    { value: formData.deadline, message: '마감일을 입력해주세요.' },
  ];

  // 필수 필드 검증
  const requiredResult = validateRequiredFields(requiredFields);
  if (!requiredResult.isValid) {
    return requiredResult;
  }

  // 시간 범위 검증 (조건부)
  if (formData.startTime && formData.endTime) {
    let timeErrorMessage: string | undefined;
    const timeValid = validateTimeRange(formData.startTime, formData.endTime, (message) => {
      timeErrorMessage = message;
    });
    if (!timeValid) {
      return { isValid: false, errorMessage: timeErrorMessage };
    }
  }

  // 촬영일은 오늘 이후여야 함
  if (formData.filmingDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filmingDateObj = new Date(formData.filmingDate);
    filmingDateObj.setHours(0, 0, 0, 0);
    if (filmingDateObj < today) {
      return {
        isValid: false,
        errorMessage: '촬영일은 오늘 이후여야 합니다.',
      };
    }
  }

  // 마감일은 촬영일보다 이전이어야 함 (같은 날 불가)
  if (formData.deadline >= formData.filmingDate) {
    return {
      isValid: false,
      errorMessage: '마감일은 촬영일보다 이전이어야 합니다. 같은 날은 허용되지 않습니다.',
    };
  }

  return { isValid: true };
};

