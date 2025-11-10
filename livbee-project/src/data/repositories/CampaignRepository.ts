import type { Campaign, CampaignListResponse, CampaignListQuery } from '@/domain/entities/Campaign';
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
  async getCampaignList(query: CampaignListQuery = {}): Promise<CampaignListResponse> {
    try {
      return await this.apiSource.getCampaignList(query);
    } catch (error) {
      console.error('캠페인 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 모집 공고 상세 조회 (향후 구현 예정)
   */
  async getCampaignById(id: string): Promise<Campaign> {
    try {
      return await this.apiSource.getCampaignById(id);
    } catch (error) {
      console.error('캠페인 상세 조회 실패:', error);
      throw error;
    }
  }
}

