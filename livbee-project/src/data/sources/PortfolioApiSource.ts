import type {
  PortfolioListResponse,
  PortfolioListQuery,
  PortfolioDetailResponse,
  PortfolioDetail,
  PortfolioApiErrorResponse,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
} from '@/domain/entities/Portfolio';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { getToken } from '@/shared/utils/storage';

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

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal,
    });

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
    }

    const data: PortfolioListResponse = await response.json();

    // _id를 id로 변환
    if (data.items && Array.isArray(data.items)) {
      data.items = data.items.map((item: any) => {
        const { _id, ...rest } = item;
        return {
          ...rest,
          id: _id || item.id,
        };
      });
    }

    return data;
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

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal,
    });

    const data: PortfolioDetailResponse | PortfolioApiErrorResponse = await response.json();

    if (!data.ok) {
      const error = data as PortfolioApiErrorResponse;
      throw new Error(error.userMessage || error.message || '포트폴리오 상세 조회에 실패했습니다.');
    }

    const responseData = (data as PortfolioDetailResponse).data;

    // API 응답을 프론트엔드 타입으로 변환 (_id → id)
    const portfolioDetail: PortfolioDetail = {
      id: responseData._id,
      user: responseData.user,
      nickname: responseData.nickname,
      oneLineIntro: responseData.oneLineIntro,
      detailedIntro: responseData.detailedIntro,
      experienceYears: responseData.experienceYears,
      age: responseData.age,
      mainThumbnailUrl: responseData.mainThumbnailUrl,
      backgroundImageUrl: responseData.backgroundImageUrl,
      subThumbnailUrls: responseData.subThumbnailUrls,
      status: responseData.status,
      isAgePublic: responseData.isAgePublic,
      detailedRegion: responseData.detailedRegion,
      gender: responseData.gender,
      height: responseData.height,
      weight: responseData.weight,
      topSize: responseData.topSize,
      bottomSize: responseData.bottomSize,
      shoeSize: responseData.shoeSize,
      isSizingPublic: responseData.isSizingPublic,
      websiteUrl: responseData.websiteUrl,
      instagramUrl: responseData.instagramUrl,
      youtubeUrl: responseData.youtubeUrl,
      tiktokUrl: responseData.tiktokUrl,
      publicScope: responseData.publicScope,
      isReceivingOffers: responseData.isReceivingOffers,
      recentLives: responseData.recentLives,
      attachedFileUrl: responseData.attachedFileUrl,
      createdAt: responseData.createdAt,
      updatedAt: responseData.updatedAt,
    };

    return portfolioDetail;
  }

  /**
   * 포트폴리오 등록
   * @param request - 등록 요청 데이터
   * @returns 등록 응답
   * @throws {Error} 등록 실패 시
   */
  async createPortfolio(request: CreatePortfolioRequest): Promise<CreatePortfolioResponse> {
    const token = getToken();
    if (!token) {
      throw new Error('인증 토큰이 없습니다.');
    }

    const url = buildApiUrl('/portfolios');
    const headers = getAuthHeaders(token);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    const data: CreatePortfolioResponse | PortfolioApiErrorResponse = await response.json();

    if (!data.ok) {
      const error = data as PortfolioApiErrorResponse;
      
      // 인증 오류 처리
      if (response.status === 401) {
        throw new Error('인증이 필요합니다.');
      }
      if (response.status === 403) {
        throw new Error('권한이 없습니다. 쇼호스트 역할만 등록 가능합니다.');
      }

      throw new Error(error.userMessage || error.message || '포트폴리오 등록에 실패했습니다.');
    }

    return data as CreatePortfolioResponse;
  }
}

