import type { UnifiedApiErrorResponse } from '@/shared/types/api';

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
  coverImageUrl?: string; // 대표 이미지 (cover_image_url)
  liveVerticalCoverUrl?: string; // 라이브 커버 이미지 (live_vertical_cover_url, 홈 페이지 카드용)
  productThumbnailUrl?: string; // 상품 썸네일 이미지 (홈 페이지 카드 하단 정사각형 이미지용)
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
  brandIntroduction?: string; // 브랜드 소개 (목록 조회 시 선택 필드)
  detailedContent?: string; // 상세 내용 (목록 조회 시 선택 필드)
  summary?: string; // 요약 텍스트 (목록 조회 시 제공, HTML 태그 제거, 최대 220자)
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
  shootDate: string; // YYYY-MM-DD 형식
  closeAt: string; // YYYY-MM-DD 형식
  startTime: string; // "HH:mm" 형식
  endTime: string; // "HH:mm" 형식

  // 선택 필드
  isPublic?: boolean;
  brandIntroduction?: string;
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
  productThumbnailUrl?: string;
  productName?: string;
  qualifications?: string[]; // 자격 요건 목록
}

/**
 * 캠페인 등록 응답 타입
 */
export interface CreateCampaignResponse {
  ok: boolean;
  data: {
    id: string;
    brandName: string;
    brandIntroduction?: string;
    title: string;
    category: string;
    categoryCode: string;
    categoryName: string;
    prefix: string;
    prefixCode: string;
    prefixName: string;
    content?: string;
    detailedContent?: string;
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
    qualifications?: string[];
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * API 에러 응답 타입 (UnifiedApiErrorResponse 별칭)
 */
export type CampaignApiErrorResponse = UnifiedApiErrorResponse;

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

/**
 * 캠페인 상세 조회 응답 타입 (API 응답 구조)
 */
export interface CampaignDetailResponse {
  ok: true;
  data: {
    id: string;
    brandName: string;
    prefix: 'showhost' | 'staff' | 'model' | 'other' | null;
    prefixCode: string | null;
    prefixName: string | null;
    title: string;
    content: string;
    detailedContent: string;
    category: 'beauty' | 'fashion' | 'food' | 'electronics' | 'lifestyle' | null;
    categoryCode: string | null;
    categoryName: string | null;
    location: string | null;
    shootDate: string;
    closeAt: string;
    durationHours: number;
    startTime: string;
    endTime: string;
    fee: number | null;
    feeNegotiable: boolean;
    coverImageUrl: string | null;
    imageUrl: string;
    thumbnailUrl: string;
    liveVerticalCoverUrl: string | null;
    productThumbnailUrl: string | null;
    productImageUrl: string;
    productName: string | null;
    brandIntroduction: string;
    recruitmentSection: string;
    qualifications: string[];
    preferredQualifications: string[];
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    metrics: {
      views: number;
      clicks: number;
      applications: number;
    };
    isApplied?: boolean; // 로그인한 경우만 포함
  };
}

/**
 * 캠페인 상세 정보 타입 (프론트엔드에서 사용)
 */
export interface CampaignDetail {
  id: string;
  brandName: string;
  prefix: '쇼호스트모집' | '촬영스태프' | '모델모집' | '기타모집' | null;
  prefixName: string | null;
  title: string;
  content: string;
  detailedContent: string;
  category: '뷰티' | '패션' | '식품' | '가전' | '생활/리빙' | null;
  categoryName: string | null;
  location: string | null;
  shootDate: string;
  closeAt: string;
  durationHours: number;
  startTime: string;
  endTime: string;
  fee: number | null;
  feeNegotiable: boolean;
  coverImageUrl: string | null;
  imageUrl: string;
  thumbnailUrl: string;
  liveVerticalCoverUrl: string | null;
  productThumbnailUrl: string | null;
  productImageUrl: string;
  productName: string | null;
  brandIntroduction: string;
  recruitmentSection: string;
  qualifications: string[];
  preferredQualifications: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  metrics: {
    views: number;
    clicks: number;
    applications: number;
  };
  isApplied?: boolean;
}

export interface CampaignApplyRequest {
  campaignId: string;
  portfolioId?: string; // optional (하위 호환성 유지)
  modelId?: string; // 신규 추가
  message: string;
  availableDate: string;
  availableTime: string;
}

export interface CampaignApplyResponse {
  applicationId: string;
  chatRoomId: string;
}

export interface ApplicationActionRequest {
  applicationId: string;
  action: 'accept' | 'reject';
}

export interface ApplicationActionResponse {
  applicationId: string;
  status: 'accepted' | 'rejected';
  paymentRequest?: {
    amount: number;
    currency?: string;
  };
}