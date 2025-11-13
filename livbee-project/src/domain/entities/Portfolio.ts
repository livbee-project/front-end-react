/**
 * 포트폴리오(쇼호스트) 엔티티 타입 정의
 */

/**
 * 포트폴리오 목록 조회용 타입 (간소화된 정보)
 */
export interface Portfolio {
  id: string;
  nickname: string | null;
  oneLineIntro: string | null;
  mainThumbnailUrl: string | null;
  experienceYears: number | null;
  detailedRegion: string | null;
  height: number | null;
}

/**
 * 포트폴리오 상세 조회 응답 타입 (API 응답 구조)
 */
export interface PortfolioDetailResponse {
  ok: true;
  data: {
    _id: string;
    user: string;
    nickname: string | null;
    oneLineIntro: string | null;
    detailedIntro: string | null;
    experienceYears: number | null;
    age: number | null;
    mainThumbnailUrl: string | null;
    backgroundImageUrl: string | null;
    subThumbnailUrls: string[];
    status: string;
    isAgePublic: boolean;
    detailedRegion: string | null;
    gender: string | null;
    height: number | null;
    weight: number | null;
    topSize: string | null;
    bottomSize: string | null;
    shoeSize: number | null;
    isSizingPublic: boolean;
    websiteUrl: string | null;
    instagramUrl: string | null;
    youtubeUrl: string | null;
    tiktokUrl: string | null;
    publicScope: string;
    isReceivingOffers: boolean;
    recentLives: Array<{
      title: string;
      url: string;
      date: string;
    }>;
    attachedFileUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * 포트폴리오 상세 정보 타입 (프론트엔드에서 사용)
 */
export interface PortfolioDetail {
  id: string;
  user: string;
  nickname: string | null;
  oneLineIntro: string | null;
  detailedIntro: string | null;
  experienceYears: number | null;
  age: number | null;
  mainThumbnailUrl: string | null;
  backgroundImageUrl: string | null;
  subThumbnailUrls: string[];
  status: string;
  isAgePublic: boolean;
  detailedRegion: string | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
  topSize: string | null;
  bottomSize: string | null;
  shoeSize: number | null;
  isSizingPublic: boolean;
  websiteUrl: string | null;
  instagramUrl: string | null;
  youtubeUrl: string | null;
  tiktokUrl: string | null;
  publicScope: string;
  isReceivingOffers: boolean;
  recentLives: Array<{
    title: string;
    url: string;
    date: string;
  }>;
  attachedFileUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * 포트폴리오 목록 조회 응답 타입
 */
export interface PortfolioListResponse {
  ok: boolean;
  items: Portfolio[];
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
}

/**
 * 포트폴리오 목록 조회 쿼리 파라미터 타입
 */
export interface PortfolioListQuery {
  page?: number;
  limit?: number;
}

/**
 * 포트폴리오 등록 요청 타입
 */
export interface CreatePortfolioRequest {
  // 기본 정보
  nickname?: string;
  oneLineIntro?: string;
  detailedIntro?: string;
  experienceYears?: number;
  age?: number;
  isAgePublic?: boolean;

  // 이미지
  mainThumbnailUrl?: string;
  backgroundImageUrl?: string;
  subThumbnailUrls?: string[];

  // 지역 및 신체 정보
  detailedRegion?: string;
  gender?: 'male' | 'female';
  height?: number;
  weight?: number;
  topSize?: string;
  bottomSize?: string;
  shoeSize?: number;
  isSizingPublic?: boolean;

  // SNS 링크
  websiteUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;

  // 기타 설정
  publicScope?: string;
  isReceivingOffers?: boolean;
  status?: string;
  attachedFileUrl?: string;

  // 최근 라이브 방송
  recentLives?: Array<{
    title?: string;
    url: string;
    date?: string;
  }>;
}

/**
 * 포트폴리오 등록 응답 타입
 */
export interface CreatePortfolioResponse {
  ok: true;
  message?: string;
  data: {
    _id: string;
    user: string;
    nickname: string | null;
    oneLineIntro: string | null;
    detailedIntro: string | null;
    experienceYears: number | null;
    age: number | null;
    mainThumbnailUrl: string | null;
    backgroundImageUrl: string | null;
    subThumbnailUrls: string[];
    status: string;
    isAgePublic: boolean;
    detailedRegion: string | null;
    gender: string | null;
    height: number | null;
    weight: number | null;
    topSize: string | null;
    bottomSize: string | null;
    shoeSize: number | null;
    isSizingPublic: boolean;
    websiteUrl: string | null;
    instagramUrl: string | null;
    youtubeUrl: string | null;
    tiktokUrl: string | null;
    publicScope: string;
    isReceivingOffers: boolean;
    recentLives: Array<{
      title: string;
      url: string;
      date: string;
    }>;
    attachedFileUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * API 에러 응답 타입
 */
export interface PortfolioApiErrorResponse {
  ok: false;
  error: string;
  message: string;
  userMessage?: string;
}

