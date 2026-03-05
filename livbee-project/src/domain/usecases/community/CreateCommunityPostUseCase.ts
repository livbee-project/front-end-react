import type {
  CommunityPostDetail,
  CreateCommunityPostRequest,
} from '@/domain/entities/Community';
import type { CommunityRepository } from '@/data/repositories/CommunityRepository';

export class CreateCommunityPostUseCase {
  private readonly communityRepository: CommunityRepository;

  constructor(communityRepository: CommunityRepository) {
    this.communityRepository = communityRepository;
  }

  async execute(payload: CreateCommunityPostRequest): Promise<CommunityPostDetail> {
    const response = await this.communityRepository.createPost(payload);

    if (!response.ok) {
      throw new Error('커뮤니티 게시글 생성에 실패했습니다.');
    }

    return response.data;
  }
}

