import type {
  CampaignListResponse,
  CampaignListQuery,
  CreateCampaignRequest,
  CreateCampaignResponse,
  CampaignDetail,
  CampaignApplyRequest,
  CampaignApplyResponse,
} from '@/domain/entities/Campaign';
import { CampaignApiSource } from '@/data/sources/CampaignApiSource';

/**
 * 캠페인 리포지토리
 * 도메인 로직과 데이터 소스 사이의 인터페이스 역할
 */
export class CampaignRepository {
  private apiSource: CampaignApiSource;

  constructor() {
    this.apiSource = new CampaignApiSource();
  }

  /**
   * 모집 공고 목록 조회
   */
  async getCampaignList(query: CampaignListQuery = {}, signal?: AbortSignal): Promise<CampaignListResponse> {
    try {
      return await this.apiSource.getCampaignList(query, signal);
    } catch (error) {
      console.error('캠페인 목록 조회 실패:', error);
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
      console.error('캠페인 등록 실패:', error);
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
      console.error('캠페인 상세 조회 실패:', error);
      throw error;
    }
  }

  async applyToCampaign(request: CampaignApplyRequest): Promise<CampaignApplyResponse> {
    try {
      return await this.apiSource.applyToCampaign(request);
    } catch (error) {
      console.error('캠페인 지원 실패:', error);
      throw error;
    }
  }
}

