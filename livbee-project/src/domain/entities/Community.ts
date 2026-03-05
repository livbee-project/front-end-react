import type { UnifiedApiErrorResponse } from '@/shared/types/api';

export type CommunityCategoryCode = 'free' | 'question' | 'info' | 'review' | 'knowhow';

export type CommunityCategoryLabel = '자유게시판' | '질문' | '정보공유' | '후기' | '탐소하우';

export type CommunityTopicTag = '필요노하우' | '정보공유' | '공지';

export const COMMUNITY_CATEGORY_LABEL_MAP: Record<CommunityCategoryCode, CommunityCategoryLabel> = {
  free: '자유게시판',
  question: '질문',
  info: '정보공유',
  review: '후기',
  knowhow: '탐소하우',
};

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
  thumbnailUrl?: string | null;
  createdAt: string;
  updatedAt?: string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  isLiked?: boolean;
  isOwner?: boolean;
}

/**
 * 커뮤니티 게시글 상세 엔티티
 */
export interface CommunityPostDetail extends CommunityPost {
  content: string;
  images?: string[];
}

export interface CommunityComment {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface CommunityCommentListResponse {
  ok: boolean;
  items: CommunityComment[];
}

export interface CreateCommunityCommentRequest {
  content: string;
}

export interface UpdateCommunityCommentRequest {
  content: string;
}

export interface CommunityLikeResponse {
  ok: boolean;
  data: {
    likeCount: number;
    isLiked: boolean;
  };
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
  limit?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface CommunityDetailResponse {
  ok: boolean;
  data: CommunityPostDetail;
}

export type CommunityApiErrorResponse = UnifiedApiErrorResponse;

export interface CreateCommunityPostRequest {
  category: CommunityCategoryCode;
  title: string;
  content: string;
  images?: string[];
}

export interface CreateCommunityPostResponse {
  ok: boolean;
  data: CommunityPostDetail;
}


