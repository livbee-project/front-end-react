/**
 * 현재 사용자 조회 UseCase
 * Clean Architecture: Domain Layer - UseCase
 */

import type { User, MeResponse } from '@/domain/entities/User';
import type { UserRepository } from '@/data/repositories/UserRepository';
import { getToken, removeToken } from '@/shared/utils/storage';

export interface GetCurrentUserUseCaseResult {
  user: User | null;
  isAuthenticated: boolean;
}

export class GetCurrentUserUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * 현재 사용자 조회 실행
   * @param signal AbortSignal (선택)
   * @returns 현재 사용자 정보 또는 null
   */
  async execute(signal?: AbortSignal): Promise<GetCurrentUserUseCaseResult> {
    const token = getToken();
    
    if (!token) {
      return {
        user: null,
        isAuthenticated: false,
      };
    }

    try {
      const meResponse: MeResponse = await this.userRepository.getMe(signal);
      
      const user: User = {
        id: meResponse.id,
        name: meResponse.name,
        role: meResponse.role,
      };

      return {
        user,
        isAuthenticated: true,
      };
    } catch {
      // 토큰이 유효하지 않은 경우
      removeToken();
      return {
        user: null,
        isAuthenticated: false,
      };
    }
  }
}

