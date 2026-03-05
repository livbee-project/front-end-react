import type { IUserApiSource } from '@/data/sources/interfaces/IUserApiSource';
import { UserApiSource } from '@/data/sources/UserApiSource';
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
import { BaseRepository } from '@/data/repositories/BaseRepository';
import { ApiError } from '@/shared/utils/apiClient';

/**
 * 사용자 리포지토리
 * 도메인 로직과 데이터 소스 사이의 인터페이스 역할
 */
export class UserRepository extends BaseRepository {
  private apiSource: IUserApiSource;

  constructor(apiSource?: IUserApiSource) {
    super();
    // 의존성 주입: apiSource가 제공되지 않으면 기본 구현 사용
    this.apiSource = apiSource ?? new UserApiSource();
  }

  /**
   * 로그인
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    return this.handleError(
      () => this.apiSource.login(request),
      'UserRepository',
      '로그인'
    );
  }

  /**
   * 카카오 로그인
   * - 백엔드에서 이 카카오 계정이 현재 선택한 역할로 가입되지 않은 경우(null 반환)
   */
  async loginWithKakao(info: KakaoUserInfo, role: UserRole): Promise<LoginResponse | null> {
    try {
      const response = await this.apiSource.loginWithKakao(info, role);
      return response;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        const payload = (error.payload ?? {}) as { error?: string; code?: string };
        const code = payload.code ?? payload.error;

        if (code === 'USER_NOT_FOUND' || code === 'USER_NOT_FOUND_FOR_ROLE') {
          // 이 카카오 계정은 현재 선택한 역할로는 아직 가입되지 않음 → 회원가입 플로우로 분기
          return null;
        }
      }
      throw error;
    }
  }

  /**
   * 회원가입
   */
  async signup(request: SignupRequest): Promise<SignupResponse> {
    return this.handleError(
      () => this.apiSource.signup(request),
      'UserRepository',
      '회원가입'
    );
  }

  /**
   * 내 정보 조회
   */
  async getMe(signal?: AbortSignal): Promise<MeResponse> {
    return this.handleError(
      () => this.apiSource.getMe(signal),
      'UserRepository',
      '내 정보 조회'
    );
  }

  /**
   * 인증번호 발송
   */
  async sendSms(phone: string): Promise<void> {
    return this.handleError(
      () => this.apiSource.sendSms(phone),
      'UserRepository',
      '인증번호 발송'
    );
  }

  /**
   * 인증번호 확인
   */
  async verifySms(phone: string, code: string): Promise<void> {
    return this.handleError(
      () => this.apiSource.verifySms(phone, code),
      'UserRepository',
      '인증번호 확인'
    );
  }

  /**
   * 사업자등록번호 진위 확인 / 상태조회
   */
  async verifyBusiness(
    businessNumber: string,
    openingDate?: string,
    representativeName?: string
  ): Promise<BusinessVerificationResult> {
    return this.handleError(
      () => this.apiSource.verifyBusiness(businessNumber, openingDate, representativeName),
      'UserRepository',
      '사업자 진위 확인'
    );
  }
}

