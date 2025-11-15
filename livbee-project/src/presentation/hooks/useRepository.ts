import { useRef } from 'react';

/**
 * Repository 인스턴스를 useRef로 관리하는 커스텀 훅
 * 매 렌더링마다 재생성되지 않도록 보장합니다.
 * 
 * @param RepositoryClass - Repository 클래스 생성자
 * @returns Repository 인스턴스
 * 
 * @example
 * ```tsx
 * const modelRepository = useRepository(ModelRepository);
 * ```
 */
export function useRepository<T>(RepositoryClass: new () => T): T {
  const ref = useRef<T | null>(null);
  if (!ref.current) {
    ref.current = new RepositoryClass();
  }
  return ref.current;
}

