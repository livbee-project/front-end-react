import type {
  ModelListResponse,
  ModelListQuery,
  ModelDetailResponse,
  ModelDetail,
  ModelApiErrorResponse,
  CreateModelRequest,
  CreateModelResponse,
} from '@/domain/entities/Model';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { isSuccessResponse, extractData, extractErrorMessage } from '@/shared/utils/apiResponseHandler';

/**
 * 모델 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class ModelApiSource {
  /**
   * 모델 목록 조회
   */
  async getModelList(query: ModelListQuery = {}, signal?: AbortSignal): Promise<ModelListResponse> {
    // 쿼리 파라미터 구성
    const params: Record<string, string | number | undefined> = {};
    
    if (query.page !== undefined) {
      params.page = query.page;
    }
    if (query.limit !== undefined) {
      params.limit = query.limit;
    }

    const url = buildApiUrl('/models', params);
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
    const data = extractData<ModelListResponse>(result);
    if (data) {
      return data;
    }

    // 기존 응답 형식: { ok: true, items: [...], ... }
    return result as ModelListResponse;
  }

  /**
   * 모델 상세 조회
   * @param id - 조회할 모델의 ID
   * @param signal - 요청 취소를 위한 AbortSignal (선택)
   * @returns 상세 정보
   * @throws {Error} 조회 실패 시
   */
  async getModelById(id: string, signal?: AbortSignal): Promise<ModelDetail> {
    const url = buildApiUrl(`/models/${id}`);
    const headers = getAuthHeaders();

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal,
    });

    const result = await response.json();

    if (!response.ok || !isSuccessResponse(result)) {
      const errorMessage = extractErrorMessage(result);
      throw new Error(errorMessage || '모델 상세 조회에 실패했습니다.');
    }

    // FastAPI 응답 형식: { ok: true, data: {...} } 또는 { success: true, data: {...} }
    const data = extractData<ModelDetailResponse>(result);
    const responseData = (data as any)?.data || data || (result as ModelDetailResponse);

    // API 응답을 프론트엔드 타입으로 변환 (PostgreSQL은 UUID 사용하므로 _id 변환 불필요)
    const responseDataObj = (responseData as any).data || responseData;
    const modelDetail: ModelDetail = {
      id: responseDataObj.id || responseDataObj._id || id,
      user: responseDataObj.user,
      nickname: responseDataObj.nickname,
      oneLineIntro: responseDataObj.oneLineIntro,
      detailedIntro: responseDataObj.detailedIntro,
      experienceYears: responseDataObj.experienceYears,
      age: responseDataObj.age,
      isAgePublic: responseDataObj.isAgePublic,
      mainThumbnailUrl: responseDataObj.mainThumbnailUrl,
      backgroundImageUrl: responseDataObj.backgroundImageUrl,
      subThumbnailUrls: responseDataObj.subThumbnailUrls,
      status: responseDataObj.status,
      detailedRegion: responseDataObj.detailedRegion,
      gender: responseDataObj.gender,
      height: responseDataObj.height,
      weight: responseDataObj.weight,
      topSize: responseDataObj.topSize,
      bottomSize: responseDataObj.bottomSize,
      shoeSize: responseDataObj.shoeSize,
      isSizingPublic: responseDataObj.isSizingPublic,
      websiteUrl: responseDataObj.websiteUrl,
      instagramUrl: responseDataObj.instagramUrl,
      youtubeUrl: responseDataObj.youtubeUrl,
      tiktokUrl: responseDataObj.tiktokUrl,
      publicScope: responseDataObj.publicScope,
      isReceivingOffers: responseDataObj.isReceivingOffers,
      attachedFileUrl: responseDataObj.attachedFileUrl,
      createdAt: responseDataObj.createdAt,
      updatedAt: responseDataObj.updatedAt,
    };

    return modelDetail;
  }

  /**
   * 모델 등록
   * @param request - 등록 요청 데이터
   * @returns 등록 응답
   * @throws {Error} 등록 실패 시
   */
  async createModel(request: CreateModelRequest): Promise<CreateModelResponse> {
    const url = buildApiUrl('/models');
    const headers = getAuthHeaders();

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok || !isSuccessResponse(result)) {
      // 인증 오류 처리
      if (response.status === 401) {
        throw new Error('인증이 필요합니다.');
      }
      if (response.status === 403) {
        throw new Error('권한이 없습니다. 쇼호스트 역할만 등록 가능합니다.');
      }

      const errorMessage = extractErrorMessage(result);
      throw new Error(errorMessage || '모델 등록에 실패했습니다.');
    }

    const data = extractData<CreateModelResponse>(result);
    if (data) {
      return data;
    }

    return result as CreateModelResponse;
  }
}

