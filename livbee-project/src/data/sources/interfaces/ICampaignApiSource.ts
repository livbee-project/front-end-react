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

/**
 * 캠페인 API 소스 인터페이스
 */
export interface ICampaignApiSource {
  /**
   * 전체 모집 공고 목록 조회
   */
  getCampaignList(query?: CampaignListQuery, signal?: AbortSignal): Promise<CampaignListResponse>;

  /**
   * 내 브랜드가 등록한 모집 공고 목록 조회
   */
  getMyCampaignList?(query?: CampaignListQuery, signal?: AbortSignal): Promise<CampaignListResponse>;

  createCampaign(request: CreateCampaignRequest): Promise<CreateCampaignResponse>;
  getCampaignById(id: string, signal?: AbortSignal): Promise<CampaignDetail>;
  applyToCampaign(request: CampaignApplyRequest): Promise<CampaignApplyResponse>;
  updateApplicationStatus(request: ApplicationActionRequest): Promise<ApplicationActionResponse>;
}

