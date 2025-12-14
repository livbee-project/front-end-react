/**
 * 폼 유효성 검사 공통 유틸리티
 * 반복되는 유효성 검사 로직을 통합하여 중복을 제거합니다.
 */

import { isEmpty, isValidPhoneNumber, isValidUrl } from '@/shared/utils/validation';

/**
 * 유효성 검사 결과 타입
 */
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

/**
 * 필드 유효성 검사 규칙
 */
export interface FieldValidationRule {
  value: string | null | undefined;
  message: string;
  validator?: (value: string) => boolean;
  required?: boolean;
}

/**
 * 필수 필드 검증
 * 
 * @param value - 검증할 값
 * @param message - 에러 메시지
 * @returns 검증 결과
 */
export function validateRequired(
  value: string | null | undefined,
  message: string
): ValidationResult {
  if (isEmpty(value)) {
    return { isValid: false, errorMessage: message };
  }
  return { isValid: true };
}

/**
 * 여러 필수 필드 검증
 * 
 * @param fields - 검증할 필드 배열
 * @returns 검증 결과
 */
export function validateRequiredFields(
  fields: Array<{ value: string | null | undefined; message: string }>
): ValidationResult {
  for (const field of fields) {
    const result = validateRequired(field.value, field.message);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
}

/**
 * 조건부 필드 검증 (값이 있을 때만 검증)
 * 
 * @param value - 검증할 값
 * @param validator - 검증 함수
 * @param message - 에러 메시지
 * @returns 검증 결과
 */
export function validateOptional(
  value: string | null | undefined,
  validator: (value: string) => boolean,
  message: string
): ValidationResult {
  if (isEmpty(value)) {
    return { isValid: true }; // 값이 없으면 검증 통과
  }
  if (!value || !validator(value)) {
    return { isValid: false, errorMessage: message };
  }
  return { isValid: true };
}

/**
 * 전화번호 검증 (선택적)
 * 
 * @param value - 검증할 전화번호
 * @param message - 에러 메시지 (기본값: '연락처 형식이 올바르지 않습니다.')
 * @returns 검증 결과
 */
export function validatePhoneNumber(
  value: string | null | undefined,
  message: string = '연락처 형식이 올바르지 않습니다.'
): ValidationResult {
  return validateOptional(value, isValidPhoneNumber, message);
}

/**
 * URL 검증 (선택적)
 * 
 * @param value - 검증할 URL
 * @param message - 에러 메시지 (기본값: 'URL 형식이 올바르지 않습니다.')
 * @returns 검증 결과
 */
export function validateUrl(
  value: string | null | undefined,
  message: string = 'URL 형식이 올바르지 않습니다.'
): ValidationResult {
  return validateOptional(value, isValidUrl, message);
}

/**
 * 문자열 길이 검증
 * 
 * @param value - 검증할 값
 * @param maxLength - 최대 길이
 * @param message - 에러 메시지
 * @returns 검증 결과
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  message: string
): ValidationResult {
  if (value.length > maxLength) {
    return { isValid: false, errorMessage: message };
  }
  return { isValid: true };
}

/**
 * 문자열 최소 길이 검증
 * 
 * @param value - 검증할 값
 * @param minLength - 최소 길이
 * @param message - 에러 메시지
 * @returns 검증 결과
 */
export function validateMinLength(
  value: string,
  minLength: number,
  message: string
): ValidationResult {
  if (value.length < minLength) {
    return { isValid: false, errorMessage: message };
  }
  return { isValid: true };
}

/**
 * 배열 필드 검증 (조건부 활성화된 항목만 검증)
 * 
 * @param items - 검증할 배열
 * @param isEnabled - 각 항목이 활성화되어 있는지 확인하는 함수
 * @param validator - 각 항목을 검증하는 함수
 * @param message - 에러 메시지
 * @returns 검증 결과
 */
export function validateArrayField<T extends { content?: string } | string>(
  items: T[],
  isEnabled: (item: T, index: number) => boolean,
  validator: (value: string) => boolean,
  message: string
): ValidationResult {
  const invalidIndex = items.findIndex((item, index) => {
    if (!isEnabled(item, index)) {
      return false; // 비활성화된 항목은 검증하지 않음
    }
    const value = typeof item === 'string' ? item : item.content || '';
    const trimmed = value.trim();
    return trimmed && !validator(trimmed);
  });

  if (invalidIndex !== -1) {
    return { isValid: false, errorMessage: message };
  }
  return { isValid: true };
}

/**
 * 여러 검증 규칙을 순차적으로 실행
 * 첫 번째 실패한 검증의 결과를 반환
 * 
 * @param validations - 검증 함수 배열
 * @returns 검증 결과
 */
export function validateAll(
  ...validations: Array<() => ValidationResult>
): ValidationResult {
  for (const validation of validations) {
    const result = validation();
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
}

/**
 * 공통 폼 필드 검증 (name, registrationType)
 * 
 * @param name - 이름/닉네임
 * @param registrationType - 등록 유형
 * @returns 검증 결과
 */
export function validateCommonFormFields(
  name: string,
  registrationType: string
): ValidationResult {
  return validateAll(
    () => validateRequired(name, '닉네임은 필수 입력값입니다.'),
    () => validateRequired(registrationType, '등록 유형은 필수 입력값입니다.')
  );
}

/**
 * 웹사이트 배열 검증
 * 
 * @param websites - 웹사이트 배열
 * @param isWebsiteEnabled - 각 웹사이트가 활성화되어 있는지 확인하는 함수
 * @param message - 에러 메시지 (기본값: 'SNS 링크를 올바르게 입력해주세요.')
 * @returns 검증 결과
 */
export function validateWebsitesArray<T extends { content?: string } | string>(
  websites: T[],
  isWebsiteEnabled: (item: T, index: number) => boolean,
  message: string = 'SNS 링크를 올바르게 입력해주세요.'
): ValidationResult {
  return validateArrayField(websites, isWebsiteEnabled, isValidUrl, message);
}

/**
 * 연락처 및 웹사이트 검증
 * 
 * @param contact - 연락처
 * @param websites - 웹사이트 배열
 * @param isWebsiteEnabled - 각 웹사이트가 활성화되어 있는지 확인하는 함수
 * @returns 검증 결과
 */
export function validateContactAndWebsites<T extends { content?: string } | string>(
  contact: string,
  websites: T[],
  isWebsiteEnabled: (item: T, index: number) => boolean
): ValidationResult {
  return validateAll(
    () => validatePhoneNumber(contact),
    () => validateWebsitesArray(websites, isWebsiteEnabled)
  );
}

