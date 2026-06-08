/**
 * API 공통 설정 — env SSOT 기반
 */

import { env } from '@/shared/config/env';

export const API_BASE_URL = env.apiUrl;

export const DEFAULT_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
};

export const buildApiUrl = (
  endpoint: string,
  params?: URLSearchParams | Record<string, string | number | undefined>,
): string => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let url = `${API_BASE_URL}${path}`;

  if (params) {
    const searchParams =
      params instanceof URLSearchParams ? params : new URLSearchParams();

    if (!(params instanceof URLSearchParams)) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, String(value));
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

export const buildWebSocketUrl = (endpoint: string): string => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const httpUrl = new URL(`${API_BASE_URL}${path}`);
  httpUrl.protocol = httpUrl.protocol === 'https:' ? 'wss:' : 'ws:';
  return httpUrl.toString();
};
