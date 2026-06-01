/**
 * API 요청 로깅 유틸리티
 * 개발 환경에서 API 요청/응답을 일관되게 로깅합니다.
 */

import { debug, error as logError } from '@/shared/utils/logger';

interface ApiRequestLogOptions {
  url: string;
  method: string;
  headers?: HeadersInit;
  body?: string;
  context?: string;
}

interface ApiErrorLogOptions {
  url: string;
  method: string;
  status?: number;
  errorMessage: string;
  requestBody?: string;
  errorPayload?: unknown;
  context?: string;
}

/**
 * API 요청 정보를 로깅합니다.
 * 개발 환경에서만 동작합니다.
 */
export function logApiRequest(options: ApiRequestLogOptions): void {
  const { url, method, headers, body, context = 'API 요청' } = options;
  
  debug(context, {
    url,
    method,
    headers: headers ? (headers as Record<string, string>) : undefined,
    body: body ? JSON.parse(body) : undefined,
  });
}

/**
 * API 에러 정보를 로깅합니다.
 * 개발 환경에서만 동작합니다.
 */
export function logApiError(options: ApiErrorLogOptions): void {
  const {
    url,
    method,
    status,
    errorMessage,
    requestBody,
    errorPayload,
    context = 'API 에러',
  } = options;

  logError(context, {
    url,
    method,
    status,
    errorMessage,
    requestBody: requestBody ? JSON.parse(requestBody) : undefined,
    errorPayload: errorPayload
      ? (typeof errorPayload === 'string'
          ? errorPayload
          : JSON.stringify(errorPayload, null, 2))
      : undefined,
  });
}

