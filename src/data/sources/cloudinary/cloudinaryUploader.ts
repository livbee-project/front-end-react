import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { getToken } from '@/shared/utils/storage';
import { error as logError } from '@/shared/utils/logger';
import type {
  UploadType,
  UploadSignatureResponse,
  UploadSignatureData,
  CloudinaryUploadResponse,
  UploadOptions,
} from '@/data/sources/cloudinary/types';

/**
 * Cloudinary API 설정
 * cloudName은 서명 응답에서 받아서 사용
 */
const getCloudinaryApiBase = (cloudName: string): string => {
  return `https://api.cloudinary.com/v1_1/${cloudName}`;
};

/**
 * Cloudinary 업로드 서비스
 * Flutter의 CloudinaryUploader를 React로 이관한 구현
 */
export class CloudinaryUploader {
  /**
   * 백엔드에서 업로드 서명 받기
   */
  private async getUploadSignature(
    type: UploadType = 'image',
    category?: string,
    resourceId?: string,
    publicId?: string
  ): Promise<UploadSignatureData> {
    const token = getToken();

    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
    }

    const params: Record<string, string> = { type };
    if (category) {
      params.category = category;
    }
    if (resourceId) {
      params.resource_id = resourceId;
    }
    if (publicId) {
      params.public_id = publicId;
    }

    const url = buildApiUrl('/uploads/signature', params);
    const headers = getAuthHeaders(token);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const responseText = await response.text();

    let result: UploadSignatureResponse;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      logError('CloudinaryUploader', '서명 응답 JSON 파싱 실패', parseError);
      throw new Error(
        `Failed to parse response: ${parseError instanceof Error ? parseError.message : String(parseError)}`
      );
    }

    if (!response.ok) {
      let errorData: { error?: string; detail?: string } | null = null;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        // JSON 파싱 실패 시 텍스트 그대로 사용
      }

      const errorMessage = errorData?.error || errorData?.detail || responseText || 'Unknown error';
      logError('CloudinaryUploader', '서명 요청 실패', {
        status: response.status,
        url,
        errorMessage,
      });

      if (response.status === 401) {
        throw new Error('인증에 실패했습니다. 로그인을 다시 해주세요.');
      }

      throw new Error(
        `Failed to get upload signature: ${response.status} ${response.statusText} - ${errorMessage}`
      );
    }

    if (!result.ok) {
      const errorMessage = (result as { error?: string }).error || '서명 요청에 실패했습니다.';
      throw new Error(errorMessage);
    }

    if (!result.data) {
      throw new Error('Invalid signature response format: data is missing');
    }

    const signatureData = (result.data as { data?: UploadSignatureData }).data || result.data;

    if (!signatureData || typeof signatureData !== 'object') {
      throw new Error('Invalid signature response format: signature data is missing');
    }

    return signatureData as UploadSignatureData;
  }

  /**
   * Cloudinary에 파일 업로드
   */
  private async uploadToCloudinary(
    file: File | Blob,
    signatureData: UploadSignatureData,
    type: UploadType = 'image',
    publicId?: string
  ): Promise<string> {
    const { apiKey, signature, timestamp, cloudName, folder, ...otherParams } = signatureData;

    if (!apiKey || !signature || !timestamp || !cloudName) {
      const missingFields = [];
      if (!apiKey) missingFields.push('apiKey');
      if (!signature) missingFields.push('signature');
      if (!timestamp) missingFields.push('timestamp');
      if (!cloudName) missingFields.push('cloudName');

      throw new Error(
        `Invalid signature data: required fields are missing: ${missingFields.join(', ')}`
      );
    }

    const formData = new FormData();
    const paramsToSign: Array<[string, string]> = [];

    if (folder) {
      paramsToSign.push(['folder', folder]);
    }
    if (publicId) {
      paramsToSign.push(['public_id', publicId]);
    }
    paramsToSign.push(['timestamp', timestamp.toString()]);

    Object.entries(otherParams)
      .filter(
        ([key, value]) =>
          value !== undefined &&
          value !== null &&
          key !== 'folder' &&
          key !== 'public_id' &&
          key !== 'timestamp'
      )
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .forEach(([key, value]) => {
        paramsToSign.push([key, value.toString()]);
      });

    paramsToSign.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    paramsToSign.forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append('api_key', apiKey.toString());
    formData.append('signature', signature.toString());
    formData.append('file', file);

    const uploadUrl = `${getCloudinaryApiBase(cloudName)}/${type}/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: Record<string, unknown> = { raw: errorText };
      try {
        errorData = JSON.parse(errorText) as Record<string, unknown>;
      } catch {
        // keep raw fallback
      }
      const nestedError = errorData.error;
      const nestedMessage =
        typeof nestedError === 'object' &&
        nestedError !== null &&
        'message' in nestedError &&
        typeof nestedError.message === 'string'
          ? nestedError.message
          : undefined;
      const errorMessage =
        nestedMessage || `Cloudinary upload failed: ${response.status} ${response.statusText}`;

      logError('CloudinaryUploader', 'Cloudinary 업로드 실패', {
        status: response.status,
        uploadUrl,
        errorMessage,
      });

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
   */
  async uploadFile(file: File | Blob, options: UploadOptions = {}): Promise<string> {
    const { type = 'image', category, resourceId, publicId } = options;

    try {
      const signatureData = await this.getUploadSignature(type, category, resourceId, publicId);
      return await this.uploadToCloudinary(file, signatureData, type, publicId);
    } catch (error) {
      logError('CloudinaryUploader', 'uploadFile 실패', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred during upload');
    }
  }
}
