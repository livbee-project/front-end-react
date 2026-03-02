/**
 * API 응답 처리 유틸리티
 * FastAPI와 기존 Express API 응답 형식을 모두 처리합니다.
 */

import type { FastApiErrorResponse } from '@/shared/types/api';

/**
 * API 응답 타입 (성공/실패 모두 포함)
 */
export interface ApiResponse<T = unknown> {
  ok?: boolean;
  success?: boolean;
  data?: T;
  error?: string;
  code?: string;
  message?: string;
  userMessage?: string;
  items?: T[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
}

/**
 * API 응답이 성공인지 확인
 */
export const isSuccessResponse = (response: ApiResponse): boolean => {
  return response.ok === true || response.success === true;
};

/**
 * API 응답에서 데이터 추출
 */
export const extractData = <T>(response: ApiResponse<T>): T | null => {
  if (isSuccessResponse(response)) {
    // FastAPI 형식: { ok: true, data: {...} } 또는 { success: true, data: {...} }
    if (response.data !== undefined) {
      return response.data as T;
    }
    // 기존 형식: { ok: true, ...data }
    // response 자체가 T 타입인 경우 (data 필드가 없는 경우)
    // 이 경우는 타입 시스템의 한계로 인해 타입 단언이 필요합니다.
    // 하지만 런타임에서는 response가 이미 올바른 형식임을 보장합니다.
    return response as T;
  }
  return null;
};

/** extractErrorMessage에서 추출 실패 시 반환하는 기본 메시지 */
export const DEFAULT_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';

/**
 * API 응답에서 에러 메시지 추출
 * 백엔드 통일 형식: { ok: false, error, message, userMessage } (최상위 필드)
 */
export const extractErrorMessage = (response: ApiResponse | FastApiErrorResponse): string => {
  const result = response as Record<string, unknown>;

  // 통일된 형식: userMessage, message, error가 최상위에 있음
  if (typeof result.userMessage === 'string') {
    return result.userMessage;
  }
  if (typeof result.message === 'string') {
    return result.message;
  }
  if (typeof result.error === 'string') {
    return result.error;
  }

  // 레거시: detail이 문자열인 경우
  if (typeof result.detail === 'string') {
    return result.detail;
  }
  // 레거시: detail이 객체인 경우 (과거 FastAPI 형식)
  if (result.detail && typeof result.detail === 'object' && typeof (result.detail as Record<string, unknown>).userMessage === 'string') {
    return (result.detail as Record<string, unknown>).userMessage as string;
  }

  return DEFAULT_ERROR_MESSAGE;
};

/**
 * HTTP 응답을 처리하고 데이터 또는 에러를 반환
 */
export const handleApiResponse = async <T>(
  response: Response
): Promise<{ data: T | null; error: string | null }> => {
  const result: ApiResponse<T> = await response.json();

  if (!response.ok || !isSuccessResponse(result)) {
    const errorMessage = extractErrorMessage(result);
    return { data: null, error: errorMessage };
  }

  const data = extractData<T>(result);
  return { data, error: null };
};

