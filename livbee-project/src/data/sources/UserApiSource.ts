import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { getToken } from '@/shared/utils/storage';
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
        role: request.role,
      }),
    });

    const data: LoginResponse | ApiErrorResponse = await response.json();

    if (!data.ok) {
      const error = data as ApiErrorResponse;
      throw new Error(error.userMessage || error.message || '로그인에 실패했습니다.');
    }

    return data as LoginResponse;
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

    const data: SignupResponse | ApiErrorResponse = await response.json();

    if (!data.ok) {
      const error = data as ApiErrorResponse;
      throw new Error(error.userMessage || error.message || '회원가입에 실패했습니다.');
    }

    return data as SignupResponse;
  }

  /**
   * 내 정보 조회
   * @returns 내 정보 응답
   * @throws {Error} 조회 실패 시
   */
  async getMe(): Promise<MeResponse> {
    const token = getToken();
    if (!token) {
      throw new Error('인증 토큰이 없습니다.');
    }

    const url = buildApiUrl('/users/me');
    const headers = getAuthHeaders(token);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data: MeResponse | ApiErrorResponse = await response.json();

    if (!data.ok) {
      const error = data as ApiErrorResponse;
      
      // 토큰이 유효하지 않거나 만료된 경우
      if (error.code === 'INVALID_TOKEN' || error.code === 'AUTH_REQUIRED') {
        // 토큰 제거는 호출하는 쪽에서 처리
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }

      throw new Error(error.userMessage || error.message || '내 정보 조회에 실패했습니다.');
    }

    return data as MeResponse;
  }
}

