import { extractErrorMessage } from '@/shared/utils/apiResponseHandler';

type ErrorSource = Response | { status?: number };

/**
 * 쇼호스트 전용 엔티티 생성 시 발생하는 에러를 공통 처리합니다.
 */
export const handleShowhostEntityError = (
  source: ErrorSource,
  result: unknown,
  defaultMessage: string
): Error => {
  const status = source instanceof Response ? source.status : source.status ?? 0;

  if (status === 401) {
    return new Error('인증이 필요합니다.');
  }

  if (status === 403) {
    return new Error('권한이 없습니다. 쇼호스트 역할만 등록 가능합니다.');
  }

  const errorMessage = extractErrorMessage(result as never);
  return new Error(errorMessage || defaultMessage);
};

