/**
 * 모델 엔티티 타입 정의
 */

/**
 * 모델 목록 조회용 타입 (간소화된 정보)
 */
export interface Model {
  id: string;
  nickname: string | null;
  oneLineIntro: string | null;
  mainThumbnailUrl: string | null;
  experienceYears: number | null;
  detailedRegion: string | null;
  height: number | null;
  gender: string | null;
}

/**
 * 모델 상세 조회 응답 타입 (API 응답 구조)
 */
export interface ModelDetailResponse {
  ok: true;
  data: {
    _id: string;
    user: string;
    nickname: string | null;
    oneLineIntro: string | null;
    detailedIntro: string | null;
    experienceYears: number | null;
    age: number | null;
    isAgePublic: boolean;
    mainThumbnailUrl: string | null;
    backgroundImageUrl: string | null;
    subThumbnailUrls: string[];
    status: string;
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
    attachedFileUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * 모델 상세 조회용 타입 (프론트엔드에서 사용)
 */
export interface ModelDetail {
  id: string;
  user: string;
  nickname: string | null;
  oneLineIntro: string | null;
  detailedIntro: string | null;
  experienceYears: number | null;
  age: number | null;
  isAgePublic: boolean;
  mainThumbnailUrl: string | null;
  backgroundImageUrl: string | null;
  subThumbnailUrls: string[];
  status: string;
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
  attachedFileUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * 모델 목록 조회 응답 타입
 */
export interface ModelListResponse {
  ok: true;
  items: Model[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

/**
 * 모델 목록 조회 쿼리 파라미터
 */
export interface ModelListQuery {
  page?: number;
  limit?: number;
}

/**
 * API 에러 응답 타입
 */
export interface ModelApiErrorResponse {
  ok: false;
  error: string;
  message: string;
  userMessage: string;
}

