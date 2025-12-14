/**
 * 사용자 역할 타입
 */
export type UserRole = 'brand' | 'showhost';

/**
 * 사용자 타입 (UI에서 사용)
 * UserRole에 'model'을 추가한 확장 타입
 */
export type UserType = UserRole | 'model';

/**
 * 사용자 엔티티
 */
export interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
}

/**
 * 로그인 요청 타입
 */
export interface LoginRequest {
  email: string;
  password: string;
  role?: UserRole; // 선택사항: 제공하지 않으면 사용자의 실제 역할 사용
}

/**
 * 로그인 응답 타입
 */
export interface LoginResponse {
  ok: boolean;
  token: string;
  name: string;
  role: UserRole;
  userId?: string; // 백엔드 응답의 user.id (선택사항)
}

/**
 * 회원가입 요청 타입 (Brand)
 */
export interface SignupRequestBrand {
  name: string;
  email: string;
  password: string;
  role: 'brand';
  phone: string;
  brandName: string;
  companyName?: string;
  businessNumber?: string;
}

/**
 * 회원가입 요청 타입 (Showhost)
 */
export interface SignupRequestShowhost {
  name: string;
  email: string;
  password: string;
  role: 'showhost';
  phone: string;
  nickname?: string;
  snsLink?: string;
  introduction?: string;
}

/**
 * 회원가입 요청 타입 (Union)
 */
export type SignupRequest = SignupRequestBrand | SignupRequestShowhost;

/**
 * 회원가입 응답 타입
 */
export interface SignupResponse {
  ok: boolean;
  userId: string;
  role: UserRole;
}

/**
 * 내 정보 조회 응답 타입
 */
export interface MeResponse {
  ok: boolean;
  id: string;
  name: string;
  role: UserRole;
}

/**
 * API 에러 응답 타입
 */
export interface ApiErrorResponse {
  ok: false;
  code: string;
  message: string;
  userMessage?: string;
}

