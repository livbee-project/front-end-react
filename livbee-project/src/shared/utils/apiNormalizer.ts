/**
 * API 응답 정규화 유틸리티
 * snake_case와 camelCase 간 변환, 중첩된 응답 구조 처리
 */

import type { SnakeCaseResponse, NestedDataResponse } from '@/shared/types/api';
import { extractData, type ApiResponse } from '@/shared/utils/apiResponseHandler';

/**
 * ApplicationActionResponse 정규화
 * ApplicationActionResponse와 동일한 타입을 사용
 */
import type { ApplicationActionResponse } from '@/domain/entities/Campaign';

/**
 * CampaignApplyResponse 정규화
 */
export interface NormalizedCampaignApplyResponse {
  applicationId: string;
  chatRoomId: string;
}

/**
 * ApplicationActionResponse를 정규화합니다.
 */
export const normalizeApplicationActionResponse = (
  result: unknown,
  fallbackApplicationId: string,
  fallbackAction: 'accept' | 'reject'
): ApplicationActionResponse => {
  const response = result as ApiResponse<ApplicationActionResponse | SnakeCaseResponse>;
  const data = extractData<ApplicationActionResponse | SnakeCaseResponse>(response);
  
  if (data) {
    const snakeCaseData = data as SnakeCaseResponse;
    const camelCaseData = data as ApplicationActionResponse;
    const paymentRequest =
      (camelCaseData.paymentRequest ??
        snakeCaseData.payment_request) as ApplicationActionResponse['paymentRequest'];
    
    return {
      applicationId: camelCaseData.applicationId || fallbackApplicationId,
      status: camelCaseData.status || (fallbackAction === 'accept' ? 'accepted' : 'rejected'),
      paymentRequest,
    };
  }

  // 폴백: 원본 결과에서 필드 추출
  const fallbackResult = result as NestedDataResponse<ApplicationActionResponse | SnakeCaseResponse> & 
    ApplicationActionResponse & 
    SnakeCaseResponse;
  
  const nestedData = (fallbackResult.data && typeof fallbackResult.data === 'object') 
    ? (fallbackResult.data as ApplicationActionResponse | SnakeCaseResponse)
    : null;

  const fallbackPaymentRequest =
    (nestedData && 'paymentRequest' in nestedData
      ? (nestedData as ApplicationActionResponse).paymentRequest
      : nestedData && 'payment_request' in nestedData
        ? (nestedData as SnakeCaseResponse).payment_request
        : (fallbackResult.paymentRequest ?? fallbackResult.payment_request)) as ApplicationActionResponse['paymentRequest'];
  
  return {
    applicationId: fallbackApplicationId,
    status: fallbackAction === 'accept' ? 'accepted' : 'rejected',
    paymentRequest: fallbackPaymentRequest,
  };
};

/**
 * CampaignApplyResponse를 정규화합니다.
 */
export const normalizeCampaignApplyResponse = (
  result: unknown
): NormalizedCampaignApplyResponse => {
  const response = result as ApiResponse<NormalizedCampaignApplyResponse | SnakeCaseResponse>;
  const data = extractData<NormalizedCampaignApplyResponse | SnakeCaseResponse>(response);
  
  if (data) {
    const snakeCaseData = data as SnakeCaseResponse;
    const camelCaseData = data as NormalizedCampaignApplyResponse;
    
    return {
      applicationId: camelCaseData.applicationId || snakeCaseData.application_id || '',
      chatRoomId: camelCaseData.chatRoomId || snakeCaseData.chat_room_id || snakeCaseData.room_id || '',
    };
  }

  // extractData가 null을 반환한 경우 원본 결과에서 필드명 정규화 시도
  const fallbackResult = result as SnakeCaseResponse & NormalizedCampaignApplyResponse;
  
  return {
    applicationId: fallbackResult.applicationId || fallbackResult.application_id || '',
    chatRoomId: fallbackResult.chatRoomId || fallbackResult.chat_room_id || fallbackResult.room_id || '',
  };
};

