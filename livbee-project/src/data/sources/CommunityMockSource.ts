import type {
  CommunityDetailResponse,
  CommunityListQuery,
  CommunityListResponse,
} from '@/domain/entities/Community';
import type { ICommunityApiSource } from '@/data/sources/interfaces/ICommunityApiSource';
import { COMMUNITY_POSTS } from '@/data/sources/mocks/communityMockData';

const DEFAULT_PAGE_SIZE = 20;

export class CommunityMockSource implements ICommunityApiSource {
  async getPostList(query: CommunityListQuery): Promise<CommunityListResponse> {
    const {
      page = 1,
      limit = DEFAULT_PAGE_SIZE,
      search,
      category = 'all',
      sort = 'latest',
    } = query;

    let filtered = [...COMMUNITY_POSTS];

    if (category !== 'all') {
      filtered = filtered.filter((post) => post.category === category);
    }

    if (search && search.trim()) {
      const lower = search.trim().toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(lower) ||
          post.preview.toLowerCase().includes(lower) ||
          post.content.toLowerCase().includes(lower)
      );
    }

    if (sort === 'popular') {
      filtered.sort((a, b) => b.viewCount - a.viewCount);
    } else {
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / limit));

    const start = (page - 1) * limit;
    const end = start + limit;
    const items = filtered.slice(start, end).map((post) => ({
      id: post.id,
      title: post.title,
      preview: post.preview,
      category: post.category,
      categoryLabel: post.categoryLabel,
      topicTag: post.topicTag,
      isHot: post.isHot,
      authorName: post.authorName,
      authorLevel: post.authorLevel,
      createdAt: post.createdAt,
      viewCount: post.viewCount,
      commentCount: post.commentCount,
      likeCount: post.likeCount,
    }));

    // 비동기 API 느낌을 위해 약간의 지연을 둡니다.
    await new Promise((resolve) => setTimeout(resolve, 150));

    return {
      ok: true,
      items,
      currentPage: page,
      totalPages,
      totalItems,
    };
  }

  async getPostDetail(id: string): Promise<CommunityDetailResponse> {
    const found = COMMUNITY_POSTS.find((post) => post.id === id);

    // 비동기 API 느낌을 위해 약간의 지연을 둡니다.
    await new Promise((resolve) => setTimeout(resolve, 150));

    if (!found) {
      throw new Error('게시글을 찾을 수 없습니다.');
    }

    return {
      ok: true,
      data: found,
    };
  }
}

