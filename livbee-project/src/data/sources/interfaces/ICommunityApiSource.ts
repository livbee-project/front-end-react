import type {
  CommunityDetailResponse,
  CommunityListQuery,
  CommunityListResponse,
} from '@/domain/entities/Community';

export interface ICommunityApiSource {
  getPostList(query: CommunityListQuery, signal?: AbortSignal): Promise<CommunityListResponse>;

  getPostDetail(id: string, signal?: AbortSignal): Promise<CommunityDetailResponse>;
}

