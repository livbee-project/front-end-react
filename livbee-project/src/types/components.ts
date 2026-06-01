import type React from 'react';
import type {
  ModalProps as CommonModalProps,
  BaseInputProps as CommonBaseInputProps,
  ImageUploadProps as CommonImageUploadProps,
} from '@/types/commonProps';

/**
 * 공통 컴포넌트 Props 타입 정의
 * @deprecated 일부 타입은 @/types/commonProps로 이동되었습니다.
 * 새로운 컴포넌트는 commonProps의 타입을 사용하세요.
 */

// ===== 섹션 관련 =====

export interface SectionHeaderProps {
  title: string;
  onMorePressed?: () => void;
}

export interface SectionContainerProps {
  title: string;
  onMorePressed?: () => void;
  children: React.ReactNode;
}

// ===== 갤러리 관련 =====

export interface GalleryGridProps {
  images?: string[];
  columns?: number;
  onImageClick?: (index: number) => void;
}

export interface GalleryLightboxProps {
  image?: string;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

// ===== 상태 컴포넌트 =====

export interface StateComponentProps {
  message?: string;
  padding?: string;
}

export interface ErrorStateProps extends StateComponentProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

// ===== 카드 컴포넌트 =====

export interface BaseCardProps {
  onClick?: () => void;
  onPress?: () => void;
}

export interface ImageCardProps extends BaseCardProps {
  imageUrl?: string;
}

// ===== 모달 관련 =====

/**
 * @deprecated @/types/commonProps의 ModalProps를 사용하세요
 */
export type BaseModalProps = CommonModalProps

// ===== 파일 업로드 관련 =====

export interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  onImageSelect?: (file: File) => void;
}

/**
 * @deprecated @/types/commonProps의 ImageUploadProps를 사용하세요
 */
export interface ImageUploadProps extends CommonImageUploadProps {
  size?: number;
}

// ===== 입력 컴포넌트 =====

/**
 * @deprecated @/types/commonProps의 BaseInputProps를 사용하세요
 */
export type BaseInputProps = CommonBaseInputProps

export interface SelectInputProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>,
    BaseInputProps {
  options: { value: string; label: string }[];
}

// ===== 리스트 관련 =====

export interface ListContainerProps {
  children: React.ReactNode;
  showDividers?: boolean;
}

// ===== 버튼 관련 =====

export interface BaseButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export interface ProfileSectionProps {
  name: string;
  description?: string | null;
  detailedIntro?: string | null;
  profileImageUrl?: string;
  type: 'showhost' | 'model';
}

export interface InfoItemProps {
  title: string;
  content?: string | number | null;
  children?: React.ReactNode;
}

export interface ActionSectionProps {
  isScraped?: boolean;
  isReceivingOffers?: boolean;
  onScrap?: () => void;
  onOffer?: () => void;
}

export interface StickyHeaderProps {
  title: string;
  onShare?: () => void;
  showShare?: boolean;
}

