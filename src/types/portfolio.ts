/**
 * 포트폴리오 관련 타입 정의
 */

export type PortfolioRole = 'showhost' | 'model';

export interface MyPortfolioItem {
  id: number;
  title: string;
  summary: string;
  categories: string[];
  updatedAt: string;
  imageUrl?: string;
  isPinned?: boolean;
  isDefault?: boolean;
  role: PortfolioRole;
}

