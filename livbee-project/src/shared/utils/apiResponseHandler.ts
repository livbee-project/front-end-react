/**
 * API 응답 처리 유틸리티
 * FastAPI와 기존 Express API 응답 형식을 모두 처리합니다.
 */

/**
 * API 응답 타입 (성공/실패 모두 포함)
 */
export interface ApiResponse<T = any> {
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
    return response as unknown as T;
  }
  return null;
};

/**
 * API 응답에서 에러 메시지 추출
 */
export const extractErrorMessage = (response: ApiResponse): string => {
  if (response.userMessage) {
    return response.userMessage;
  }
  if (response.message) {
    return response.message;
  }
  if (response.error) {
    return response.error;
  }
  return '알 수 없는 오류가 발생했습니다.';
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

