/**
 * 공통 API 클라이언트 유틸리티
 * 네트워크 에러, JSON 파싱, 에러 처리를 통합한 공통 함수 제공
 */

import { extractErrorMessage, isSuccessResponse, extractData, type ApiResponse } from '@/shared/utils/apiResponseHandler';
import { emitApiErrorEvent } from '@/shared/utils/apiEvents';

export class ApiError extends Error {
  status?: number;
  payload?: unknown;

  constructor(message: string, status?: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

/**
 * 네트워크 에러인지 확인
 */
const isNetworkError = (error: unknown): boolean => {
  return error instanceof TypeError && error.message.includes('fetch');
};

/**
 * 네트워크 에러를 사용자 친화적 메시지로 변환
 */
const handleNetworkError = (error: unknown, defaultMessage: string): Error => {
  if (isNetworkError(error)) {
    return new Error('네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
  }
  return new Error(defaultMessage);
};

const notifyApiError = (message: string, status?: number, context?: string) => {
  emitApiErrorEvent({ message, status, context });
};

/**
 * API 요청 옵션
 */
export interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: BodyInit;
  signal?: AbortSignal;
}

/**
 * API 요청 실행 및 응답 처리
 * 
 * @param url - 요청 URL
 * @param options - 요청 옵션
 * @param errorContext - 에러 발생 시 사용할 컨텍스트 메시지
 * @returns 파싱된 응답 데이터
 * @throws {Error} 요청 실패 시
 */
export async function fetchApi<T>(
  url: string,
  options: ApiRequestOptions = {},
  errorContext: string = '요청'
): Promise<T> {
  const { method = 'GET', headers, body, signal } = options;

  // 1. 네트워크 요청 실행
  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body,
      signal,
    });
  } catch (error) {
    const networkError = handleNetworkError(error, `${errorContext} 요청 중 오류가 발생했습니다.`);
    notifyApiError(networkError.message, undefined, errorContext);
    throw networkError;
  }

  // 2. JSON 파싱
  let result: ApiResponse<T> | { detail?: string };
  try {
    result = await response.json();
  } catch {
    // JSON 파싱 실패 시
    if (!response.ok) {
      // 에러 응답 본문을 텍스트로 읽기 시도
      let errorText = '';
      try {
        const clonedResponse = response.clone();
        errorText = await clonedResponse.text();
      } catch {
        // 텍스트 읽기 실패 시 무시
      }
      console.error(`[fetchApi] ❌ ${errorContext} 실패 - JSON 파싱 불가:`, {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      const parsingError = new Error(`${errorContext}에 실패했습니다. (${response.status})`);
      notifyApiError(parsingError.message, response.status, errorContext);
      throw parsingError;
    }
    const unknownFormatError = new Error('예상치 못한 응답 형식입니다.');
    notifyApiError(unknownFormatError.message, response.status, errorContext);
    throw unknownFormatError;
  }

  // 3. 에러 응답 처리
  if (!response.ok || !isSuccessResponse(result as ApiResponse<T>)) {
    let errorMessage = extractErrorMessage(result);
    // 429 Rate Limit: userMessage 없을 때 기본 메시지 사용
    if (response.status === 429 && !(result && typeof result === 'object' && typeof (result as Record<string, unknown>).userMessage === 'string')) {
      errorMessage = '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
    }
    // 에러 응답을 자세히 로그로 출력
    console.error(`[fetchApi] ❌ ${errorContext} 실패:`, {
      status: response.status,
      statusText: response.statusText,
      errorMessage,
      errorResponse: result,
    });
    // 에러 응답의 모든 필드를 펼쳐서 출력
    if (result && typeof result === 'object') {
      console.error(`[fetchApi] ❌ ${errorContext} 에러 응답 상세:`, JSON.stringify(result, null, 2));
      // detail, message, userMessage 등 주요 필드 확인
      const errorObj = result as Record<string, unknown>;
      console.error(`[fetchApi] ❌ ${errorContext} 에러 필드:`, {
        detail: errorObj.detail,
        message: errorObj.message,
        userMessage: errorObj.userMessage,
        error: errorObj.error,
        code: errorObj.code,
        allKeys: Object.keys(errorObj),
      });
    }
    const apiError = new ApiError(errorMessage || `${errorContext}에 실패했습니다.`, response.status, result);
    notifyApiError(apiError.message, apiError.status, errorContext);
    throw apiError;
  }

  // 4. 성공 응답 데이터 추출
  const data = extractData<T>(result as ApiResponse<T>);
  if (data !== null) {
    return data;
  }

  // 5. data 필드가 없는 경우 (기존 응답 형식)
  // result 자체가 T 타입인 경우
  // 타입 시스템의 한계로 인해 타입 단언이 필요하지만,
  // 런타임에서는 result가 이미 올바른 형식임을 보장합니다.
  return result as T;
}

/**
 * 인증 관련 특수 에러 처리
 * 토큰 만료 등의 인증 에러를 감지하고 적절한 메시지 반환
 */
export function handleAuthError(error: unknown, defaultMessage: string): Error {
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();
    if (
      errorMessage.includes('unauthorized') ||
      errorMessage.includes('invalid_token') ||
      errorMessage.includes('auth_required') ||
      errorMessage.includes('인증이 만료')
    ) {
      return new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }
  }
  return error instanceof Error ? error : new Error(defaultMessage);
}

/**
 * AbortError인지 확인 (요청 취소)
 */
export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

