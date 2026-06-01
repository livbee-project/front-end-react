import type {
  ModelListResponse,
  ModelListQuery,
  ModelDetail,
  CreateModelRequest,
  CreateModelResponse,
} from '@/domain/entities/Model';

/**
 * 모델 API 소스 인터페이스
 */
export interface IModelApiSource {
  getModelList(query?: ModelListQuery, signal?: AbortSignal): Promise<ModelListResponse>;
  getModelById(id: string, signal?: AbortSignal): Promise<ModelDetail>;
  createModel(request: CreateModelRequest): Promise<CreateModelResponse>;
}

