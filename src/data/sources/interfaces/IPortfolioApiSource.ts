import type {
  PortfolioListResponse,
  PortfolioListQuery,
  PortfolioDetail,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
} from '@/domain/entities/Portfolio';

/**
 * 포트폴리오 API 소스 인터페이스
 */
export interface IPortfolioApiSource {
  getPortfolioList(query?: PortfolioListQuery, signal?: AbortSignal): Promise<PortfolioListResponse>;
  getPortfolioById(id: string, signal?: AbortSignal): Promise<PortfolioDetail>;
  createPortfolio(request: CreatePortfolioRequest): Promise<CreatePortfolioResponse>;
}

