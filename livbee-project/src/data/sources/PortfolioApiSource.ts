import type {
  PortfolioListResponse,
  PortfolioListQuery,
  PortfolioDetail,
  PortfolioDetailResponse,
  CreatePortfolioRequest,
  CreatePortfolioResponse,
} from '@/domain/entities/Portfolio';
import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { ApiError, fetchApi } from '@/shared/utils/apiClient';
import { transformPortfolioDetailResponse } from '@/data/mappers/PortfolioMapper';
import { handleShowhostEntityError } from '@/data/errorHandlers/showhostEntityErrorHandler';

import type { IPortfolioApiSource } from './interfaces/IPortfolioApiSource';

/**
 * 포트폴리오 API 소스
 * 실제 HTTP 요청을 담당하는 레이어
 */
export class PortfolioApiSource implements IPortfolioApiSource {
  /**
   * 포트폴리오 목록 조회
   */
  async getPortfolioList(query: PortfolioListQuery = {}, signal?: AbortSignal): Promise<PortfolioListResponse> {
    // 쿼리 파라미터 구성
    const params: Record<string, string | number | undefined> = {};
    
    if (query.page !== undefined) {
      params.page = query.page;
    }
    if (query.limit !== undefined) {
      params.limit = query.limit;
    }

    const url = buildApiUrl('/portfolios', params);
    const headers = getAuthHeaders();

    return fetchApi<PortfolioListResponse>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '포트폴리오 목록 조회'
    );
  }

  /**
   * 포트폴리오 상세 조회
   * @param id - 조회할 포트폴리오의 ID
   * @param signal - 요청 취소를 위한 AbortSignal (선택)
   * @returns 상세 정보
   * @throws {Error} 조회 실패 시
   */
  async getPortfolioById(id: string, signal?: AbortSignal): Promise<PortfolioDetail> {
    const url = buildApiUrl(`/portfolios/${id}`);
    const headers = getAuthHeaders();
    const result = await fetchApi<PortfolioDetailResponse['data']>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '포트폴리오 상세 조회'
    );

    return transformPortfolioDetailResponse({ ok: true, data: result }, id);
  }

  /**
   * 포트폴리오 등록
   * @param request - 등록 요청 데이터
   * @returns 등록 응답
   * @throws {Error} 등록 실패 시
   */
  async createPortfolio(request: CreatePortfolioRequest): Promise<CreatePortfolioResponse> {
    const url = buildApiUrl('/portfolios');
    const headers = getAuthHeaders();
    
    // undefined 필드 제거 (CampaignApiSource와 동일한 방식 - camelCase 유지)
    const cleanedRequest = Object.fromEntries(
      Object.entries(request).filter(([_, value]) => value !== undefined)
    ) as CreatePortfolioRequest;
    
    const requestBody = JSON.stringify(cleanedRequest, null, 2);
    
    // ========================================
    // 📤 포트폴리오 등록 요청 정보 (복사용)
    // ========================================
    console.log('\n' + '='.repeat(80));
    console.log('📤 포트폴리오 등록 API 요청');
    console.log('='.repeat(80));
    console.log('URL:', url);
    console.log('Method: POST');
    console.log('Headers:', {
      'Content-Type': headers['Content-Type'],
      'Authorization': headers['Authorization'] ? 'Bearer ***' : '없음',
    });
    console.log('\n요청 Body (JSON):');
    console.log(requestBody);
    console.log('='.repeat(80) + '\n');
    
    try {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0f91d27f-d165-4cdf-82ab-ecb2f2648200',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortfolioApiSource.ts:82',message:'createPortfolio 시작',data:{url,requestKeys:Object.keys(request),requestValues:Object.values(request).slice(0,5)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0f91d27f-d165-4cdf-82ab-ecb2f2648200',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortfolioApiSource.ts:90',message:'요청 데이터 정리 완료',data:{originalKeys:Object.keys(request),cleanedKeys:Object.keys(cleanedRequest),removedUndefined:Object.keys(request).length-Object.keys(cleanedRequest).length},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'I'})}).catch(()=>{});
      // #endregion
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0f91d27f-d165-4cdf-82ab-ecb2f2648200',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortfolioApiSource.ts:100',message:'fetchApi 호출 전',data:{requestBody:requestBody.substring(0,200),headersContentType:headers['Content-Type'],hasAuth:!!headers['Authorization']},timestamp:Date.now(),sessionId:'debug-session',runId:'run3',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      
      const result = await fetchApi<{ message?: string; data?: CreatePortfolioResponse['data'] }>(
        url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(cleanedRequest),
        },
        '포트폴리오 등록'
      );
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0f91d27f-d165-4cdf-82ab-ecb2f2648200',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortfolioApiSource.ts:115',message:'fetchApi 성공',data:{resultType:typeof result,resultKeys:result&&typeof result==='object'?Object.keys(result):undefined,hasData:result&&typeof result==='object'?'data' in result:false},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      // fetchApi가 성공 응답을 받으면 extractData를 통해 data만 반환하거나 전체 응답을 반환할 수 있음
      // 201 Created 응답이므로 성공으로 간주하고 ok: true를 명시적으로 추가
      
      // data만 반환된 경우 (extractData가 data 필드를 추출한 경우)
      if (result && typeof result === 'object' && 'id' in result && !('ok' in result)) {
        return {
          ok: true,
          data: result as CreatePortfolioResponse['data'],
        };
      }
      
      // 전체 응답이 반환된 경우 ({ message, data } 형식)
      if (result && typeof result === 'object' && 'data' in result) {
        return {
          ok: true,
          message: 'message' in result ? result.message : undefined,
          data: result.data as CreatePortfolioResponse['data'],
        };
      }
      
      // data 필드가 없는 경우 (기존 응답 형식)
      // 201 응답이므로 성공으로 간주
      return {
        ok: true,
        data: result as unknown as CreatePortfolioResponse['data'],
      };
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0f91d27f-d165-4cdf-82ab-ecb2f2648200',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortfolioApiSource.ts:120',message:'fetchApi 에러 발생',data:{errorType:error instanceof ApiError?'ApiError':'Other',errorStatus:error instanceof ApiError?error.status:undefined,errorMessage:error instanceof Error?error.message:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      if (error instanceof ApiError) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/0f91d27f-d165-4cdf-82ab-ecb2f2648200',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PortfolioApiSource.ts:125',message:'ApiError 상세',data:{status:error.status,payloadType:typeof error.payload,payloadKeys:error.payload&&typeof error.payload==='object'?Object.keys(error.payload):undefined,payloadDetail:error.payload&&typeof error.payload==='object'?JSON.stringify(error.payload).substring(0,500):String(error.payload)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'E'})}).catch(()=>{});
        // #endregion
        
        // ========================================
        // ❌ 포트폴리오 등록 실패 (복사용)
        // ========================================
        const errorPayload = error.payload ? JSON.stringify(error.payload, null, 2) : '없음';
        console.error('\n' + '='.repeat(80));
        console.error('❌ 포트폴리오 등록 실패');
        console.error('='.repeat(80));
        console.error('HTTP 상태 코드:', error.status);
        console.error('에러 메시지:', error.message);
        console.error('\n요청 URL:', url);
        console.error('요청 Method: POST');
        console.error('\n요청 Body (JSON):');
        console.error(requestBody);
        console.error('\n에러 응답 (JSON):');
        console.error(errorPayload);
        console.error('='.repeat(80));
        console.error('\n💡 위 정보를 복사해서 백엔드 담당자에게 전달해주세요.\n');
        
        throw handleShowhostEntityError({ status: error.status }, error.payload, '포트폴리오 등록에 실패했습니다.');
      }
      
      // ApiError가 아닌 경우
      console.error('\n' + '='.repeat(80));
      console.error('❌ 포트폴리오 등록 실패 (예상치 못한 에러)');
      console.error('='.repeat(80));
      console.error('에러:', error);
      console.error('='.repeat(80) + '\n');
      
      throw error;
    }
  }
}

