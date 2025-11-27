const REDIRECT_KEY = 'livbee:auth:returnPath';

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

export const clearAuthRedirectPath = () => {
  sessionStorage.removeItem(REDIRECT_KEY);
};

