import type {
  CampaignListResponse,
  CampaignListQuery,
  CreateCampaignRequest,
  CreateCampaignResponse,
  CampaignDetail,
  CampaignApplyRequest,
  CampaignApplyResponse,
  ApplicationActionRequest,
  ApplicationActionResponse,
} from '@/domain/entities/Campaign';
import type { ICampaignApiSource } from '@/data/sources/interfaces/ICampaignApiSource';
import { CampaignApiSource } from '@/data/sources/CampaignApiSource';
import { error as logError } from '@/shared/utils/logger';

/**
 * 캠페인 리포지토리
 * 도메인 로직과 데이터 소스 사이의 인터페이스 역할
 */
export class CampaignRepository {
  private apiSource: ICampaignApiSource;

  constructor(apiSource?: ICampaignApiSource) {
    // 의존성 주입: apiSource가 제공되지 않으면 기본 구현 사용
    this.apiSource = apiSource ?? new CampaignApiSource();
  }

  /**
   * 모집 공고 목록 조회
   */
  async getCampaignList(query: CampaignListQuery = {}, signal?: AbortSignal): Promise<CampaignListResponse> {
    try {
      return await this.apiSource.getCampaignList(query, signal);
    } catch (error) {
      logError('CampaignRepository', '캠페인 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 모집 공고 등록
   */
  async createCampaign(request: CreateCampaignRequest): Promise<CreateCampaignResponse> {
    try {
      return await this.apiSource.createCampaign(request);
    } catch (error) {
      logError('CampaignRepository', '캠페인 등록 실패:', error);
      throw error;
    }
  }

  /**
   * 모집 공고 상세 조회
   */
  async getCampaignById(id: string, signal?: AbortSignal): Promise<CampaignDetail> {
    try {
      return await this.apiSource.getCampaignById(id, signal);
    } catch (error) {
      logError('CampaignRepository', '캠페인 상세 조회 실패:', error);
      throw error;
    }
  }

  async applyToCampaign(request: CampaignApplyRequest): Promise<CampaignApplyResponse> {
    try {
      return await this.apiSource.applyToCampaign(request);
    } catch (error) {
      logError('CampaignRepository', '캠페인 지원 실패:', error);
      throw error;
    }
  }

  async updateApplicationStatus(request: ApplicationActionRequest): Promise<ApplicationActionResponse> {
    try {
      return await this.apiSource.updateApplicationStatus(request);
    } catch (error) {
      logError('CampaignRepository', '지원서 상태 업데이트 실패:', error);
      throw error;
    }
  }
}

