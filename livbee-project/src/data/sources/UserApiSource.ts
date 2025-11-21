import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  MeResponse,
  ApiErrorResponse,
} from '@/domain/entities/User';

/**
 * 사용자 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class UserApiSource {
  /**
   * 로그인
   * @param request - 로그인 요청 데이터
   * @returns 로그인 응답
   * @throws {Error} 로그인 실패 시
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    const url = buildApiUrl('/users/login');
    const headers = getAuthHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: request.email.toLowerCase(), // 이메일 소문자 변환
        password: request.password,
      }),
    });

    const result = await response.json();

    // 에러 응답 처리
    if (!result.ok && !result.success) {
      const error = result as ApiErrorResponse;
      throw new Error(error.userMessage || error.message || '로그인에 실패했습니다.');
    }

    // 백엔드 응답 형식: { ok: true, data: { token: "...", user: { id, name, email, role } } }
    if ((result.ok || result.success) && result.data) {
      const data = result.data;
      return {
        ok: true,
        token: data.token,
        name: data.user?.name || '',
        role: data.user?.role || request.role || 'showhost',
        userId: data.user?.id,
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

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...request,
        email: request.email.toLowerCase(), // 이메일 소문자 변환
      }),
    });

    const result = await response.json();

    // 에러 응답 처리
    if (!result.ok && !result.success) {
      const error = result as ApiErrorResponse;
      throw new Error(error.userMessage || error.message || '회원가입에 실패했습니다.');
    }

    // FastAPI 응답 형식: { success: true, data: { token: "...", user: {...} } }
    if (result.success && result.data) {
      return {
        ok: true,
        userId: result.data.user?.id || '',
        role: result.data.user?.role || request.role,
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

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal,
    });

    const result = await response.json();

    // 에러 응답 처리
    if (!result.ok && !result.success) {
      const error = result as any;
      
      // 토큰이 유효하지 않거나 만료된 경우
      if (error.code === 'INVALID_TOKEN' || error.code === 'AUTH_REQUIRED' || error.error === 'UNAUTHORIZED') {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }

      const apiError = error as ApiErrorResponse;
      throw new Error(apiError.userMessage || apiError.message || '내 정보 조회에 실패했습니다.');
    }

    // FastAPI 응답 형식: { ok: true, data: {...} } 또는 { success: true, data: {...} }
    if ((result.ok || result.success) && result.data) {
      return {
        ok: true,
        id: result.data.id,
        name: result.data.name,
        role: result.data.role,
      };
    }

    // 기존 응답 형식: { ok: true, id: "...", name: "...", role: "..." }
    return result as MeResponse;
  }
}

