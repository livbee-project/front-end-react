/**
 * 로그인 UseCase
 * Clean Architecture: Domain Layer - UseCase
 */

import type { LoginRequest, LoginResponse, User } from '@/domain/entities/User';
import type { UserRepository } from '@/data/repositories/UserRepository';
import { setToken } from '@/shared/utils/storage';

export interface LoginUseCaseResult {
  user: User;
  token: string;
}

export class LoginUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * 로그인 실행
   * @param request 로그인 요청
   * @returns 로그인 결과 (사용자 정보 및 토큰)
   */
  async execute(request: LoginRequest): Promise<LoginUseCaseResult> {
    const loginResponse: LoginResponse = await this.userRepository.login(request);
    
    // 토큰 저장
    setToken(loginResponse.token);

    // 사용자 정보 구성 (다중 역할 플래그 포함)
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
