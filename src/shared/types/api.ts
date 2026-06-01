/**
 * API 응답 관련 타입 정의
 */

/**
 * 검증 에러 항목 (Pydantic/FastAPI 스타일)
 * - loc/msg/type: 백엔드 통일 형식 (예: ["body", "email"])
 * - param/location: 레거시 호환용 (선택)
 */
export interface ValidationErrorItem {
  /** 백엔드 형식: 경로 배열 (예: ["body", "email"]) */
  loc?: string[];
  msg: string;
  /** 백엔드 형식: 에러 타입 */
  type?: string;
  /** 레거시: 필드명 */
  param?: string;
  /** 레거시: 위치 */
  location?: string;
}

/**
 * 백엔드 통일 에러 응답 형식
 * { ok: false, error?, message?, userMessage?, code?, errors? }
 */
export interface UnifiedApiErrorResponse {
  ok: false;
  error?: string;
  message?: string;
  userMessage?: string;
  /** 에러 코드 (레거시 호환) */
  code?: string;
  /** 검증 에러 목록 (Campaign 등 폼 검증 시) */
  errors?: ValidationErrorItem[];
}

/**
 * FastAPI 레거시 에러 응답 형식 (detail 필드)
 * UnifiedApiErrorResponse와 호환되도록 detail을 optional로 유지
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

