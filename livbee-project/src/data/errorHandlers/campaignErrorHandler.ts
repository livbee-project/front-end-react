/**
 * Campaign API 에러 처리 유틸리티
 */

import { extractErrorMessageFromResult, isAuthenticationError } from '@/shared/utils/errorUtils';

/**
 * Campaign API 에러를 처리하고 적절한 에러 메시지를 반환
 */
export const handleCampaignApiError = (
  response: Response,
  result: unknown
): Error => {
  // 인증 오류 처리
  if (isAuthenticationError(response.status)) {
    return new Error('인증이 필요합니다. 브랜드 계정으로 다시 로그인해주세요.');
  }

  // 에러 메시지 추출 (공통 유틸리티 사용)
  const errorMessage = extractErrorMessageFromResult(result, '모집 공고 등록에 실패했습니다.');
  return new Error(errorMessage);
};

