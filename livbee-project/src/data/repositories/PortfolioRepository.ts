import type {
  PortfolioListResponse,
  PortfolioListQuery,
  PortfolioDetail,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
} from '@/domain/entities/Portfolio';
import type { IPortfolioApiSource } from '@/data/sources/interfaces/IPortfolioApiSource';
import { PortfolioApiSource } from '@/data/sources/PortfolioApiSource';
import { BaseRepository } from '@/data/repositories/BaseRepository';

/**
 * 포트폴리오 리포지토리
 * 도메인 로직과 데이터 소스 사이의 인터페이스 역할
 */
export class PortfolioRepository extends BaseRepository {
  private apiSource: IPortfolioApiSource;

  constructor(apiSource?: IPortfolioApiSource) {
    super();
    // 의존성 주입: apiSource가 제공되지 않으면 기본 구현 사용
    this.apiSource = apiSource ?? new PortfolioApiSource();
  }

  /**
   * 포트폴리오 목록 조회
   */
  async getPortfolioList(query: PortfolioListQuery = {}, signal?: AbortSignal): Promise<PortfolioListResponse> {
    return this.handleError(
      () => this.apiSource.getPortfolioList(query, signal),
      'PortfolioRepository',
      '포트폴리오 목록 조회'
    );
  }

  /**
   * 포트폴리오 상세 조회
   */
  async getPortfolioById(id: string, signal?: AbortSignal): Promise<PortfolioDetail> {
    return this.handleError(
      () => this.apiSource.getPortfolioById(id, signal),
      'PortfolioRepository',
      '포트폴리오 상세 조회'
    );
  }

  /**
   * 포트폴리오 등록
   */
  async createPortfolio(request: CreatePortfolioRequest): Promise<CreatePortfolioResponse> {
    return this.handleError(
      () => this.apiSource.createPortfolio(request),
      'PortfolioRepository',
      '포트폴리오 등록'
    );
  }
}

