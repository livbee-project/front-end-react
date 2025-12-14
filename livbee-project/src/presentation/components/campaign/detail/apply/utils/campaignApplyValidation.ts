import {
  validateRequired,
  validateMaxLength,
  validateAll,
  type ValidationResult,
} from '@/shared/utils/formValidation';

const MAX_MESSAGE_LENGTH = 400;

export interface CampaignApplyFormData {
  campaignId: string;
  selectedPortfolio: number | null;
  message: string;
  availableDate: string;
  availableTime: string;
}

export type CampaignApplyValidationResult = ValidationResult;

/**
 * 캠페인 지원 폼 유효성 검사
 */
export const validateCampaignApplyForm = ({
  campaignId,
  selectedPortfolio,
  message,
  availableDate,
  availableTime,
}: CampaignApplyFormData): CampaignApplyValidationResult => {
  return validateAll(
    () => validateRequired(campaignId, '캠페인 정보가 올바르지 않습니다.'),
    () => {
      if (!selectedPortfolio) {
        return { isValid: false, errorMessage: '포트폴리오를 선택해주세요.' };
      }
      return { isValid: true };
    },
    () => validateRequired(message, '지원 메시지를 입력해주세요.'),
    () => validateMaxLength(
      message.trim(),
      MAX_MESSAGE_LENGTH,
      `지원 메시지는 ${MAX_MESSAGE_LENGTH}자 이내로 작성해주세요.`
    ),
    () => {
      if (!availableDate || !availableTime) {
        return { isValid: false, errorMessage: '촬영 가능 날짜와 시간을 선택해주세요.' };
      }
      return { isValid: true };
    }
  );
};

