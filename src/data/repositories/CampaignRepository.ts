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
import { BaseRepository } from '@/data/repositories/BaseRepository';

/**
 * 캠페인 리포지토리
 * 도메인 로직과 데이터 소스 사이의 인터페이스 역할
 */
export class CampaignRepository extends BaseRepository {
  private apiSource: ICampaignApiSource;

  constructor(apiSource?: ICampaignApiSource) {
    super();
    // 의존성 주입: apiSource가 제공되지 않으면 기본 구현 사용
    this.apiSource = apiSource ?? new CampaignApiSource();
  }

  /**
   * 모집 공고 목록 조회
   */
  async getCampaignList(query: CampaignListQuery = {}, signal?: AbortSignal): Promise<CampaignListResponse> {
    return this.handleError(
      () => this.apiSource.getCampaignList(query, signal),
      'CampaignRepository',
      '캠페인 목록 조회'
    );
  }

  /**
   * 내 캠페인 목록 조회 (브랜드 전용)
   */
  async getMyCampaignList(query: CampaignListQuery = {}, signal?: AbortSignal): Promise<CampaignListResponse> {
    return this.handleError(
      () => this.apiSource.getMyCampaignList?.(query, signal) as Promise<CampaignListResponse>,
      'CampaignRepository',
      '내 캠페인 목록 조회'
    );
  }

  /**
   * 모집 공고 등록
   */
  async createCampaign(request: CreateCampaignRequest): Promise<CreateCampaignResponse> {
    return this.handleError(
      () => this.apiSource.createCampaign(request),
      'CampaignRepository',
      '캠페인 등록'
    );
  }

  /**
   * 모집 공고 상세 조회
   */
  async getCampaignById(id: string, signal?: AbortSignal): Promise<CampaignDetail> {
    return this.handleError(
      () => this.apiSource.getCampaignById(id, signal),
      'CampaignRepository',
      '캠페인 상세 조회'
    );
  }

  async applyToCampaign(request: CampaignApplyRequest): Promise<CampaignApplyResponse> {
    return this.handleError(
      () => this.apiSource.applyToCampaign(request),
      'CampaignRepository',
      '캠페인 지원'
    );
  }

  async updateApplicationStatus(request: ApplicationActionRequest): Promise<ApplicationActionResponse> {
    return this.handleError(
      () => this.apiSource.updateApplicationStatus(request),
      'CampaignRepository',
      '지원서 상태 업데이트'
    );
  }
}

