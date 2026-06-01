/**
 * 브라우저 스토리지 유틸리티
 * SessionStorage 및 LocalStorage 관리
 */

const TOKEN_KEY = 'liveeToken';

/**
 * SessionStorage에서 인증 토큰 가져오기
 * @returns 토큰 문자열 또는 null
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return sessionStorage.getItem(TOKEN_KEY);
};

/**
 * SessionStorage에 인증 토큰 저장
 * @param token - 저장할 토큰
 */
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  sessionStorage.setItem(TOKEN_KEY, token);
};

/**
 * SessionStorage에서 인증 토큰 제거
 */
export const removeToken = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  sessionStorage.removeItem(TOKEN_KEY);
};

