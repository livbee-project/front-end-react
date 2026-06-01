import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { getToken } from '@/shared/utils/storage';
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
   * @param type - 업로드 타입 ('image' 또는 'raw')
   * @param category - 업로드 카테고리 ('campaign', 'portfolio' 등)
   * @param resourceId - 리소스 ID (campaign_id, portfolio_id 등)
   * @returns 서명 데이터
   * @throws {Error} 서명 요청 실패 시
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
    
    // Query 파라미터 구성
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

    console.log('[CloudinaryUploader] 📤 서명 요청 시작', {
      url,
      category,
      resourceId,
      publicId,
      type,
    });

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    console.log('[CloudinaryUploader] 📥 서명 응답 받음', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    // 응답 본문을 텍스트로 먼저 읽어서 확인
    const responseText = await response.text();
    console.log('[CloudinaryUploader] 📋 원본 응답 텍스트:', responseText);
    
    // JSON으로 파싱
    let result: UploadSignatureResponse;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('[CloudinaryUploader] ❌ JSON 파싱 실패', {
        responseText,
        parseError,
      });
      throw new Error(`Failed to parse response: ${parseError instanceof Error ? parseError.message : String(parseError)}`);
    }

    if (!response.ok) {
      // 에러 응답 파싱 (이미 읽은 responseText 사용)
      let errorData = null;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        // JSON 파싱 실패 시 텍스트 그대로 사용
      }
      
      const errorMessage = errorData?.error || errorData?.detail || responseText || 'Unknown error';
      
      // 모든 정보를 펼쳐서 한 번에 출력 (그룹 없이)
      const errorSummary = {
        '🚨 에러 메시지': errorMessage,
        '📊 HTTP 상태': `${response.status} ${response.statusText}`,
        '🔗 요청 URL': url,
        '📥 에러 응답': {
          '원본 응답 텍스트': responseText,
          '파싱된 에러 데이터': errorData,
        },
        '⏰ 발생 시간': new Date().toISOString(),
      };
      
      // 모든 정보를 한 번에 출력 (펼쳐진 형태)
      console.error('🚨 [CloudinaryUploader] 서명 요청 실패 - 모든 정보 (복사용):');
      console.error(JSON.stringify(errorSummary, null, 2));
      
      // 가독성을 위한 추가 출력
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ 에러 메시지:', errorMessage);
      console.error('📊 HTTP 상태:', `${response.status} ${response.statusText}`);
      console.error('🔗 요청 URL:', url);
      console.error('📥 원본 응답:', responseText);
      if (errorData) {
        console.error('📥 파싱된 에러:', errorData);
      }
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (response.status === 401) {
        throw new Error('인증에 실패했습니다. 로그인을 다시 해주세요.');
      }
      
      throw new Error(`Failed to get upload signature: ${response.status} ${response.statusText} - ${errorMessage}`);
    }
    
    // 전체 응답을 별도로 로깅 (중요한 정보)
    console.log('[CloudinaryUploader] 📋 전체 응답:', result);
    console.log('[CloudinaryUploader] 📋 응답 data 객체:', result.data);
    console.log('[CloudinaryUploader] 📋 data의 모든 키:', result.data ? Object.keys(result.data) : 'data가 없음');
    
    console.log('[CloudinaryUploader] ✅ 서명 응답 파싱 완료', {
      ok: result.ok,
      hasData: !!result.data,
      cloudName: result.data?.cloudName,
      folder: result.data?.folder,
      error: (result as { error?: string }).error,
      dataKeys: result.data ? Object.keys(result.data) : [],
    });
    
    // 에러 응답 처리 (ok: false인 경우)
    if (!result.ok) {
      const errorMessage = (result as { error?: string }).error || '서명 요청에 실패했습니다.';
      console.error('[CloudinaryUploader] ❌ 서명 요청 실패 (응답)', {
        ok: result.ok,
        error: errorMessage,
        result,
      });
      throw new Error(errorMessage);
    }
    
    // 정상 응답이지만 data가 없는 경우
    if (!result.data) {
      console.error('[CloudinaryUploader] ❌ 잘못된 응답 형식 (data 없음)', {
        result,
      });
      throw new Error('Invalid signature response format: data is missing');
    }
    
    // 백엔드 응답이 중첩된 구조인 경우 처리: { ok: true, data: { data: { ... } } }
    // 또는 평면 구조인 경우: { ok: true, data: { ... } }
    const signatureData = (result.data as { data?: UploadSignatureData }).data || result.data;
    
    if (!signatureData || typeof signatureData !== 'object') {
      console.error('[CloudinaryUploader] ❌ 잘못된 응답 형식 (signatureData 없음)', {
        result,
        signatureData,
      });
      throw new Error('Invalid signature response format: signature data is missing');
    }
    
    console.log('[CloudinaryUploader] ✅ 최종 서명 데이터 추출 완료', {
      hasApiKey: !!signatureData.apiKey,
      hasSignature: !!signatureData.signature,
      hasTimestamp: !!signatureData.timestamp,
      hasCloudName: !!signatureData.cloudName,
      hasFolder: !!signatureData.folder,
      cloudName: signatureData.cloudName,
      folder: signatureData.folder,
      timestamp: signatureData.timestamp,
      timestampType: typeof signatureData.timestamp,
      signature: signatureData.signature,
    });
    
    // 백엔드 로그와 비교하기 위한 서명 생성 파라미터 정보
    const signatureParams: Array<[string, string]> = [];
    if (signatureData.folder) {
      signatureParams.push(['folder', signatureData.folder]);
    }
    if (publicId) {
      signatureParams.push(['public_id', publicId]);
    }
    if (signatureData.timestamp) {
      signatureParams.push(['timestamp', String(signatureData.timestamp)]);
    }
    signatureParams.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    const signatureString = signatureParams.map(([key, value]) => `${key}=${value}`).join('&');
    
    console.log('[CloudinaryUploader] 🔍 백엔드 서명 생성 파라미터 (예상)', {
      signatureString,
      signatureParams: signatureParams.map(([key, value]) => `${key}=${value}`),
      receivedSignature: signatureData.signature,
      '✅ 서명 생성 방식': '백엔드가 SHA-1 해시 방식으로 변경 완료 (Cloudinary 공식 방식)',
      '서명 생성 문자열': signatureString,
    });
    
    return signatureData as UploadSignatureData;
  }

  /**
   * Cloudinary에 파일 업로드
   * @param file - 업로드할 파일 (File 또는 Blob)
   * @param signatureData - 서명 데이터
   * @param type - 업로드 타입 ('image' 또는 'raw')
   * @param publicId - 파일명 (예: 'cover', 'thumbnail', 'product')
   * @returns 업로드된 파일의 secure_url
   * @throws {Error} 업로드 실패 시
   */
  private async uploadToCloudinary(
    file: File | Blob,
    signatureData: UploadSignatureData,
    type: UploadType = 'image',
    publicId?: string
  ): Promise<string> {
    const { apiKey, signature, timestamp, cloudName, folder, ...otherParams } = signatureData;

    console.log('[CloudinaryUploader] 📤 Cloudinary 업로드 시작', {
      otherParams: Object.keys(otherParams).length > 0 ? otherParams : '없음',
      otherParamsKeys: Object.keys(otherParams),
      hasApiKey: !!apiKey,
      hasSignature: !!signature,
      hasTimestamp: !!timestamp,
      hasCloudName: !!cloudName,
      hasFolder: !!folder,
      cloudName,
      folder,
      publicId,
      type,
      signatureDataKeys: Object.keys(signatureData),
    });

    if (!apiKey || !signature || !timestamp || !cloudName) {
      const missingFields = [];
      if (!apiKey) missingFields.push('apiKey');
      if (!signature) missingFields.push('signature');
      if (!timestamp) missingFields.push('timestamp');
      if (!cloudName) missingFields.push('cloudName');
      
      console.error('[CloudinaryUploader] ❌ 필수 필드 누락', {
        missingFields,
        signatureData,
      });
      
      throw new Error(`Invalid signature data: required fields are missing: ${missingFields.join(', ')}`);
    }

    // FormData 생성
    // Cloudinary 서명 검증을 위해 파라미터를 알파벳 순서로 정렬하여 추가
    const formData = new FormData();

    // 서명에 포함되는 파라미터들을 알파벳 순서로 정렬하여 추가
    // Cloudinary 서명 규칙: 백엔드가 서명 생성에 사용한 파라미터만 FormData에 포함해야 함
    // 현재 백엔드는 folder, public_id, timestamp만 사용하여 서명 생성 (resource_type 미포함)
    // resource_type은 URL 경로에만 포함되고 FormData에는 포함되지 않음
    const paramsToSign: Array<[string, string]> = [];
    
    // folder 파라미터 추가 (백엔드에서 제공)
    if (folder) {
      paramsToSign.push(['folder', folder]);
    }
    
    // public_id 파라미터 추가 (파일명 지정)
    if (publicId) {
      paramsToSign.push(['public_id', publicId]);
    }
    
    // timestamp 파라미터 추가
    paramsToSign.push(['timestamp', timestamp.toString()]);
    
    // 주의: resource_type은 URL 경로에만 포함되고 FormData에는 포함하지 않음
    // 백엔드가 서명 생성 시 resource_type을 포함하지 않았으므로 프론트엔드도 제외
    
    // 기타 서명 파라미터 추가 (알파벳 순서로 정렬)
    Object.entries(otherParams)
      .filter(([key, value]) => 
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
    
    // 알파벳 순서로 정렬하여 FormData에 추가
    paramsToSign.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    paramsToSign.forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // 서명에 포함되지 않는 파라미터 추가
    formData.append('api_key', apiKey.toString());
    formData.append('signature', signature.toString());
    
    // 파일 추가 (항상 마지막)
    formData.append('file', file);
    
    // 디버깅: FormData에 추가된 파라미터 로깅
    console.log('[CloudinaryUploader] 📋 FormData 파라미터 순서:', paramsToSign.map(([key]) => key).join(', '));
    console.log('[CloudinaryUploader] 📋 서명에 포함된 파라미터 (키-값):', paramsToSign.map(([key, value]) => `${key}=${value}`).join('&'));
    console.log('[CloudinaryUploader] 📋 서명에 포함된 파라미터 (상세):', paramsToSign);
    console.log('[CloudinaryUploader] 📋 백엔드에서 받은 timestamp 타입:', typeof timestamp, '값:', timestamp);
    console.log('[CloudinaryUploader] 📋 FormData에 추가될 timestamp 값:', timestamp.toString());
    
    // Cloudinary API 엔드포인트 (cloudName 사용)
    // 주의: type은 URL에 포함되지만 FormData에는 포함되지 않음
    const uploadUrl = `${getCloudinaryApiBase(cloudName)}/${type}/upload`;
    
    // 실제 FormData에 포함된 모든 파라미터 확인 (백엔드 요청)
    const allFormDataParams: Record<string, string | File> = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        allFormDataParams[key] = `[File: ${value.name}, ${value.size} bytes]`;
      } else {
        allFormDataParams[key] = value;
      }
    }
    console.log('[CloudinaryUploader] 📋 실제 FormData에 포함된 모든 파라미터:', allFormDataParams);
    console.log('[CloudinaryUploader] 📋 업로드 URL:', uploadUrl);
    console.log('[CloudinaryUploader] 📋 resource_type (URL에 포함):', type);

    // 업로드 요청
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
      
      // 에러 정보를 모두 펼쳐서 한 번에 표시 (그룹 없이)
      const signatureString = paramsToSign.map(([key, value]) => `${key}=${value}`).join('&');
      const formDataParams = Object.fromEntries(paramsToSign);
      
      // 복사하기 쉬운 형태로 모든 정보를 한 번에 출력
      const errorSummary = {
        '🚨 에러 메시지': errorMessage,
        '📊 HTTP 상태': `${response.status} ${response.statusText}`,
        '🔗 업로드 URL': uploadUrl,
        '🔐 서명 정보': {
          '서명에 포함된 파라미터': signatureString,
          '백엔드에서 받은 서명': signature,
          '타임스탬프': timestamp,
          '타임스탬프 타입': typeof timestamp,
        },
        '📋 FormData 파라미터': formDataParams,
        '📥 Cloudinary 에러 응답': {
          '에러 데이터': errorData,
          '원본 응답 텍스트': errorText,
        },
        '⏰ 발생 시간': new Date().toISOString(),
      };
      
      // 모든 정보를 한 번에 출력 (펼쳐진 형태)
      console.error('🚨 [CloudinaryUploader] 업로드 실패 - 모든 정보 (복사용):');
      console.error(JSON.stringify(errorSummary, null, 2));
      
      // 가독성을 위한 추가 출력
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ 에러 메시지:', errorMessage);
      console.error('📊 HTTP 상태:', `${response.status} ${response.statusText}`);
      console.error('🔗 업로드 URL:', uploadUrl);
      console.error('🔐 서명 파라미터:', signatureString);
      console.error('🔐 백엔드 서명:', signature);
      console.error('📋 FormData 파라미터:', formDataParams);
      console.error('📥 에러 응답:', errorData);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
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
    const { type = 'image', category, resourceId, publicId } = options;

    try {
      console.log('[CloudinaryUploader] 🚀 uploadFile 시작', {
        fileName: file instanceof File ? file.name : 'Blob',
        fileSize: file.size,
        fileType: file.type,
        options,
      });

      // 1. 백엔드에서 서명 받기 (publicId 포함)
      const signatureData = await this.getUploadSignature(type, category, resourceId, publicId);
      
      console.log('[CloudinaryUploader] ✅ 서명 데이터 받음', {
        hasApiKey: !!signatureData.apiKey,
        hasSignature: !!signatureData.signature,
        hasTimestamp: !!signatureData.timestamp,
        hasCloudName: !!signatureData.cloudName,
        hasFolder: !!signatureData.folder,
        cloudName: signatureData.cloudName,
        folder: signatureData.folder,
      });

      // 2. Cloudinary에 직접 업로드
      const secureUrl = await this.uploadToCloudinary(file, signatureData, type, publicId);

      console.log('[CloudinaryUploader] ✅ 업로드 완료', { secureUrl });
      return secureUrl;
    } catch (error) {
      // 모든 정보를 펼쳐서 한 번에 출력 (그룹 없이)
      const errorSummary = {
        '🚨 에러 메시지': error instanceof Error ? error.message : String(error),
        '📚 에러 스택': error instanceof Error ? error.stack : undefined,
        '⚙️ 업로드 옵션': options,
        '⏰ 발생 시간': new Date().toISOString(),
      };
      
      // 모든 정보를 한 번에 출력 (펼쳐진 형태)
      console.error('🚨 [CloudinaryUploader] uploadFile 에러 - 모든 정보 (복사용):');
      console.error(JSON.stringify(errorSummary, null, 2));
      
      // 가독성을 위한 추가 출력
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('❌ 에러 메시지:', error instanceof Error ? error.message : String(error));
      if (error instanceof Error && error.stack) {
        console.error('📚 에러 스택:', error.stack);
      }
      console.error('⚙️ 업로드 옵션:', options);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred during upload');
    }
  }
}

