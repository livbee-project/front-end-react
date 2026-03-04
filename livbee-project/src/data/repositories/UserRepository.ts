import type { IUserApiSource } from '@/data/sources/interfaces/IUserApiSource';
import { UserApiSource } from '@/data/sources/UserApiSource';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  MeResponse,
  BusinessVerificationResult,
} from '@/domain/entities/User';
import { BaseRepository } from '@/data/repositories/BaseRepository';

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

