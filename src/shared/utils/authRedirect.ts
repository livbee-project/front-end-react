const REDIRECT_KEY = 'livbee:auth:returnPath';
const ORIGIN_PAGE_KEY = 'livbee:auth:originPage';

export const setAuthRedirectPath = (path: string) => {
  if (!path) return;
  sessionStorage.setItem(REDIRECT_KEY, path);
};

export const consumeAuthRedirectPath = () => {
  const path = sessionStorage.getItem(REDIRECT_KEY);
  if (path) {
    sessionStorage.removeItem(REDIRECT_KEY);
  }
  return path;
};

/**
 * 리다이렉트 경로가 있는지 확인만 함 (삭제하지 않음)
 */
export const hasAuthRedirectPath = (): boolean => {
  return !!sessionStorage.getItem(REDIRECT_KEY);
};

/**
 * 리다이렉트 경로를 가져옴 (삭제하지 않음)
 */
export const getAuthRedirectPath = (): string | null => {
  return sessionStorage.getItem(REDIRECT_KEY);
};

export const clearAuthRedirectPath = () => {
  sessionStorage.removeItem(REDIRECT_KEY);
};

/**
 * 등록 버튼을 누른 원래 페이지 경로를 저장
 * 권한 불일치 시 이 경로로 리다이렉트하기 위해 사용
 */
export const setOriginPage = (path: string) => {
  if (!path) return;
  sessionStorage.setItem(ORIGIN_PAGE_KEY, path);
};

/**
 * 저장된 원래 페이지 경로를 가져오고 삭제
 */
export const consumeOriginPage = () => {
  const path = sessionStorage.getItem(ORIGIN_PAGE_KEY);
  if (path) {
    sessionStorage.removeItem(ORIGIN_PAGE_KEY);
  }
  return path;
};

/**
 * 저장된 원래 페이지 경로를 삭제
 */
export const clearOriginPage = () => {
  sessionStorage.removeItem(ORIGIN_PAGE_KEY);
};

