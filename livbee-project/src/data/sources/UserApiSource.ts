import { buildApiUrl, DEFAULT_HEADERS, getAuthHeaders } from '@/shared/config/apiConfig';
import { fetchApi, handleAuthError } from '@/shared/utils/apiClient';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  MeResponse,
  BusinessVerificationResult,
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
        isBrand?: boolean;
        isShowhost?: boolean;
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

    // 백엔드 응답 형식: { ok: true, data: { token: "...", user: { id, name, email, role, isBrand, isShowhost } } }
    // 백엔드가 snake_case(is_brand, is_showhost)로 응답할 수 있음
    if (result && typeof result === 'object' && 'token' in result) {
      const u = result.user as Record<string, unknown> | undefined;
      return {
        ok: true,
        token: result.token,
        name: (result.user?.name as string) || '',
        role: (result.user?.role || request.role || 'showhost') as 'brand' | 'showhost',
        userId: result.user?.id as string | undefined,
        isBrand: (u?.isBrand ?? u?.is_brand) as boolean | undefined,
        isShowhost: (u?.isShowhost ?? u?.is_showhost) as boolean | undefined,
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
        isBrand?: boolean;
        isShowhost?: boolean;
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
      // 백엔드가 snake_case(is_brand, is_showhost)로 응답할 수 있음
      if (result && typeof result === 'object' && 'id' in result) {
        const r = result as Record<string, unknown>;
        return {
          ok: true,
          id: result.id,
          name: result.name,
          role: result.role as 'brand' | 'showhost',
          isBrand: (r.isBrand ?? r.is_brand) as boolean | undefined,
          isShowhost: (r.isShowhost ?? r.is_showhost) as boolean | undefined,
        };
      }

      // 기존 응답 형식: { ok: true, id: "...", name: "...", role: "..." }
      return result as MeResponse;
    } catch (error) {
      throw handleAuthError(error, '내 정보 조회에 실패했습니다.');
    }
  }

  /**
   * 인증번호 발송 (비인증 공개 엔드포인트)
   * @param phone - 휴대폰 번호
   */
  async sendSms(phone: string): Promise<void> {
    const url = buildApiUrl('/auth/send-sms');
    await fetchApi<void>(
      url,
      {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({ phoneNumber: phone }),
      },
      '인증번호 발송'
    );
  }

  /**
   * 인증번호 확인 (비인증 공개 엔드포인트)
   * @param phone - 휴대폰 번호
   * @param code - 인증번호
   */
  async verifySms(phone: string, code: string): Promise<void> {
    const url = buildApiUrl('/auth/verify-sms');
    await fetchApi<void>(
      url,
      {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify({ phoneNumber: phone, code }),
      },
      '인증번호 확인'
    );
  }

  /**
   * 사업자등록번호 진위 확인 / 상태조회 (비인증 공개 엔드포인트)
   * @param businessNumber - 사업자등록번호 (숫자 10자리 또는 하이픈 포함)
   * @param openingDate - 개업일자(YYYYMMDD, 선택)
   * @param representativeName - 대표자명(선택)
   */
  async verifyBusiness(
    businessNumber: string,
    openingDate?: string,
    representativeName?: string
  ): Promise<BusinessVerificationResult> {
    const url = buildApiUrl('/auth/verify-business');
    const payload: {
      businessNumber: string;
      openingDate?: string;
      representativeName?: string;
    } = {
      businessNumber,
    };

    if (openingDate) {
      payload.openingDate = openingDate;
    }
    if (representativeName) {
      payload.representativeName = representativeName;
    }

    return await fetchApi<BusinessVerificationResult>(
      url,
      {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(payload),
      },
      '사업자 진위 확인'
    );
  }
}

