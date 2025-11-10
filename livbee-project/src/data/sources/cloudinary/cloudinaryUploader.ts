import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { getToken } from '@/shared/utils/storage';
import type {
  UploadType,
  UploadSignatureResponse,
  CloudinaryUploadResponse,
  UploadOptions,
} from './types';

/**
 * Cloudinary API 설정
 */
const CLOUDINARY_API_BASE = 'https://api.cloudinary.com/v1_1/dis1og9uq';

/**
 * Cloudinary 업로드 서비스
 * Flutter의 CloudinaryUploader를 React로 이관한 구현
 */
export class CloudinaryUploader {
  /**
   * 백엔드에서 업로드 서명 받기
   * @param type - 업로드 타입 ('image' 또는 'raw')
   * @returns 서명 데이터
   * @throws {Error} 서명 요청 실패 시
   */
  private async getUploadSignature(type: UploadType = 'image'): Promise<UploadSignatureResponse> {
    const token = getToken();
    const url = buildApiUrl('/uploads/signature', { type });

    const headers = getAuthHeaders(token || undefined);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to get upload signature: ${response.status} ${response.statusText}`);
    }

    const data: UploadSignatureResponse = await response.json();
    return data;
  }

  /**
   * Cloudinary에 파일 업로드
   * @param file - 업로드할 파일 (File 또는 Blob)
   * @param signatureData - 서명 데이터
   * @param type - 업로드 타입 ('image' 또는 'raw')
   * @returns 업로드된 파일의 secure_url
   * @throws {Error} 업로드 실패 시
   */
  private async uploadToCloudinary(
    file: File | Blob,
    signatureData: UploadSignatureResponse,
    type: UploadType = 'image'
  ): Promise<string> {
    // 서명 데이터에서 파라미터 추출
    const signatureParams = signatureData.data || signatureData;
    const { apiKey, signature, ...otherParams } = signatureParams;

    if (!apiKey || !signature) {
      throw new Error('Invalid signature data: apiKey or signature is missing');
    }

    // FormData 생성
    const formData = new FormData();

    // 서명 파라미터 추가 (apiKey 제외)
    Object.entries(otherParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // 필수 파라미터 추가
    formData.append('api_key', apiKey.toString());
    formData.append('signature', signature.toString());

    // 파일 추가
    formData.append('file', file);

    // Cloudinary API 엔드포인트
    const uploadUrl = `${CLOUDINARY_API_BASE}/${type}/upload`;

    // 업로드 요청
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message || `Cloudinary upload failed: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const result: CloudinaryUploadResponse = await response.json();

    if (!result.secure_url) {
      throw new Error('File URL not found in response');
    }

    return result.secure_url;
  }

  /**
   * 파일을 Cloudinary에 업로드
   * @param file - 업로드할 파일 (File 또는 Blob)
   * @param options - 업로드 옵션
   * @returns 업로드된 파일의 secure_url
   * @throws {Error} 업로드 실패 시
   */
  async uploadFile(
    file: File | Blob,
    options: UploadOptions = {}
  ): Promise<string> {
    const { type = 'image' } = options;

    try {
      // 1. 백엔드에서 서명 받기
      const signatureData = await this.getUploadSignature(type);

      // 2. Cloudinary에 직접 업로드
      const secureUrl = await this.uploadToCloudinary(file, signatureData, type);

      return secureUrl;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred during upload');
    }
  }
}

