import type {
  CommunityDetailResponse,
  CommunityListQuery,
  CommunityListResponse,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
} from '@/domain/entities/Community';

export interface ICommunityApiSource {
  getPostList(query: CommunityListQuery, signal?: AbortSignal): Promise<CommunityListResponse>;

  getPostDetail(id: string, signal?: AbortSignal): Promise<CommunityDetailResponse>;

  createPost(
    payload: CreateCommunityPostRequest,
    signal?: AbortSignal
  ): Promise<CreateCommunityPostResponse>;
}

