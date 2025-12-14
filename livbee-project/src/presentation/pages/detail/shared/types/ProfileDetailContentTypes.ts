import type { ImageGallery } from '@/presentation/hooks/imageCrop/useImageGallery';

/**
 * 프로필 정보 데이터
 */
export interface ProfileInfo {
  name: string;
  description: string;
  detailedIntro: string;
  profileImageUrl: string;
  type: 'model' | 'showhost';
  categories: string[];
  tags: string[];
  websiteUrl: string;
}

/**
 * 프로필 기본값 데이터
 */
export interface ProfileDefaults {
  name: string;
  description: string;
  detailedIntro: string;
  profileImageUrl: string;
  websiteUrl: string;
  categories: string[];
  tags: string[];
}

/**
 * 갤러리 데이터
 */
export interface GalleryData {
  images: string[];
  defaultImages: string[];
  gallery: ImageGallery;
}

/**
 * 액션 핸들러
 */
export interface ProfileActions {
  onProfileImageClick?: () => void;
  onScrap?: () => void;
  onOffer?: () => void;
  onShare?: () => void;
  isReceivingOffers: boolean;
}

/**
 * 헤더 데이터
 */
export interface HeaderData {
  title: string;
  onShare?: () => void;
}

