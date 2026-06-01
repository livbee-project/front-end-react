/**
 * BaseRepository 추상 클래스
 * 모든 Repository의 공통 에러 처리 로직을 통합
 */

import { error as logError } from '@/shared/utils/logger';

/**
 * Repository의 기본 구현을 제공하는 추상 클래스
 * 공통 에러 처리 로직을 캡슐화하여 중복 코드를 제거합니다.
 */
export abstract class BaseRepository {
  /**
   * 공통 에러 처리 래퍼
   * 모든 Repository 메서드에서 동일한 에러 처리 패턴을 적용합니다.
   * 
   * @param operation - 실행할 비동기 작업
   * @param repositoryName - Repository 이름 (에러 로깅용)
   * @param operationName - 작업 이름 (에러 로깅용)
   * @returns 작업 결과
   * @throws 원본 에러를 그대로 throw
   */
  protected async handleError<T>(
    operation: () => Promise<T>,
    repositoryName: string,
    operationName: string
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      logError(repositoryName, `${operationName} 실패:`, error);
      throw error;
    }
  }
}

