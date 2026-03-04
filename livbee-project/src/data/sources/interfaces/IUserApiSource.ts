import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  MeResponse,
} from '@/domain/entities/User';

/**
 * 사용자 API 소스 인터페이스
 */
export interface IUserApiSource {
  login(request: LoginRequest): Promise<LoginResponse>;
  signup(request: SignupRequest): Promise<SignupResponse>;
  getMe(signal?: AbortSignal): Promise<MeResponse>;
  sendSms(phone: string): Promise<void>;
  verifySms(phone: string, code: string): Promise<void>;
}

