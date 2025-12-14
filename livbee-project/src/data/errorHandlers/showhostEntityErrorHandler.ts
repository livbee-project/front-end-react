import { extractErrorMessageFromResult, getDefaultErrorMessageByStatus, isAuthenticationError, isAuthorizationError } from '@/shared/utils/errorUtils';

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

  // 인증 에러 처리
  if (isAuthenticationError(status)) {
    return new Error('인증이 필요합니다.');
  }

  // 권한 에러 처리
  if (isAuthorizationError(status)) {
    return new Error('권한이 없습니다. 쇼호스트 역할만 등록 가능합니다.');
  }

  // 상태 코드에 따른 기본 메시지 또는 추출된 메시지 사용
  const statusMessage = getDefaultErrorMessageByStatus(status);
  const extractedMessage = extractErrorMessageFromResult(result, defaultMessage);
  
  return new Error(statusMessage || extractedMessage);
};

