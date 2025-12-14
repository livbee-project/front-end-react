/**
 * Cloudinary 업로드 관련 TypeScript 타입 정의
 */

/**
 * 업로드 타입 ('image' 또는 'raw')
 */
export type UploadType = 'image' | 'raw';

/**
 * 서명 응답 데이터 타입
 */
export interface UploadSignatureData {
  apiKey: string;
  signature: string;
  timestamp: string;
  cloudName: string;
  folder: string;
  [key: string]: string | number;
}

/**
 * 서명 응답 타입
 * 백엔드에서 받는 서명 데이터 구조
 */
export interface UploadSignatureResponse {
  ok: boolean;
  data: UploadSignatureData;
}

/**
 * Cloudinary 업로드 응답 타입
 */
export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id?: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  [key: string]: unknown;
}

/**
 * 업로드 카테고리 타입
 */
export type UploadCategory = 'campaign' | 'portfolio' | 'news' | 'user' | 'studio';

/**
 * 업로드 옵션
 */
export interface UploadOptions {
  fileName?: string;
  type?: UploadType;
  category?: UploadCategory;
  resourceId?: string;
  publicId?: string; // Cloudinary에 저장될 파일명 (예: 'cover', 'thumbnail', 'product')
}

