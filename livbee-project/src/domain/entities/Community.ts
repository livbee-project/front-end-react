import type { UnifiedApiErrorResponse } from '@/shared/types/api';

export type CommunityCategoryCode = 'free' | 'question' | 'info' | 'review';

export type CommunityCategoryLabel = '자유게시판' | '질문' | '정보공유' | '후기';

export type CommunityTopicTag = '필요노하우' | '정보공유' | '공지';

/**
 * 커뮤니티 게시글 목록/카드용 엔티티
 */
export interface CommunityPost {
  id: string;
  title: string;
  preview: string;
  category: CommunityCategoryCode;
  categoryLabel: CommunityCategoryLabel;
  topicTag?: CommunityTopicTag;
  isHot?: boolean;
  authorName: string;
  authorLevel?: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
}

/**
 * 커뮤니티 게시글 상세 엔티티
 */
export interface CommunityPostDetail extends CommunityPost {
  content: string;
  images?: string[];
}

export interface CommunityListQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: CommunityCategoryCode | 'all';
  sort?: 'latest' | 'popular';
}

export interface CommunityListResponse {
  ok: boolean;
  items: CommunityPost[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface CommunityDetailResponse {
  ok: boolean;
  data: CommunityPostDetail;
}

export type CommunityApiErrorResponse = UnifiedApiErrorResponse;

