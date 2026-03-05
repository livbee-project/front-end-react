import type { KakaoUserInfo, LoginResponse, User, UserRole } from '@/domain/entities/User';
import type { UserRepository } from '@/data/repositories/UserRepository';
import { setToken } from '@/shared/utils/storage';
import type { LoginUseCaseResult } from '@/domain/usecases/auth/LoginUseCase';

export interface KakaoLoginRequest extends KakaoUserInfo {
  role: UserRole;
}

export class KakaoLoginUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * 카카오 로그인 실행
   * - 이미 가입된 카카오 계정이면 토큰/유저 정보를 반환
   * - 아직 가입되지 않은 경우 null 반환
   */
  async execute(request: KakaoLoginRequest): Promise<LoginUseCaseResult | null> {
    const loginResponse: LoginResponse | null = await this.userRepository.loginWithKakao(
      {
        name: request.name,
        email: request.email,
        kakaoId: request.kakaoId,
      },
      request.role
    );

    if (!loginResponse) {
      return null;
    }

    setToken(loginResponse.token);

    const user: User = {
      id: loginResponse.userId || '',
      name: loginResponse.name,
      role: loginResponse.role,
      isBrand: loginResponse.isBrand,
      isShowhost: loginResponse.isShowhost,
    };

    return {
      user,
      token: loginResponse.token,
    };
  }
}

