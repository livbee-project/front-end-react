import type { CampaignListResponse, CampaignListQuery } from '@/domain/entities/Campaign';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';

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
   * 모집 공고 상세 조회 (향후 구현 예정)
   */
  async getCampaignById(id: string): Promise<any> {
    // TODO: 상세 조회 API 구현 시 추가
    throw new Error('Not implemented yet');
  }
}

