import type { IUserApiSource } from '@/data/sources/interfaces/IUserApiSource';
import { UserApiSource } from '@/data/sources/UserApiSource';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  MeResponse,
} from '@/domain/entities/User';
import { error as logError } from '@/shared/utils/logger';

/**
 * 사용자 리포지토리
 * 도메인 로직과 데이터 소스 사이의 인터페이스 역할
 */
export class UserRepository {
  private apiSource: IUserApiSource;

  constructor(apiSource?: IUserApiSource) {
    // 의존성 주입: apiSource가 제공되지 않으면 기본 구현 사용
    this.apiSource = apiSource ?? new UserApiSource();
  }

  /**
   * 로그인
   */
  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      return await this.apiSource.login(request);
    } catch (error) {
      logError('UserRepository', '로그인 실패:', error);
      throw error;
    }
  }

  /**
   * 회원가입
   */
  async signup(request: SignupRequest): Promise<SignupResponse> {
    try {
      return await this.apiSource.signup(request);
    } catch (error) {
      logError('UserRepository', '회원가입 실패:', error);
      throw error;
    }
  }

  /**
   * 내 정보 조회
   */
  async getMe(signal?: AbortSignal): Promise<MeResponse> {
    try {
      return await this.apiSource.getMe(signal);
    } catch (error) {
      logError('UserRepository', '내 정보 조회 실패:', error);
      throw error;
    }
  }
}

