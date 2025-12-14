import type {
  PortfolioListResponse,
  PortfolioListQuery,
  PortfolioDetail,
  PortfolioDetailResponse,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
} from '@/domain/entities/Portfolio';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { ApiError, fetchApi } from '@/shared/utils/apiClient';
import { transformPortfolioDetailResponse } from '@/data/mappers/PortfolioMapper';
import { handleShowhostEntityError } from '@/data/errorHandlers/showhostEntityErrorHandler';
import { removeUndefinedFields } from '@/shared/utils/objectUtils';
import { logApiRequest, logApiError } from '@/shared/utils/apiRequestLogger';

import type { IPortfolioApiSource } from '@/data/sources/interfaces/IPortfolioApiSource';

/**
 * 포트폴리오 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class PortfolioApiSource implements IPortfolioApiSource {
  /**
   * 포트폴리오 목록 조회
   */
  async getPortfolioList(query: PortfolioListQuery = {}, signal?: AbortSignal): Promise<PortfolioListResponse> {
    // 쿼리 파라미터 구성
    const params: Record<string, string | number | undefined> = {};
    
    if (query.page !== undefined) {
      params.page = query.page;
    }
    if (query.limit !== undefined) {
      params.limit = query.limit;
    }

    const url = buildApiUrl('/portfolios', params);
    const headers = getAuthHeaders();

    return fetchApi<PortfolioListResponse>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '포트폴리오 목록 조회'
    );
  }

  /**
   * 포트폴리오 상세 조회
   * @param id - 조회할 포트폴리오의 ID
   * @param signal - 요청 취소를 위한 AbortSignal (선택)
   * @returns 상세 정보
   * @throws {Error} 조회 실패 시
   */
  async getPortfolioById(id: string, signal?: AbortSignal): Promise<PortfolioDetail> {
    const url = buildApiUrl(`/portfolios/${id}`);
    const headers = getAuthHeaders();
    const result = await fetchApi<PortfolioDetailResponse['data']>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '포트폴리오 상세 조회'
    );

    return transformPortfolioDetailResponse({ ok: true, data: result }, id);
  }

  /**
   * 포트폴리오 등록
   * @param request - 등록 요청 데이터
   * @returns 등록 응답
   * @throws {Error} 등록 실패 시
   */
  async createPortfolio(request: CreatePortfolioRequest): Promise<CreatePortfolioResponse> {
    const url = buildApiUrl('/portfolios');
    const headers = getAuthHeaders();
    
    // undefined 필드 제거 (공통 유틸리티 사용)
    const cleanedRequest = removeUndefinedFields(request) as CreatePortfolioRequest;
    
    const requestBody = JSON.stringify(cleanedRequest, null, 2);
    
    // API 요청 로깅 (개발 환경에서만)
    logApiRequest({
      url,
      method: 'POST',
      headers,
      body: requestBody,
      context: '포트폴리오 등록',
    });
    
    try {
      const result = await fetchApi<{ message?: string; data?: CreatePortfolioResponse['data'] }>(
        url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(cleanedRequest),
        },
        '포트폴리오 등록'
      );
      
      // fetchApi가 성공 응답을 받으면 extractData를 통해 data만 반환하거나 전체 응답을 반환할 수 있음
      // 201 Created 응답이므로 성공으로 간주하고 ok: true를 명시적으로 추가
      
      // data만 반환된 경우 (extractData가 data 필드를 추출한 경우)
      if (result && typeof result === 'object' && 'id' in result && !('ok' in result)) {
        // result가 CreatePortfolioResponse['data'] 형식인지 확인
        if ('id' in result && typeof (result as { id: unknown }).id === 'string') {
          return {
            ok: true,
            data: result as CreatePortfolioResponse['data'],
          };
        }
      }
      
      // 전체 응답이 반환된 경우 ({ message, data } 형식)
      if (result && typeof result === 'object' && 'data' in result) {
        const responseData = (result as { data: unknown }).data;
        if (responseData && typeof responseData === 'object' && 'id' in responseData) {
          return {
            ok: true,
            message: 'message' in result && typeof (result as { message: unknown }).message === 'string' 
              ? (result as { message: string }).message 
              : undefined,
            data: responseData as CreatePortfolioResponse['data'],
          };
        }
      }
      
      // data 필드가 없는 경우 (기존 응답 형식)
      // 201 응답이므로 성공으로 간주
      // result가 CreatePortfolioResponse['data'] 형식인지 확인
      if (result && typeof result === 'object' && 'id' in result) {
        return {
          ok: true,
          data: result as CreatePortfolioResponse['data'],
        };
      }
      
      // 예상치 못한 형식인 경우 기본값 반환
      throw new ApiError('포트폴리오 등록 응답 형식이 올바르지 않습니다.', 500, result);
    } catch (error) {
      if (error instanceof ApiError) {
        // API 에러 로깅 (개발 환경에서만)
        logApiError({
          url,
          method: 'POST',
          status: error.status,
          errorMessage: error.message,
          requestBody,
          errorPayload: error.payload,
          context: '포트폴리오 등록',
        });
        
        throw handleShowhostEntityError({ status: error.status }, error.payload, '포트폴리오 등록에 실패했습니다.');
      }
      
      // ApiError가 아닌 경우
      logApiError({
        url,
        method: 'POST',
        errorMessage: error instanceof Error ? error.message : String(error),
        requestBody,
        context: '포트폴리오 등록 (예상치 못한 에러)',
      });
      
      throw error;
    }
  }
}

