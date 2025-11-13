import type {
  CampaignListResponse,
  CampaignListQuery,
  CreateCampaignRequest,
  CreateCampaignResponse,
  CampaignApiErrorResponse,
  CampaignDetailResponse,
  CampaignDetail,
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
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal,
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
   * 모집 공고 상세 조회
   * @param id - 조회할 모집 공고의 ID
   * @param signal - 요청 취소를 위한 AbortSignal (선택)
   * @returns 상세 정보
   * @throws {Error} 조회 실패 시
   */
  async getCampaignById(id: string, signal?: AbortSignal): Promise<CampaignDetail> {
    const token = getToken();
    const url = buildApiUrl(`/campaigns/${id}`);
    const headers = getAuthHeaders(token || undefined);

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal,
    });

    const data: CampaignDetailResponse | CampaignApiErrorResponse = await response.json();

    if (!data.ok) {
      const error = data as CampaignApiErrorResponse;
      throw new Error(error.userMessage || error.message || '모집 공고 상세 조회에 실패했습니다.');
    }

    const responseData = (data as CampaignDetailResponse).data;

    // API 응답을 프론트엔드 타입으로 변환
    const campaignDetail: CampaignDetail = {
      id: responseData.id,
      brandName: responseData.brandName,
      prefix: this.mapPrefixToKorean(responseData.prefix),
      prefixName: responseData.prefixName,
      title: responseData.title,
      content: responseData.content,
      detailedContent: responseData.detailedContent,
      category: this.mapCategoryToKorean(responseData.category),
      categoryName: responseData.categoryName,
      location: responseData.location,
      shootDate: responseData.shootDate,
      closeAt: responseData.closeAt,
      durationHours: responseData.durationHours,
      startTime: responseData.startTime,
      endTime: responseData.endTime,
      fee: responseData.fee,
      feeNegotiable: responseData.feeNegotiable,
      coverImageUrl: responseData.coverImageUrl,
      imageUrl: responseData.imageUrl,
      thumbnailUrl: responseData.thumbnailUrl,
      liveVerticalCoverUrl: responseData.liveVerticalCoverUrl,
      liveStreamUrl: responseData.liveStreamUrl,
      productThumbnailUrl: responseData.productThumbnailUrl,
      productImageUrl: responseData.productImageUrl,
      productName: responseData.productName,
      productUrl: responseData.productUrl,
      brandIntroduction: responseData.brandIntroduction,
      recruitmentSection: responseData.recruitmentSection,
      qualifications: responseData.qualifications,
      preferredQualifications: responseData.preferredQualifications,
      isPublic: responseData.isPublic,
      createdAt: responseData.createdAt,
      updatedAt: responseData.updatedAt,
      createdBy: responseData.createdBy,
      metrics: responseData.metrics,
      isApplied: responseData.isApplied,
    };

    return campaignDetail;
  }

  /**
   * 모집구분 영문 코드를 한글명으로 변환
   */
  private mapPrefixToKorean(
    prefix: 'showhost' | 'staff' | 'model' | 'other' | null
  ): '쇼호스트모집' | '촬영스태프' | '모델모집' | '기타모집' | null {
    const prefixMap: Record<string, '쇼호스트모집' | '촬영스태프' | '모델모집' | '기타모집'> = {
      showhost: '쇼호스트모집',
      staff: '촬영스태프',
      model: '모델모집',
      other: '기타모집',
    };
    return prefix ? prefixMap[prefix] || null : null;
  }

  /**
   * 카테고리 영문 코드를 한글명으로 변환
   */
  private mapCategoryToKorean(
    category: 'beauty' | 'fashion' | 'food' | 'electronics' | 'lifestyle' | null
  ): '뷰티' | '패션' | '식품' | '가전' | '생활/리빙' | null {
    const categoryMap: Record<string, '뷰티' | '패션' | '식품' | '가전' | '생활/리빙'> = {
      beauty: '뷰티',
      fashion: '패션',
      food: '식품',
      electronics: '가전',
      lifestyle: '생활/리빙',
    };
    return category ? categoryMap[category] || null : null;
  }
}

