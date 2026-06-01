import type { PortfolioFormData, PortfolioToggleState } from '@/presentation/components/forms/portfolio/types';
import {
  validateCommonFormFields,
  validatePhoneNumber,
  validateUrl,
  validateWebsitesArray,
  validateAll,
  type ValidationResult,
} from '@/shared/utils/formValidation';

/**
 * 포트폴리오 폼 데이터 유효성 검사
 */
export const validatePortfolioForm = (
  formData: PortfolioFormData,
  toggles: PortfolioToggleState
): ValidationResult => {
  // 공통 필드 검증 (name, registrationType)
  const commonFieldsResult = validateCommonFormFields(
    formData.name,
    formData.registrationType
  );
  if (!commonFieldsResult.isValid) {
    return commonFieldsResult;
  }

  // 모든 검증 규칙 실행
  return validateAll(
    // 연락처 검증
    () => validatePhoneNumber(formData.contact),
    // 최근 라이브 링크 검증
    () => validateUrl(formData.recentLiveLink, '최근 라이브 링크가 올바르지 않습니다.'),
    // 웹사이트 배열 검증
    () => validateWebsitesArray(
      formData.websites,
      (_, index) => toggles.websites[index] === true,
      'SNS / 사이트 링크를 올바르게 입력해주세요.'
    )
  );
};

