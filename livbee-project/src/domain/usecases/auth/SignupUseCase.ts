/**
 * 회원가입 UseCase
 * Clean Architecture: Domain Layer - UseCase
 */

import type { SignupRequest, SignupResponse } from '@/domain/entities/User';
import type { UserRepository } from '@/data/repositories/UserRepository';

export class SignupUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * 회원가입 실행
   * @param request 회원가입 요청
   * @returns 회원가입 응답
   */
  async execute(request: SignupRequest): Promise<SignupResponse> {
    return await this.userRepository.signup(request);
  }
}

