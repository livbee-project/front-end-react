/**
 * API 응답 관련 타입 정의
 */

/**
 * FastAPI 에러 응답 형식
 */
export interface FastApiErrorResponse {
  detail?: string;
}

/**
 * 백엔드 응답의 snake_case 필드명을 가진 객체
 */
export interface SnakeCaseResponse {
  application_id?: string;
  chat_room_id?: string;
  room_id?: string;
  payment_request?: unknown;
  [key: string]: unknown;
}

/**
 * 중첩된 data 필드를 가진 응답
 */
export interface NestedDataResponse<T = unknown> {
  data?: T | NestedDataResponse<T>;
  [key: string]: unknown;
}

