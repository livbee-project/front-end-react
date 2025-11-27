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
import { transformPortfolioDetailResponse } from './utils/portfolioResponseTransformer';
import { handleShowhostEntityError } from './utils/showhostEntityErrorHandler';

/**
 * 포트폴리오 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class PortfolioApiSource {
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
    try {
      return await fetchApi<CreatePortfolioResponse>(
        url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(request),
        },
        '포트폴리오 등록'
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw handleShowhostEntityError({ status: error.status }, error.payload, '포트폴리오 등록에 실패했습니다.');
      }
      throw error;
    }
  }
}

