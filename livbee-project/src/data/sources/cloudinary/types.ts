/**
 * Cloudinary 업로드 관련 TypeScript 타입 정의
 */

/**
 * 업로드 타입 ('image' 또는 'raw')
 */
export type UploadType = 'image' | 'raw';

/**
 * 서명 응답 타입
 * 백엔드에서 받는 서명 데이터 구조
 */
export interface UploadSignatureResponse {
  data?: {
    apiKey: string;
    signature: string;
    timestamp: string;
    [key: string]: string | number;
  };
  // 또는 data 없이 직접 파라미터들이 올 수도 있음
  apiKey?: string;
  signature?: string;
  timestamp?: string;
  [key: string]: string | number | object | undefined;
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
  [key: string]: any;
}

/**
 * 업로드 옵션
 */
export interface UploadOptions {
  fileName?: string;
  type?: UploadType;
}

