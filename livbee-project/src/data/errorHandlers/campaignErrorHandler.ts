/**
 * Campaign API 에러 처리 유틸리티
 */

import type { CampaignApiErrorResponse } from '@/domain/entities/Campaign';
import type { ApiResponse } from '@/shared/utils/apiResponseHandler';
import type { FastApiErrorResponse } from '@/shared/types/api';
import { extractErrorMessage } from '@/shared/utils/apiResponseHandler';

/**
 * Campaign API 에러를 처리하고 적절한 에러 메시지를 반환
 */
export const handleCampaignApiError = (
  response: Response,
  result: unknown
): Error => {
  // 인증 오류 처리
  if (response.status === 401) {
    return new Error('인증이 필요합니다. 브랜드 계정으로 다시 로그인해주세요.');
  }

  const error = result as CampaignApiErrorResponse;

  // 유효성 검사 실패 시 상세 에러 메시지 처리
  if (error.errors && Array.isArray(error.errors)) {
    const errorMessages = error.errors.map((err) => err.msg).join(', ');
    return new Error(errorMessages);
  }

  // userMessage가 있으면 우선 사용, 없으면 message 사용
  // 백엔드가 error 필드로 응답하는 경우도 처리
  const errorMessage = error.userMessage || error.message || extractErrorMessage(result as FastApiErrorResponse | ApiResponse<unknown>);
  return new Error(errorMessage || '모집 공고 등록에 실패했습니다.');
};

