import type { ModelFormData, ModelToggleState } from '@/presentation/components/forms/model/types';
import {
  validateCommonFormFields,
  validatePhoneNumber,
  validateWebsitesArray,
  validateAll,
  type ValidationResult,
} from '@/shared/utils/formValidation';

/**
 * 모델 폼 데이터 유효성 검사
 */
export const validateModelForm = (
  formData: ModelFormData,
  toggles: ModelToggleState
): ValidationResult => {
  // 공통 필드 검증 (name, registrationType)
  const commonFieldsResult = validateCommonFormFields(
    formData.name,
    formData.registrationType
  );
  if (!commonFieldsResult.isValid) {
    return commonFieldsResult;
  }

  // 연락처 및 웹사이트 검증
  return validateAll(
    () => validatePhoneNumber(formData.contact),
    () => validateWebsitesArray(
      formData.websites,
      (_, index) => toggles.websites[index] === true
    )
  );
};

