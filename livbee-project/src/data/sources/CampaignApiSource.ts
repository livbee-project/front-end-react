import type {
  CampaignListResponse,
  CampaignListQuery,
  CreateCampaignRequest,
  CreateCampaignResponse,
  CampaignDetail,
  CampaignApplyRequest,
  CampaignApplyResponse,
  ApplicationActionRequest,
  ApplicationActionResponse,
  CampaignDetailResponse,
} from '@/domain/entities/Campaign';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { ApiError, fetchApi } from '@/shared/utils/apiClient';
import { extractErrorMessage, isSuccessResponse, type ApiResponse } from '@/shared/utils/apiResponseHandler';
import { debug } from '@/shared/utils/logger';
import { normalizeCampaignApplyResponse, normalizeApplicationActionResponse } from '@/shared/utils/apiNormalizer';
import { transformCampaignDetailResponse } from '@/data/mappers/CampaignMapper';
import { convertKeysToCamelCase } from '@/shared/utils/caseConverter';
import { logApiRequest } from '@/shared/utils/apiRequestLogger';
import { isObject } from '@/shared/utils/typeGuards';

import type { ICampaignApiSource } from '@/data/sources/interfaces/ICampaignApiSource';

/**
 * 캠페인 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class CampaignApiSource implements ICampaignApiSource {
  /**
   * 모집 공고 목록 조회
   */
  async getCampaignList(query: CampaignListQuery = {}, signal?: AbortSignal): Promise<CampaignListResponse> {
    // 쿼리 파라미터 구성
    const params: Record<string, string | number | undefined> = {};
    
    if (query.page !== undefined) {
      params.page = query.page;
    }
    if (query.limit !== undefined) {
      params.limit = query.limit;
    }
    if (query.search) {
      params.search = query.search;
    }
    if (query.sort === 'deadline') {
      // deadline: 마감일순, latest 또는 기타: 최신순 (백엔드 기본값)
      params.sort = 'deadline';
    }
    // latest인 경우 파라미터를 보내지 않아 백엔드 기본값(최신순) 사용

    const url = buildApiUrl('/campaigns', params);
    
    // TODO: 인증 토큰이 필요한 경우 getAuthHeaders(token) 사용
    const headers = getAuthHeaders();
    
    const result = await fetchApi<CampaignListResponse>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '캠페인 목록 조회'
    );

    // 백엔드가 snake_case로 응답하는 경우 items 배열의 각 항목을 camelCase로 변환
    if (result.items && Array.isArray(result.items)) {
      const convertedItems = result.items.map((item) => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          return convertKeysToCamelCase(item as unknown as Record<string, unknown>);
        }
        return item;
      }) as CampaignListResponse['items'];
      
      return {
        ...result,
        items: convertedItems,
      };
    }

    return result;
  }

  /**
   * 모집 공고 등록
   * @param request - 등록 요청 데이터
   * @returns 등록 응답
   * @throws {Error} 등록 실패 시
   */
  async createCampaign(request: CreateCampaignRequest): Promise<CreateCampaignResponse> {
    const url = buildApiUrl('/campaigns');
    const headers = getAuthHeaders();

    const requestBody = JSON.stringify(request);
    
    // API 요청 로깅 (개발 환경에서만)
    logApiRequest({
      url,
      method: 'POST',
      headers,
      body: requestBody,
      context: '모집 공고 등록',
    });

    const result = await fetchApi<ApiResponse<CreateCampaignResponse['data']>>(
      url,
      {
        method: 'POST',
        headers,
        body: requestBody,
      },
      '모집 공고 등록'
    );

    // fetchApi가 성공 응답을 받으면 extractData를 통해 data만 반환하거나 전체 응답을 반환할 수 있음
    // 201 Created 응답이므로 성공으로 간주하고 ok: true를 명시적으로 추가
    
    // data만 반환된 경우 (extractData가 data 필드를 추출한 경우)
    if (result && typeof result === 'object' && 'id' in result && !('ok' in result)) {
      const convertedData = convertKeysToCamelCase(result as Record<string, unknown>);
      return {
        ok: true,
        data: convertedData as CreateCampaignResponse['data'],
      };
    }

    // 전체 응답이 반환된 경우
    // result가 CreateCampaignResponse 형식인지 확인
    if (isObject(result) && 'data' in result && result.data) {
      const convertedData = convertKeysToCamelCase(result.data as Record<string, unknown>);
      return {
        ok: true, // 201 응답이므로 명시적으로 ok: true 설정
        data: convertedData as CreateCampaignResponse['data'],
      };
    }

    // data 필드가 없는 경우 (기존 응답 형식)
    // 201 응답이므로 성공으로 간주
    return {
      ok: true,
      data: convertKeysToCamelCase(result as Record<string, unknown>) as CreateCampaignResponse['data'],
    };
  }

  /**
   * 모집 공고 상세 조회
   * @param id - 조회할 모집 공고의 ID
   * @param signal - 요청 취소를 위한 AbortSignal (선택)
   * @returns 상세 정보
   * @throws {Error} 조회 실패 시
   */
  async getCampaignById(id: string, signal?: AbortSignal): Promise<CampaignDetail> {
    const url = buildApiUrl(`/campaigns/${id}`);

    const result = await fetchApi<CampaignDetailResponse['data']>(
      url,
      {
        method: 'GET',
        headers: getAuthHeaders(),
        signal,
      },
      '모집 공고 상세 조회'
    );

    return transformCampaignDetailResponse(result, id);
  }


  /**
   * 캠페인 지원
   */
  async applyToCampaign(request: CampaignApplyRequest): Promise<CampaignApplyResponse> {
    const url = buildApiUrl('/applications');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
    });

    const result = await response.json();

    // 디버깅: 원본 응답 로그
    debug('CampaignApiSource', 'applyCampaign 원본 응답:', result);

    if (!response.ok || !isSuccessResponse(result)) {
      const errorMessage = extractErrorMessage(result);
      throw new Error(errorMessage || '캠페인 지원에 실패했습니다.');
    }

    const normalizedData = normalizeCampaignApplyResponse(result);
    debug('CampaignApiSource', 'applyCampaign 정규화된 응답:', normalizedData);
    return normalizedData;
  }

  /**
   * 지원서 수락/거절
   */
  async updateApplicationStatus(request: ApplicationActionRequest): Promise<ApplicationActionResponse> {
    const url = buildApiUrl(`/applications/${request.applicationId}/${request.action}`);

    try {
      const result = await fetchApi<ApplicationActionResponse>(
        url,
        {
          method: 'POST',
          headers: getAuthHeaders(),
        },
        '지원서 상태 업데이트'
      );

      return normalizeApplicationActionResponse(result, request.applicationId, request.action);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        throw new Error('지원서 수락/거절 API 엔드포인트를 찾을 수 없습니다. 백엔드 배포 상태를 확인해주세요.');
      }
      throw error;
    }
  }
}

