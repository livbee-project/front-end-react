import type {
  CommunityCommentListResponse,
  CommunityDetailResponse,
  CommunityLikeResponse,
  CommunityListQuery,
  CommunityListResponse,
  CommunityPostDetail,
  CreateCommunityPostRequest,
  CreateCommunityPostResponse,
  CreateCommunityCommentRequest,
  UpdateCommunityCommentRequest,
} from '@/domain/entities/Community';
import { COMMUNITY_CATEGORY_LABEL_MAP } from '@/domain/entities/Community';
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
      authorId: post.authorId,
      title: post.title,
      preview: post.preview,
      category: post.category,
      categoryLabel: post.categoryLabel,
      topicTag: post.topicTag,
      isHot: post.isHot,
      authorName: post.authorName,
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

  async createPost(payload: CreateCommunityPostRequest): Promise<CreateCommunityPostResponse> {
    const now = new Date();
    const id = now.getTime().toString();
    const categoryLabel = COMMUNITY_CATEGORY_LABEL_MAP[payload.category];

    const previewLength = 80;
    const preview =
      payload.content.length > previewLength
        ? `${payload.content.slice(0, previewLength)}…`
        : payload.content;

    const newPost: CommunityPostDetail = {
      id,
      authorId: 'mock-author',
      title: payload.title,
      preview,
      category: payload.category,
      categoryLabel,
      topicTag: payload.category === 'knowhow' ? '필요노하우' : undefined,
      isHot: false,
      authorName: '소소스트',
      authorRole: 'showhost',
      createdAt: now.toISOString(),
      viewCount: 0,
      commentCount: 0,
      likeCount: 0,
      content: payload.content,
      images: payload.images ?? [],
    };

    COMMUNITY_POSTS.unshift(newPost);

    await new Promise((resolve) => setTimeout(resolve, 150));

    return {
      ok: true,
      data: newPost,
    };
  }

  async getComments(_postId: string, _signal?: AbortSignal): Promise<CommunityCommentListResponse> {
    return {
      ok: true,
      items: [],
    };
  }

  async createComment(
    _postId: string,
    _payload: CreateCommunityCommentRequest
  ): Promise<void> {
    return;
  }

  async updateComment(
    _commentId: string,
    _payload: UpdateCommunityCommentRequest
  ): Promise<void> {
    return;
  }

  async deleteComment(): Promise<void> {
    return;
  }

  async likePost(): Promise<CommunityLikeResponse> {
    return {
      ok: true,
      data: {
        likeCount: 0,
        isLiked: false,
      },
    };
  }

  async unlikePost(): Promise<CommunityLikeResponse> {
    return {
      ok: true,
      data: {
        likeCount: 0,
        isLiked: false,
      },
    };
  }
}

