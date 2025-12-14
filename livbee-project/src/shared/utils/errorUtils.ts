/**
 * 에러 처리 공통 유틸리티
 * 에러 메시지 추출 및 처리 로직을 통합합니다.
 */

import { extractErrorMessage as extractApiErrorMessage } from '@/shared/utils/apiResponseHandler';

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
 * 여러 소스에서 메시지를 찾아 가장 적절한 것을 반환합니다.
 * 
 * @param result - 에러 응답 객체
 * @param defaultMessage - 기본 메시지
 * @returns 추출된 에러 메시지
 */
export function extractErrorMessageFromResult(
  result: unknown,
  defaultMessage: string = '요청에 실패했습니다.'
): string {
  // apiResponseHandler의 extractErrorMessage를 먼저 시도
  const extracted = extractApiErrorMessage(result as never);
  if (extracted) {
    return extracted;
  }

  // result가 객체인 경우 직접 필드 확인
  if (result && typeof result === 'object') {
    const errorObj = result as Record<string, unknown>;
    
    // userMessage 우선
    if (typeof errorObj.userMessage === 'string') {
      return errorObj.userMessage;
    }
    
    // message 다음
    if (typeof errorObj.message === 'string') {
      return errorObj.message;
    }
    
    // detail 필드 확인
    if (typeof errorObj.detail === 'string') {
      return errorObj.detail;
    }
    
    // errors 배열 확인
    if (Array.isArray(errorObj.errors)) {
      const errorMessages = errorObj.errors
        .map((err) => {
          if (typeof err === 'string') return err;
          if (err && typeof err === 'object' && 'msg' in err) {
            return String(err.msg);
          }
          return null;
        })
        .filter((msg): msg is string => msg !== null);
      
      if (errorMessages.length > 0) {
        return errorMessages.join(', ');
      }
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

