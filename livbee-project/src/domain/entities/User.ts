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
  /**
   * 이 계정이 브랜드 역할을 보유하는지 여부
   */
  isBrand?: boolean;
  /**
   * 이 계정이 쇼호스트 역할을 보유하는지 여부
   */
  isShowhost?: boolean;
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
  /**
   * 브랜드 역할 보유 여부 (백엔드 user.isBrand 플래그)
   */
  isBrand?: boolean;
  /**
   * 쇼호스트 역할 보유 여부 (백엔드 user.isShowhost 플래그)
   */
  isShowhost?: boolean;
}

/**
 * 회원가입 요청 타입 (Brand)
 * password: 카카오 가입(kakaoId 있음) 시 생략 가능
 */
export interface SignupRequestBrand {
  name: string;
  email: string;
  password?: string;
  role: 'brand';
  phone: string;
  brandName: string;
  companyName?: string;
  businessNumber?: string;
  kakaoId?: string;
}

/**
 * 회원가입 요청 타입 (Showhost)
 * password: 카카오 가입(kakaoId 있음) 시 생략 가능
 */
export interface SignupRequestShowhost {
  name: string;
  email: string;
  password?: string;
  role: 'showhost';
  phone: string;
  nickname?: string;
  snsLink?: string;
  introduction?: string;
  kakaoId?: string;
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
  /**
   * 브랜드 역할 보유 여부
   */
  isBrand?: boolean;
  /**
   * 쇼호스트 역할 보유 여부
   */
  isShowhost?: boolean;
}

/**
 * 카카오 사용자 정보 타입
 */
export interface KakaoUserInfo {
  name: string;
  email: string;
  kakaoId?: string;
}

import type { UnifiedApiErrorResponse } from '@/shared/types/api';

/**
 * API 에러 응답 타입 (UnifiedApiErrorResponse 별칭)
 */
export type ApiErrorResponse = UnifiedApiErrorResponse;
