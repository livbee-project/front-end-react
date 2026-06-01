import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  MeResponse,
  BusinessVerificationResult,
  KakaoUserInfo,
  UserRole,
} from '@/domain/entities/User';

/**
 * 사용자 API 소스 인터페이스
 */
export interface IUserApiSource {
  login(request: LoginRequest): Promise<LoginResponse>;
  loginWithKakao(
    info: KakaoUserInfo,
    role: UserRole
  ): Promise<LoginResponse>;
  signup(request: SignupRequest): Promise<SignupResponse>;
  getMe(signal?: AbortSignal): Promise<MeResponse>;
  sendSms(phone: string): Promise<void>;
  verifySms(phone: string, code: string): Promise<void>;
  verifyBusiness(
    businessNumber: string,
    openingDate?: string,
    representativeName?: string
  ): Promise<BusinessVerificationResult>;
}

