import type {
  CampaignListResponse,
  CampaignListQuery,
  CreateCampaignRequest,
  CreateCampaignResponse,
  CampaignApiErrorResponse,
} from '@/domain/entities/Campaign';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { getToken } from '@/shared/utils/storage';

/**
 * 캠페인 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class CampaignApiSource {
  /**
   * 모집 공고 목록 조회
   */
  async getCampaignList(query: CampaignListQuery = {}): Promise<CampaignListResponse> {
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
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * 모집 공고 등록
   * @param request - 등록 요청 데이터
   * @returns 등록 응답
   * @throws {Error} 등록 실패 시
   */
  async createCampaign(request: CreateCampaignRequest): Promise<CreateCampaignResponse> {
    const token = getToken();
    if (!token) {
      throw new Error('인증 토큰이 없습니다.');
    }

    const url = buildApiUrl('/campaigns');
    const headers = getAuthHeaders(token);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    const data: CreateCampaignResponse | CampaignApiErrorResponse = await response.json();

    if (!data.ok) {
      const error = data as CampaignApiErrorResponse;
      
      // 유효성 검사 실패 시 상세 에러 메시지 처리
      if (error.errors && Array.isArray(error.errors)) {
        const errorMessages = error.errors.map((err) => err.msg).join(', ');
        throw new Error(errorMessages);
      }

      throw new Error(error.userMessage || error.message || '모집 공고 등록에 실패했습니다.');
    }

    return data as CreateCampaignResponse;
  }

  /**
   * 모집 공고 상세 조회 (향후 구현 예정)
   */
  async getCampaignById(_id: string): Promise<any> {
    // TODO: 상세 조회 API 구현 시 추가
    throw new Error('Not implemented yet');
  }
}

