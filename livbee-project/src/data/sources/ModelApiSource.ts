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
import { transformModelDetailResponse, transformModelListResponse } from '@/data/mappers/ModelMapper';
import { handleShowhostEntityError } from '@/data/errorHandlers/showhostEntityErrorHandler';

import type { IModelApiSource } from '@/data/sources/interfaces/IModelApiSource';

/**
 * 모델 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class ModelApiSource implements IModelApiSource {
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

    const response = await fetchApi<unknown>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '모델 목록 조회'
    );

    return transformModelListResponse(response);
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
      const result = await fetchApi<{ message?: string; data?: CreateModelResponse['data'] }>(
        url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(request),
        },
        '모델 등록'
      );
      
      // fetchApi가 성공 응답을 받으면 extractData를 통해 data만 반환하거나 전체 응답을 반환할 수 있음
      // 201 Created 응답이므로 성공으로 간주하고 ok: true를 명시적으로 추가
      
      // data만 반환된 경우 (extractData가 data 필드를 추출한 경우)
      if (result && typeof result === 'object' && '_id' in result && !('ok' in result)) {
        // result가 CreateModelResponse['data'] 형식인지 확인
        if ('_id' in result && typeof (result as { _id: unknown })._id === 'string') {
          return {
            ok: true,
            data: result as unknown as CreateModelResponse['data'],
          };
        }
      }
      
      // 전체 응답이 반환된 경우 ({ message, data } 형식)
      if (result && typeof result === 'object' && 'data' in result) {
        const responseData = (result as { data: unknown }).data;
        if (responseData && typeof responseData === 'object' && '_id' in responseData) {
          return {
            ok: true,
            message: 'message' in result && typeof (result as { message: unknown }).message === 'string' 
              ? (result as { message: string }).message 
              : undefined,
            data: responseData as unknown as CreateModelResponse['data'],
          };
        }
      }
      
      // data 필드가 없는 경우 (기존 응답 형식)
      // 201 응답이므로 성공으로 간주
      // result가 CreateModelResponse['data'] 형식인지 확인
      if (result && typeof result === 'object' && '_id' in result) {
        return {
          ok: true,
          data: result as unknown as CreateModelResponse['data'],
        };
      }
      
      // 예상치 못한 형식인 경우 기본값 반환
      throw new Error('예상치 못한 응답 형식입니다.');
    } catch (error) {
      if (error instanceof ApiError) {
        throw handleShowhostEntityError({ status: error.status }, error.payload, '모델 등록에 실패했습니다.');
      }
      throw error;
    }
  }
}

