import type {
  ModelListResponse,
  ModelListQuery,
  ModelDetail,
  CreateModelRequest,
  CreateModelResponse,
} from '@/domain/entities/Model';
import type { IModelApiSource } from '@/data/sources/interfaces/IModelApiSource';
import { ModelApiSource } from '@/data/sources/ModelApiSource';
import { error as logError } from '@/shared/utils/logger';

/**
 * 모델 리포지토리
 * 도메인 로직과 데이터 소스 사이의 인터페이스 역할
 */
export class ModelRepository {
  private apiSource: IModelApiSource;

  constructor(apiSource?: IModelApiSource) {
    // 의존성 주입: apiSource가 제공되지 않으면 기본 구현 사용
    this.apiSource = apiSource ?? new ModelApiSource();
  }

  /**
   * 모델 목록 조회
   */
  async getModelList(query: ModelListQuery = {}, signal?: AbortSignal): Promise<ModelListResponse> {
    try {
      return await this.apiSource.getModelList(query, signal);
    } catch (error) {
      logError('ModelRepository', '모델 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 모델 상세 조회
   */
  async getModelById(id: string, signal?: AbortSignal): Promise<ModelDetail> {
    try {
      return await this.apiSource.getModelById(id, signal);
    } catch (error) {
      logError('ModelRepository', '모델 상세 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 모델 등록
   */
  async createModel(request: CreateModelRequest): Promise<CreateModelResponse> {
    try {
      return await this.apiSource.createModel(request);
    } catch (error) {
      logError('ModelRepository', '모델 등록 실패:', error);
      throw error;
    }
  }
}

