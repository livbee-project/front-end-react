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
import { isSuccessResponse, extractData, extractErrorMessage } from '@/shared/utils/apiResponseHandler';

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

    const result = await response.json();

    if (!response.ok || !isSuccessResponse(result)) {
      const errorMessage = extractErrorMessage(result);
      throw new Error(errorMessage || `API 요청 실패: ${response.status} ${response.statusText}`);
    }

    // FastAPI 응답 형식: { ok: true, data: {...} } 또는 { success: true, data: {...} }
    const data = extractData<CampaignListResponse>(result);
    if (data) {
      return data;
    }

    // 기존 응답 형식: { ok: true, items: [...], ... }
    return result as CampaignListResponse;
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

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok || !isSuccessResponse(result)) {
      const error = result as CampaignApiErrorResponse;
      
      // 유효성 검사 실패 시 상세 에러 메시지 처리
      if (error.errors && Array.isArray(error.errors)) {
        const errorMessages = error.errors.map((err) => err.msg).join(', ');
        throw new Error(errorMessages);
      }

      const errorMessage = extractErrorMessage(result);
      throw new Error(errorMessage || '모집 공고 등록에 실패했습니다.');
    }

    const data = extractData<CreateCampaignResponse>(result);
    if (data) {
      return data;
    }

    return result as CreateCampaignResponse;
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
    const headers = getAuthHeaders();

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal,
    });

    const result = await response.json();

    if (!response.ok || !isSuccessResponse(result)) {
      const errorMessage = extractErrorMessage(result);
      throw new Error(errorMessage || '모집 공고 상세 조회에 실패했습니다.');
    }

    // FastAPI 응답 형식: { ok: true, data: {...} } 또는 { success: true, data: {...} }
    const data = extractData<CampaignDetailResponse>(result);
    const responseData = data || (result as CampaignDetailResponse);

    // API 응답을 프론트엔드 타입으로 변환
    const responseDataObj = (responseData as any).data || responseData;
    const campaignDetail: CampaignDetail = {
      id: responseDataObj.id || responseDataObj._id || id,
      brandName: responseDataObj.brandName,
      prefix: this.mapPrefixToKorean(responseDataObj.prefix),
      prefixName: responseDataObj.prefixName,
      title: responseDataObj.title,
      content: responseDataObj.content,
      detailedContent: responseDataObj.detailedContent,
      category: this.mapCategoryToKorean(responseDataObj.category),
      categoryName: responseDataObj.categoryName,
      location: responseDataObj.location,
      shootDate: responseDataObj.shootDate,
      closeAt: responseDataObj.closeAt,
      durationHours: responseDataObj.durationHours,
      startTime: responseDataObj.startTime,
      endTime: responseDataObj.endTime,
      fee: responseDataObj.fee,
      feeNegotiable: responseDataObj.feeNegotiable,
      coverImageUrl: responseDataObj.coverImageUrl,
      imageUrl: responseDataObj.imageUrl,
      thumbnailUrl: responseDataObj.thumbnailUrl,
      liveVerticalCoverUrl: responseDataObj.liveVerticalCoverUrl,
      liveStreamUrl: responseDataObj.liveStreamUrl,
      productThumbnailUrl: responseDataObj.productThumbnailUrl,
      productImageUrl: responseDataObj.productImageUrl,
      productName: responseDataObj.productName,
      productUrl: responseDataObj.productUrl,
      brandIntroduction: responseDataObj.brandIntroduction,
      recruitmentSection: responseDataObj.recruitmentSection,
      qualifications: responseDataObj.qualifications,
      preferredQualifications: responseDataObj.preferredQualifications,
      isPublic: responseDataObj.isPublic,
      createdAt: responseDataObj.createdAt,
      updatedAt: responseDataObj.updatedAt,
      createdBy: responseDataObj.createdBy,
      metrics: responseDataObj.metrics,
      isApplied: responseDataObj.isApplied,
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

