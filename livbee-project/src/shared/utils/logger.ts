/**
 * 로깅 유틸리티
 * 개발 환경에서만 동작하도록 설정
 */

const isDevelopment = import.meta.env.DEV;

/**
 * 개발 환경에서만 로그를 출력하는 함수
 */
export const devLog = (...args: any[]): void => {
  if (isDevelopment) {
    console.log(...args);
  }
};

/**
 * 개발 환경에서만 에러를 출력하는 함수
 */
export const devError = (...args: any[]): void => {
  if (isDevelopment) {
    console.error(...args);
  }
};

/**
 * 개발 환경에서만 경고를 출력하는 함수
 */
export const devWarn = (...args: any[]): void => {
  if (isDevelopment) {
    console.warn(...args);
  }
};

