import { BaseRepository } from '@/data/repositories/BaseRepository';
import type {
  CommunityDetailResponse,
  CommunityListQuery,
  CommunityListResponse,
} from '@/domain/entities/Community';
import type { ICommunityApiSource } from '@/data/sources/interfaces/ICommunityApiSource';
import { CommunityMockSource } from '@/data/sources/CommunityMockSource';

export class CommunityRepository extends BaseRepository {
  private apiSource: ICommunityApiSource;

  constructor(apiSource?: ICommunityApiSource) {
    super();
    this.apiSource = apiSource ?? new CommunityMockSource();
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
}

