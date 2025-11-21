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
  // 백엔드에서 아직 제공하지 않는 필드 (임시로 optional 처리)
  concept?: string | null;
  categories?: string[] | null;
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
 * 모델 등록 요청 타입
 */
export interface CreateModelRequest {
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
}

/**
 * 모델 등록 응답 타입
 */
export interface CreateModelResponse {
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
    attachedFileUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
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

