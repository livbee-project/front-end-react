/**
 * 캠페인(모집 공고) 엔티티 타입 정의
 */
export interface Campaign {
  id: string;
  brandName: string;
  title: string;
  content: string;
  category: '뷰티' | '패션' | '식품' | '가전' | '생활/리빙';
  prefix: '쇼호스트모집' | '촬영스태프' | '모델모집' | '기타모집';
  imageUrl?: string;
  thumbnailUrl?: string;
  shootDate: string; // ISO 8601 형식
  closeAt: string; // ISO 8601 형식
  durationHours?: number;
  startTime?: string; // "HH:mm" 형식
  endTime?: string; // "HH:mm" 형식
  location?: string;
  fee?: number;
  feeNegotiable?: boolean;
  isAd?: boolean;
  isApplied?: boolean; // 로그인 시에만 포함
  createdAt: string; // ISO 8601 형식
  updatedAt: string; // ISO 8601 형식
}

/**
 * 캠페인 목록 조회 응답 타입
 */
export interface CampaignListResponse {
  ok: boolean;
  items: Campaign[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

/**
 * 캠페인 목록 조회 쿼리 파라미터 타입
 */
export interface CampaignListQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: 'deadline' | 'latest';
}

