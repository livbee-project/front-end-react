/**
 * API 설정 공통 파일
 * 모든 API 호출에서 사용하는 공통 설정을 관리합니다.
 */

import { getToken } from '@/shared/utils/storage';

/**
 * 환경별 API 베이스 URL
 * 환경변수 VITE_API_URL이 설정되어 있으면 사용하고,
 * 없으면 현재 환경에 따라 기본값 사용
 */
const getApiBaseUrl = (): string => {
  // 환경변수에서 우선 가져오기
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 환경에 따른 기본값
  const env = import.meta.env.MODE;
  if (env === 'production') {
    return 'https://api.livbee.co.kr/api/v1';
  } else if (env === 'development') {
    return 'https://dev-api.livbee.co.kr/api/v1';
  } else {
    return 'http://localhost:8000/api/v1';
  }
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * 기본 API 요청 헤더
 */
export const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
};

/**
 * 인증 토큰을 포함한 헤더 생성
 * @param token - 인증 토큰 (선택, 없으면 storage에서 자동으로 가져옴)
 * @returns 헤더 객체
 */
export const getAuthHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    ...DEFAULT_HEADERS,
  };

  // 토큰이 제공되지 않으면 storage에서 가져오기
  let authToken: string | undefined = token;
  if (!authToken && typeof window !== 'undefined') {
    const tokenFromStorage = getToken();
    authToken = tokenFromStorage || undefined;
  }

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  return headers;
};

/**
 * API 엔드포인트 URL 생성
 * @param endpoint - API 엔드포인트 경로 (예: '/campaigns')
 * @param params - 쿼리 파라미터 (선택)
 * @returns 완전한 API URL
 */
export const buildApiUrl = (
  endpoint: string,
  params?: URLSearchParams | Record<string, string | number | undefined>
): string => {
  const baseUrl = API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let url = `${baseUrl}${path}`;

  if (params) {
    const searchParams = params instanceof URLSearchParams
      ? params
      : new URLSearchParams();

    if (!(params instanceof URLSearchParams)) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value.toString());
        }
      });
    }

    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  return url;
};

