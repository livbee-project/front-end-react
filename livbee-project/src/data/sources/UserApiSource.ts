import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { fetchApi, handleAuthError } from '@/shared/utils/apiClient';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  MeResponse,
} from '@/domain/entities/User';

import type { IUserApiSource } from '@/data/sources/interfaces/IUserApiSource';

/**
 * 사용자 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class UserApiSource implements IUserApiSource {
  /**
   * 로그인
   * @param request - 로그인 요청 데이터
   * @returns 로그인 응답
   * @throws {Error} 로그인 실패 시
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    const url = buildApiUrl('/users/login');
    const headers = getAuthHeaders();

    const result = await fetchApi<{
      token: string;
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }>(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: request.email.toLowerCase(), // 이메일 소문자 변환
          password: request.password,
        }),
      },
      '로그인'
    );

    // 백엔드 응답 형식: { ok: true, data: { token: "...", user: { id, name, email, role } } }
    if (result && typeof result === 'object' && 'token' in result) {
      return {
        ok: true,
        token: result.token,
        name: result.user?.name || '',
        role: (result.user?.role || request.role || 'showhost') as 'brand' | 'showhost',
        userId: result.user?.id,
      };
    }

    // 기존 응답 형식: { ok: true, token: "...", name: "...", role: "..." }
    return result as LoginResponse;
  }

  /**
   * 회원가입
   * @param request - 회원가입 요청 데이터
   * @returns 회원가입 응답
   * @throws {Error} 회원가입 실패 시
   */
  async signup(request: SignupRequest): Promise<SignupResponse> {
    const url = buildApiUrl('/users/signup');
    const headers = getAuthHeaders();

    const result = await fetchApi<{
      user?: {
        id: string;
        role: string;
      };
    }>(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...request,
          email: request.email.toLowerCase(), // 이메일 소문자 변환
        }),
      },
      '회원가입'
    );

    // FastAPI 응답 형식: { success: true, data: { token: "...", user: {...} } }
    if (result && typeof result === 'object' && 'user' in result) {
      return {
        ok: true,
        userId: result.user?.id || '',
        role: (result.user?.role || request.role) as 'brand' | 'showhost',
      };
    }

    // 기존 응답 형식: { ok: true, userId: "...", role: "..." }
    return result as SignupResponse;
  }

  /**
   * 내 정보 조회
   * @param signal - 요청 취소를 위한 AbortSignal (선택)
   * @returns 내 정보 응답
   * @throws {Error} 조회 실패 시
   */
  async getMe(signal?: AbortSignal): Promise<MeResponse> {
    const url = buildApiUrl('/users/me');
    const headers = getAuthHeaders();

    try {
      const result = await fetchApi<{
        id: string;
        name: string;
        role: string;
      }>(
        url,
        {
          method: 'GET',
          headers,
          signal,
        },
        '내 정보 조회'
      );

      // FastAPI 응답 형식: { ok: true, data: {...} } 또는 { success: true, data: {...} }
      if (result && typeof result === 'object' && 'id' in result) {
        return {
          ok: true,
          id: result.id,
          name: result.name,
          role: result.role as 'brand' | 'showhost',
        };
      }

      // 기존 응답 형식: { ok: true, id: "...", name: "...", role: "..." }
      return result as MeResponse;
    } catch (error) {
      throw handleAuthError(error, '내 정보 조회에 실패했습니다.');
    }
  }
}

