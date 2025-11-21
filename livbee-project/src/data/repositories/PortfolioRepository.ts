import type {
  PortfolioListResponse,
  PortfolioListQuery,
  PortfolioDetail,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
} from '@/domain/entities/Portfolio';
import { PortfolioApiSource } from '@/data/sources/PortfolioApiSource';

/**
 * 포트폴리오 리포지토리
 * 도메인 로직과 데이터 소스 사이의 인터페이스 역할
 */
export class PortfolioRepository {
  private apiSource: PortfolioApiSource;

  constructor() {
    this.apiSource = new PortfolioApiSource();
  }

  /**
   * 포트폴리오 목록 조회
   */
  async getPortfolioList(query: PortfolioListQuery = {}, signal?: AbortSignal): Promise<PortfolioListResponse> {
    try {
      return await this.apiSource.getPortfolioList(query, signal);
    } catch (error) {
      console.error('포트폴리오 목록 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 포트폴리오 상세 조회
   */
  async getPortfolioById(id: string, signal?: AbortSignal): Promise<PortfolioDetail> {
    try {
      return await this.apiSource.getPortfolioById(id, signal);
    } catch (error) {
      console.error('포트폴리오 상세 조회 실패:', error);
      throw error;
    }
  }

  /**
   * 포트폴리오 등록
   */
  async createPortfolio(request: CreatePortfolioRequest): Promise<CreatePortfolioResponse> {
    try {
      return await this.apiSource.createPortfolio(request);
    } catch (error) {
      console.error('포트폴리오 등록 실패:', error);
      throw error;
    }
  }
}

