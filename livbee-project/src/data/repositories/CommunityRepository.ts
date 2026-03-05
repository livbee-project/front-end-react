import { BaseRepository } from '@/data/repositories/BaseRepository';
import type {
  CommunityCommentListResponse,
  CommunityDetailResponse,
  CommunityListQuery,
  CommunityListResponse,
  CommunityLikeResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
  CreateCommunityCommentRequest,
  UpdateCommunityCommentRequest,
} from '@/domain/entities/Community';
import type { ICommunityApiSource } from '@/data/sources/interfaces/ICommunityApiSource';
import { CommunityMockSource } from '@/data/sources/CommunityMockSource';
import { CommunityApiSource } from '@/data/sources/CommunityApiSource';

export class CommunityRepository extends BaseRepository {
  private apiSource: ICommunityApiSource;

  constructor(apiSource?: ICommunityApiSource) {
    super();
    if (apiSource) {
      this.apiSource = apiSource;
    } else if (import.meta.env.VITE_USE_COMMUNITY_MOCK === 'true') {
      this.apiSource = new CommunityMockSource();
    } else {
      this.apiSource = new CommunityApiSource();
    }
  }

  async getPostList(
    query: CommunityListQuery = {},
    signal?: AbortSignal
  ): Promise<CommunityListResponse> {
    return this.handleError(
      () => this.apiSource.getPostList({ ...query }, signal),
      'CommunityRepository',
      '커뮤니티 게시글 목록 조회'
    );
  }

  async getPostDetail(id: string, signal?: AbortSignal): Promise<CommunityDetailResponse> {
    return this.handleError(
      () => this.apiSource.getPostDetail(id, signal),
      'CommunityRepository',
      '커뮤니티 게시글 상세 조회'
    );
  }

  async createPost(
    payload: CreateCommunityPostRequest,
    signal?: AbortSignal
  ): Promise<CreateCommunityPostResponse> {
    return this.handleError(
      () => this.apiSource.createPost(payload, signal),
      'CommunityRepository',
      '커뮤니티 게시글 생성'
    );
  }

  async getComments(postId: string, signal?: AbortSignal): Promise<CommunityCommentListResponse> {
    return this.handleError(
      () => this.apiSource.getComments(postId, signal),
      'CommunityRepository',
      '커뮤니티 댓글 목록 조회'
    );
  }

  async createComment(
    postId: string,
    payload: CreateCommunityCommentRequest,
    signal?: AbortSignal
  ): Promise<void> {
    return this.handleError(
      () => this.apiSource.createComment(postId, payload, signal),
      'CommunityRepository',
      '커뮤니티 댓글 작성'
    );
  }

  async updateComment(
    commentId: string,
    payload: UpdateCommunityCommentRequest,
    signal?: AbortSignal
  ): Promise<void> {
    return this.handleError(
      () => this.apiSource.updateComment(commentId, payload, signal),
      'CommunityRepository',
      '커뮤니티 댓글 수정'
    );
  }

  async deleteComment(commentId: string, signal?: AbortSignal): Promise<void> {
    return this.handleError(
      () => this.apiSource.deleteComment(commentId, signal),
      'CommunityRepository',
      '커뮤니티 댓글 삭제'
    );
  }

  async likePost(postId: string, signal?: AbortSignal): Promise<CommunityLikeResponse> {
    return this.handleError(
      () => this.apiSource.likePost(postId, signal),
      'CommunityRepository',
      '커뮤니티 게시글 좋아요'
    );
  }

  async unlikePost(postId: string, signal?: AbortSignal): Promise<CommunityLikeResponse> {
    return this.handleError(
      () => this.apiSource.unlikePost(postId, signal),
      'CommunityRepository',
      '커뮤니티 게시글 좋아요 취소'
    );
  }
}

