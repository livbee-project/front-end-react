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
import { isObject } from '@/shared/utils/typeGuards';

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
    const result = await fetchApi<ModelDetailResponse['data'] | { data: ModelDetailResponse['data'] }>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '모델 상세 조회'
    );

    // API 응답이 { data: { data: {...} } } 형태인 경우 중첩된 data 추출
    // fetchApi의 extractData가 첫 번째 data만 추출하므로, 중첩된 data가 있으면 한 번 더 추출
    let modelData: ModelDetailResponse['data'];
    if (isObject(result) && 'data' in result && isObject(result.data) && 'subThumbnailUrls' in result.data) {
      // 중첩된 data 구조: { data: { subThumbnailUrls: [...] } }
      modelData = result.data as ModelDetailResponse['data'];
    } else {
      // 일반 구조: { subThumbnailUrls: [...] }
      modelData = result as ModelDetailResponse['data'];
    }

    return transformModelDetailResponse({ ok: true, data: modelData }, id);
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
      console.log('[ModelApiSource] 📤 모델 등록 요청:', {
        url,
        method: 'POST',
        headers: Object.fromEntries(new Headers(headers).entries()),
        body: JSON.stringify(request),
      });
      
      const result = await fetchApi<{ message?: string; data?: CreateModelResponse['data'] }>(
        url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(request),
        },
        '모델 등록'
      );
      
      console.log('[ModelApiSource] ✅ createModel 응답 result:', result);
      
      // fetchApi가 성공 응답을 받으면 extractData를 통해 data만 반환하거나 전체 응답을 반환할 수 있음
      // 201 Created 응답이므로 성공으로 간주하고 ok: true를 명시적으로 추가
      
      // 응답 데이터를 정규화하는 헬퍼 함수 (id를 _id로 변환)
      const normalizeModelData = (data: unknown): CreateModelResponse['data'] | null => {
        if (!data || typeof data !== 'object') return null;
        const dataObj = data as Record<string, unknown>;
        // id 필드가 있으면 _id로 변환
        if ('id' in dataObj && !('_id' in dataObj)) {
          dataObj._id = dataObj.id;
        }
        // user, nickname 등 필수 필드 확인
        if (('_id' in dataObj || 'id' in dataObj) && 'user' in dataObj) {
          return dataObj as unknown as CreateModelResponse['data'];
        }
        return null;
      };
      
      // 중첩된 data 필드 처리: { data: { data: {...} } } 형식
      if (result && typeof result === 'object' && 'data' in result) {
        const responseData = (result as { data: unknown }).data;
        // 중첩된 data 필드 확인
        if (responseData && typeof responseData === 'object' && 'data' in responseData) {
          const nestedData = (responseData as { data: unknown }).data;
          const normalized = normalizeModelData(nestedData);
          if (normalized) {
            return {
              ok: true,
              message: 'message' in result && typeof (result as { message: unknown }).message === 'string' 
                ? (result as { message: string }).message 
                : undefined,
              data: normalized,
            };
          }
        }
        // 일반 data 필드 확인
        const normalized = normalizeModelData(responseData);
        if (normalized) {
          return {
            ok: true,
            message: 'message' in result && typeof (result as { message: unknown }).message === 'string' 
              ? (result as { message: string }).message 
              : undefined,
            data: normalized,
          };
        }
      }
      
      // data만 반환된 경우 (extractData가 data 필드를 추출한 경우)
      // id 또는 _id 필드 확인
      if (result && typeof result === 'object' && !('ok' in result)) {
        const normalized = normalizeModelData(result);
        if (normalized) {
          return {
            ok: true,
            data: normalized,
          };
        }
      }
      
      // 예상치 못한 형식인 경우 - 로그를 남기고 에러 발생
      console.error('[ModelApiSource] ❌ 예상치 못한 응답 형식:', result);
      throw new Error(`예상치 못한 응답 형식입니다. 응답: ${JSON.stringify(result)}`);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error('[ModelApiSource] ❌ 모델 등록 에러:', {
          status: error.status,
          message: error.message,
          payload: error.payload,
          fullError: error,
        });
        throw handleShowhostEntityError({ status: error.status }, error.payload, '모델 등록에 실패했습니다.');
      }
      console.error('[ModelApiSource] ❌ 모델 등록 예상치 못한 에러:', error);
      throw error;
    }
  }
}

