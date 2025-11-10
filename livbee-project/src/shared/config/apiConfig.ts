/**
 * API 설정 공통 파일
 * 모든 API 호출에서 사용하는 공통 설정을 관리합니다.
 */

/**
 * API 베이스 URL
 * 백엔드 서버의 기본 URL입니다.
 */
export const API_BASE_URL = 'https://main-server-ekgr.onrender.com/api/v1';

/**
 * 기본 API 요청 헤더
 */
export const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
};

/**
 * 인증 토큰을 포함한 헤더 생성
 * @param token - 인증 토큰 (선택)
 * @returns 헤더 객체
 */
export const getAuthHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    ...DEFAULT_HEADERS,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
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

