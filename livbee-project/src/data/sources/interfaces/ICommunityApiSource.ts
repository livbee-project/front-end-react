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

export interface ICommunityApiSource {
  getPostList(query: CommunityListQuery, signal?: AbortSignal): Promise<CommunityListResponse>;

  getPostDetail(id: string, signal?: AbortSignal): Promise<CommunityDetailResponse>;

  createPost(
    payload: CreateCommunityPostRequest,
    signal?: AbortSignal
  ): Promise<CreateCommunityPostResponse>;

  getComments(postId: string, signal?: AbortSignal): Promise<CommunityCommentListResponse>;

  createComment(
    postId: string,
    payload: CreateCommunityCommentRequest,
    signal?: AbortSignal
  ): Promise<CommunityCommentListResponse>;

  updateComment(
    commentId: string,
    payload: UpdateCommunityCommentRequest,
    signal?: AbortSignal
  ): Promise<CommunityCommentListResponse>;

  deleteComment(commentId: string, signal?: AbortSignal): Promise<CommunityCommentListResponse>;

  likePost(postId: string, signal?: AbortSignal): Promise<CommunityLikeResponse>;

  unlikePost(postId: string, signal?: AbortSignal): Promise<CommunityLikeResponse>;
}

