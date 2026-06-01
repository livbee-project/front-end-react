import { buildApiUrl, getAuthHeaders } from '@/shared/config/apiConfig';
import { fetchApi } from '@/shared/utils/apiClient';
import type {
  CommunityCommentListResponse,
  CommunityDetailResponse,
  CommunityLikeResponse,
  CommunityListQuery,
  CommunityListResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
  CreateCommunityCommentRequest,
  UpdateCommunityCommentRequest,
} from '@/domain/entities/Community';
import {
  mapCommunityListApiDataToResponse,
  mapPostDetailDtoToCommunityPostDetail,
  mapCommentDtoToCommunityComment,
  type CommunityListApiData,
  type CommunityPostDetailDto,
  type CommunityCommentDto,
} from '@/data/mappers/CommunityMapper';
import type { ICommunityApiSource } from '@/data/sources/interfaces/ICommunityApiSource';

export class CommunityApiSource implements ICommunityApiSource {
  async getPostList(
    query: CommunityListQuery = {},
    signal?: AbortSignal
  ): Promise<CommunityListResponse> {
    const params: Record<string, string | number | undefined> = {};

    if (query.page !== undefined) {
      params.page = query.page;
    }
    if (query.limit !== undefined) {
      params.limit = query.limit;
    }
    if (query.search && query.search.trim()) {
      params.search = query.search.trim();
    }
    if (query.category && query.category !== 'all') {
      params.category = query.category;
    }
    if (query.sort) {
      // 백엔드 스펙: sort=recent|popular
      params.sort = query.sort === 'popular' ? 'popular' : 'recent';
    }

    const url = buildApiUrl('/community/posts', params);
    const headers = getAuthHeaders();

    const result = await fetchApi<CommunityListApiData>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '커뮤니티 게시글 목록 조회'
    );

    return mapCommunityListApiDataToResponse(result);
  }

  async getPostDetail(id: string, signal?: AbortSignal): Promise<CommunityDetailResponse> {
    const url = buildApiUrl(`/community/posts/${id}`);

    const headers = getAuthHeaders();

    const result = await fetchApi<{ data: CommunityPostDetailDto }>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '커뮤니티 게시글 상세 조회'
    );

    return {
      ok: true,
      data: mapPostDetailDtoToCommunityPostDetail(result.data),
    };
  }

  async createPost(
    payload: CreateCommunityPostRequest,
    signal?: AbortSignal
  ): Promise<CreateCommunityPostResponse> {
    const url = buildApiUrl('/community/posts');
    const headers = getAuthHeaders();

    const requestBody = {
      title: payload.title,
      content: payload.content,
      category: payload.category,
      thumbnailUrl: payload.images && payload.images.length > 0 ? payload.images[0] : undefined,
    };

    const result = await fetchApi<{ data: CommunityPostDetailDto }>(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        signal,
      },
      '커뮤니티 게시글 생성'
    );

    return {
      ok: true,
      data: mapPostDetailDtoToCommunityPostDetail(result.data),
    };
  }

  async getComments(postId: string, signal?: AbortSignal): Promise<CommunityCommentListResponse> {
    const url = buildApiUrl(`/community/posts/${postId}/comments`);
    const headers = getAuthHeaders();

    const result = await fetchApi<{ items: CommunityCommentDto[] }>(
      url,
      {
        method: 'GET',
        headers,
        signal,
      },
      '커뮤니티 댓글 목록 조회'
    );

    const items = Array.isArray(result.items) ? result.items.map(mapCommentDtoToCommunityComment) : [];

    return {
      ok: true,
      items,
    };
  }

  async createComment(
    postId: string,
    payload: CreateCommunityCommentRequest,
    signal?: AbortSignal
  ): Promise<void> {
    const url = buildApiUrl(`/community/posts/${postId}/comments`);
    const headers = getAuthHeaders();

    // 대댓글 제도 폐지: parentId는 전송하지 않고 항상 최상위 댓글로 등록
    await fetchApi<{ data: CommunityCommentDto }>(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ content: payload.content }),
        signal,
      },
      '커뮤니티 댓글 작성'
    );
  }

  async updateComment(
    commentId: string,
    payload: UpdateCommunityCommentRequest,
    signal?: AbortSignal
  ): Promise<void> {
    const url = buildApiUrl(`/community/posts/comments/${commentId}`);
    const headers = getAuthHeaders();

    await fetchApi<{ data: CommunityCommentDto }>(
      url,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({ content: payload.content }),
        signal,
      },
      '커뮤니티 댓글 수정'
    );
  }

  async deleteComment(commentId: string, signal?: AbortSignal): Promise<void> {
    const url = buildApiUrl(`/community/posts/comments/${commentId}`);
    const headers = getAuthHeaders();

    await fetchApi<{ data: CommunityCommentDto }>(
      url,
      {
        method: 'DELETE',
        headers,
        signal,
      },
      '커뮤니티 댓글 삭제'
    );
  }

  async likePost(postId: string, signal?: AbortSignal): Promise<CommunityLikeResponse> {
    const url = buildApiUrl(`/community/posts/${postId}/like`);
    const headers = getAuthHeaders();

    const result = await fetchApi<CommunityLikeResponse['data']>(
      url,
      {
        method: 'POST',
        headers,
        signal,
      },
      '커뮤니티 게시글 좋아요'
    );

    return {
      ok: true,
      data: result,
    };
  }

  async unlikePost(postId: string, signal?: AbortSignal): Promise<CommunityLikeResponse> {
    const url = buildApiUrl(`/community/posts/${postId}/like`);
    const headers = getAuthHeaders();

    const result = await fetchApi<CommunityLikeResponse['data']>(
      url,
      {
        method: 'DELETE',
        headers,
        signal,
      },
      '커뮤니티 게시글 좋아요 취소'
    );

    return {
      ok: true,
      data: result,
    };
  }
}

