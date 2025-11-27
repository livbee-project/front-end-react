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
 */
export const validateLoginForm = ({ email, password }: LoginFormState): string | null => {
  if (!email.trim()) {
    return loginMessages.EMPTY_EMAIL;
  }

  if (!password.trim()) {
    return loginMessages.EMPTY_PASSWORD;
  }

  return null;
};

