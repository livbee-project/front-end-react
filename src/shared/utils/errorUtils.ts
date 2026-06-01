/**
 * 에러 처리 공통 유틸리티
 * 에러 메시지 추출 및 처리 로직을 통합합니다.
 */

import {
  extractErrorMessage as extractApiErrorMessage,
  DEFAULT_ERROR_MESSAGE,
} from '@/shared/utils/apiResponseHandler';

/**
 * HTTP 상태 코드에 따른 기본 에러 메시지를 반환합니다.
 * 
 * @param status - HTTP 상태 코드
 * @returns 기본 에러 메시지 또는 undefined
 */
export function getDefaultErrorMessageByStatus(status: number): string | undefined {
  switch (status) {
    case 401:
      return '인증이 필요합니다.';
    case 403:
      return '권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 429:
      return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
    case 500:
      return '서버 오류가 발생했습니다.';
    case 502:
    case 503:
    case 504:
      return '서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return undefined;
  }
}

/**
 * 에러 응답에서 메시지를 추출합니다.
 * 통일된 형식(userMessage, message, error 최상위)을 우선 사용합니다.
 *
 * @param result - 에러 응답 객체
 * @param defaultMessage - 기본 메시지
 * @returns 추출된 에러 메시지
 */
export function extractErrorMessageFromResult(
  result: unknown,
  defaultMessage: string = '요청에 실패했습니다.'
): string {
  const extracted = extractApiErrorMessage(result as never);
  if (extracted && extracted !== DEFAULT_ERROR_MESSAGE) {
    return extracted;
  }

  // apiResponseHandler에서 처리 못한 경우 fallback
  if (result && typeof result === 'object') {
    const errorObj = result as Record<string, unknown>;

    if (typeof errorObj.userMessage === 'string') return errorObj.userMessage;
    if (typeof errorObj.message === 'string') return errorObj.message;
    if (typeof errorObj.error === 'string') return errorObj.error;
    if (typeof errorObj.detail === 'string') return errorObj.detail;
    if (
      errorObj.detail &&
      typeof errorObj.detail === 'object' &&
      typeof (errorObj.detail as Record<string, unknown>).userMessage === 'string'
    ) {
      return (errorObj.detail as Record<string, unknown>).userMessage as string;
    }

    if (Array.isArray(errorObj.errors)) {
      const errorMessages = errorObj.errors
        .map((err) => {
          if (typeof err === 'string') return err;
          if (err && typeof err === 'object' && 'msg' in err) return String((err as { msg: unknown }).msg);
          return null;
        })
        .filter((msg): msg is string => msg !== null);
      if (errorMessages.length > 0) return errorMessages.join(', ');
    }
  }

  return defaultMessage;
}

/**
 * 인증 에러인지 확인합니다.
 * 
 * @param status - HTTP 상태 코드
 * @returns 인증 에러 여부
 */
export function isAuthenticationError(status: number): boolean {
  return status === 401;
}

/**
 * 권한 에러인지 확인합니다.
 * 
 * @param status - HTTP 상태 코드
 * @returns 권한 에러 여부
 */
export function isAuthorizationError(status: number): boolean {
  return status === 403;
}

/**
 * Rate Limit 에러인지 확인합니다 (429).
 *
 * @param status - HTTP 상태 코드
 * @returns Rate Limit 에러 여부
 */
export function isRateLimitError(status: number): boolean {
  return status === 429;
}

/**
 * 클라이언트 에러인지 확인합니다 (4xx).
 * 
 * @param status - HTTP 상태 코드
 * @returns 클라이언트 에러 여부
 */
export function isClientError(status: number): boolean {
  return status >= 400 && status < 500;
}

/**
 * 서버 에러인지 확인합니다 (5xx).
 * 
 * @param status - HTTP 상태 코드
 * @returns 서버 에러 여부
 */
export function isServerError(status: number): boolean {
  return status >= 500 && status < 600;
}

