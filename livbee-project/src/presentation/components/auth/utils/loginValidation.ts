import { validateRequiredFields, type ValidationResult } from '@/shared/utils/formValidation';

interface LoginFormState {
  email: string;
  password: string;
}

export const loginMessages = {
  EMPTY_EMAIL: '이메일을 입력해주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해주세요.',
  GENERIC_ERROR: '로그인에 실패했습니다.',
};

/**
 * 로그인 폼 유효성 검사
 * @returns 에러 메시지 또는 null
 */
export const validateLoginForm = ({ email, password }: LoginFormState): string | null => {
  const result = validateRequiredFields([
    { value: email, message: loginMessages.EMPTY_EMAIL },
    { value: password, message: loginMessages.EMPTY_PASSWORD },
  ]);
  
  return result.isValid ? null : result.errorMessage || null;
};

/**
 * 로그인 폼 유효성 검사 (ValidationResult 반환)
 */
export const validateLoginFormResult = ({ email, password }: LoginFormState): ValidationResult => {
  return validateRequiredFields([
    { value: email, message: loginMessages.EMPTY_EMAIL },
    { value: password, message: loginMessages.EMPTY_PASSWORD },
  ]);
};

