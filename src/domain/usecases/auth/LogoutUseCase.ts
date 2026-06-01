/**
 * 로그아웃 UseCase
 * Clean Architecture: Domain Layer - UseCase
 */

import { removeToken } from '@/shared/utils/storage';

export class LogoutUseCase {
  /**
   * 로그아웃 실행
   */
  execute(): void {
    removeToken();
  }
}

