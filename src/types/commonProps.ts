/**
 * 공통 컴포넌트 Props 타입 정의
 * 재사용 가능한 Props 패턴을 중앙에서 관리합니다.
 */

import type React from 'react';

// ===== 기본 컴포넌트 Props =====

/**
 * 기본 컴포넌트 Props
 * 모든 컴포넌트가 공통으로 가질 수 있는 Props
 */
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * 클릭 가능한 컴포넌트 Props
 */
export interface ClickableProps {
  onClick?: () => void;
  onPress?: () => void; // 모바일 친화적 별칭
  disabled?: boolean;
}

/**
 * 모달/다이얼로그 Props
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

/**
 * 섹션 Props
 */
export interface SectionProps extends BaseComponentProps {
  title?: string;
  description?: string;
}

// ===== 입력 필드 Props =====

/**
 * 기본 입력 필드 Props
 */
export interface BaseInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
}

/**
 * 라벨이 있는 입력 필드 Props
 */
export interface LabeledInputProps extends BaseInputProps {
  label?: string;
  description?: string;
  helper?: React.ReactNode;
  error?: string;
}

// ===== 폼 섹션 Props =====

/**
 * 폼 필드 변경 핸들러
 */
export type FormFieldChangeHandler<T extends string> = (field: T, value: string) => void;

/**
 * 폼 배열 필드 변경 핸들러
 */
export type FormArrayFieldChangeHandler<T extends string> = (
  field: T,
  index: number,
  value: unknown,
  subField?: string
) => void;

// ===== 이미지/파일 업로드 Props =====

/**
 * 이미지 업로드 Props
 */
export interface ImageUploadProps {
  imageUrl?: string | null;
  onSelectImage: (file: File) => void;
  onImageSelect?: (file: File) => void; // onSelectImage의 별칭
  onRemoveImage?: () => void;
  accept?: string;
  maxSize?: number;
  size?: number;
  aspectRatio?: string;
  enableCrop?: boolean;
}

/**
 * 갤러리 이미지 Props
 */
export interface GalleryProps {
  images: string[];
  onSelectImage: (file: File) => void;
  onReplaceImage?: (index: number, file: File) => void;
  onRemoveImage: (index: number) => void;
  maxImages?: number;
}

// ===== 검색/필터 Props =====

/**
 * 검색 Props
 */
export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

/**
 * 필터 Props
 */
export interface FilterProps {
  filters: Record<string, unknown>;
  onChange: (filters: Record<string, unknown>) => void;
  onReset?: () => void;
}

// ===== 페이지네이션 Props =====

/**
 * 페이지네이션 Props
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

// ===== 상태 표시 Props =====

/**
 * 로딩 상태 Props
 */
export interface LoadingProps {
  loading: boolean;
  message?: string;
}

/**
 * 에러 상태 Props
 */
export interface ErrorProps {
  error: string | null;
  onRetry?: () => void;
  retryLabel?: string;
}

/**
 * 빈 상태 Props
 */
export interface EmptyProps {
  empty: boolean;
  message?: string;
  action?: React.ReactNode;
}

