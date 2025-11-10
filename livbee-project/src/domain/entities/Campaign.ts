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
 * 캠페인 등록 요청 타입
 */
export interface CreateCampaignRequest {
  // 필수 필드
  brandName: string;
  title: string;
  shootDate: string; // ISO 8601 형식
  closeAt: string; // ISO 8601 형식
  startTime: string; // "HH:mm" 형식
  endTime: string; // "HH:mm" 형식

  // 선택 필드
  isPublic?: boolean;
  prefix?: 'showhost' | 'staff' | 'model' | 'other'; // 영문 코드 (백엔드에서 자동 한글 변환)
  content?: string;
  detailedContent?: string; // 상세 내용 (content보다 우선 적용)
  category?: 'beauty' | 'fashion' | 'food' | 'electronics' | 'lifestyle'; // 영문 코드 (백엔드에서 자동 한글 변환)
  location?: string;
  durationHours?: number; // 선택 필드 (startTime과 endTime으로 자동 계산 가능)
  fee?: number;
  feeNegotiable?: boolean;
  coverImageUrl?: string;
  liveVerticalCoverUrl?: string;
  liveStreamUrl?: string;
  productThumbnailUrl?: string;
  productName?: string;
  productUrl?: string;
}

/**
 * 캠페인 등록 응답 타입
 */
export interface CreateCampaignResponse {
  ok: boolean;
  data: {
    id: string;
    brandName: string;
    title: string;
    category: string;
    categoryCode: string;
    categoryName: string;
    prefix: string;
    prefixCode: string;
    prefixName: string;
    content?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    shootDate: string;
    closeAt: string;
    durationHours: number;
    startTime: string;
    endTime: string;
    location?: string;
    fee?: number;
    feeNegotiable?: boolean;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * API 에러 응답 타입
 */
export interface CampaignApiErrorResponse {
  ok: false;
  code: string;
  message: string;
  userMessage?: string;
  errors?: Array<{
    msg: string;
    param: string;
    location: string;
  }>;
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
