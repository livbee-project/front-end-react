import type {
  ModelListResponse,
  ModelListQuery,
  ModelDetail,
  ModelDetailResponse,
  CreateModelRequest,
  CreateModelResponse,
} from '@/domain/entities/Model';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { ApiError, fetchApi } from '@/shared/utils/apiClient';
import { transformModelDetailResponse } from '@/data/mappers/ModelMapper';
import { handleShowhostEntityError } from '@/data/errorHandlers/showhostEntityErrorHandler';

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

    const result = await fetchApi<ModelListResponse>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '모델 목록 조회'
    );

    // 응답 형식 정규화
    if (result && typeof result === 'object' && 'items' in result) {
      return {
        ok: true,
        items: result.items || [],
        currentPage: result.currentPage || 1,
        totalPages: result.totalPages || 1,
        totalItems: result.totalItems || 0,
      };
    }

    return result;
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
    const result = await fetchApi<ModelDetailResponse['data']>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '모델 상세 조회'
    );

    return transformModelDetailResponse({ ok: true, data: result }, id);
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
    try {
      return await fetchApi<CreateModelResponse>(
        url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(request),
        },
        '모델 등록'
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw handleShowhostEntityError({ status: error.status }, error.payload, '모델 등록에 실패했습니다.');
      }
      throw error;
    }
  }
}

