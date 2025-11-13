import type {
  PortfolioListResponse,
  PortfolioListQuery,
  PortfolioDetailResponse,
  PortfolioDetail,
  PortfolioApiErrorResponse,
} from '@/domain/entities/Portfolio';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';

/**
 * 포트폴리오 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class PortfolioApiSource {
  /**
   * 포트폴리오 목록 조회
   */
  async getPortfolioList(query: PortfolioListQuery = {}): Promise<PortfolioListResponse> {
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
   * @returns 상세 정보
   * @throws {Error} 조회 실패 시
   */
  async getPortfolioById(id: string): Promise<PortfolioDetail> {
    const url = buildApiUrl(`/portfolios/${id}`);
    const headers = getAuthHeaders();

    const response = await fetch(url, {
      method: 'GET',
      headers,
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
}

