/**
 * 로깅 유틸리티
 * 개발 환경에서만 동작하도록 설정
 * 프로덕션에서는 자동으로 제거됨
 */

const isDevelopment = import.meta.env.DEV;

/**
 * 로그 메시지 포맷터
 */
const formatMessage = (prefix: string, ...args: unknown[]): unknown[] => {
  return [`[${prefix}]`, ...args];
};

/**
 * 객체를 JSON 문자열로 변환 (개발 환경에서만)
 */
const stringifyIfNeeded = (value: unknown): unknown => {
  if (!isDevelopment) return value;
  if (value && typeof value === 'object') {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return value;
    }
  }
  return value;
};

/**
 * 개발 환경에서만 디버그 로그를 출력하는 함수
 */
export const debug = (prefix: string, ...args: unknown[]): void => {
  if (isDevelopment) {
    console.log(...formatMessage(prefix, ...args.map(stringifyIfNeeded)));
  }
};

/**
 * 개발 환경에서만 정보 로그를 출력하는 함수
 */
export const info = (prefix: string, ...args: unknown[]): void => {
  if (isDevelopment) {
    console.log(...formatMessage(prefix, ...args.map(stringifyIfNeeded)));
  }
};

/**
 * 개발 환경에서만 경고를 출력하는 함수
 */
export const warn = (prefix: string, ...args: unknown[]): void => {
  if (isDevelopment) {
    console.warn(...formatMessage(prefix, ...args.map(stringifyIfNeeded)));
  }
};

/**
 * 개발 환경에서만 에러를 출력하는 함수
 */
export const error = (prefix: string, ...args: unknown[]): void => {
  if (isDevelopment) {
    console.error(...formatMessage(prefix, ...args.map(stringifyIfNeeded)));
  }
};

/**
 * 개발 환경에서만 그룹 로그를 출력하는 함수
 * @param groupName - 그룹 이름
 * @param callback - 그룹 내에서 실행할 콜백 함수
 */
export const group = (groupName: string, callback: () => void): void => {
  if (isDevelopment) {
    console.group(groupName);
    try {
      callback();
    } finally {
      console.groupEnd();
    }
  }
};

/**
 * 레거시 호환성을 위한 함수들 (deprecated)
 * @deprecated debug, info, warn, error를 사용하세요
 */
export const devLog = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.log(...args.map(stringifyIfNeeded));
  }
};

/**
 * @deprecated error를 사용하세요
 */
export const devError = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.error(...args.map(stringifyIfNeeded));
  }
};

/**
 * @deprecated warn을 사용하세요
 */
export const devWarn = (...args: unknown[]): void => {
  if (isDevelopment) {
    console.warn(...args.map(stringifyIfNeeded));
  }
};

