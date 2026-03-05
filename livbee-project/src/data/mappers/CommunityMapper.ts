import type {
  CommunityCategoryCode,
  CommunityComment,
  CommunityListResponse,
  CommunityPost,
  CommunityPostDetail,
} from '@/domain/entities/Community';
import { COMMUNITY_CATEGORY_LABEL_MAP } from '@/domain/entities/Community';

export interface CommunityPostSummaryDto {
  id: string;
  title: string;
  summary: string;
  content?: string | null;
  thumbnailUrl?: string | null;
  category?: string | null;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  isLiked: boolean;
  isOwner: boolean;
}

export interface CommunityPostDetailDto {
  id: string;
  title: string;
  content: string;
  thumbnailUrl?: string | null;
  category?: string | null;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  isLiked: boolean;
  isOwner: boolean;
}

export interface CommunityListApiData {
  items: CommunityPostSummaryDto[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CommunityCommentDto {
  id: string;
  postId: string;
  parentId?: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  replies?: CommunityCommentDto[];
}

const PREVIEW_LENGTH = 80;

const isValidCategoryCode = (value?: string | null): value is CommunityCategoryCode => {
  if (!value) {
    return false;
  }
  return ['free', 'question', 'info', 'review', 'knowhow'].includes(value);
};

const resolveCategory = (rawCategory?: string | null): CommunityCategoryCode => {
  if (isValidCategoryCode(rawCategory)) {
    return rawCategory;
  }
  return 'free';
};

const resolvePreview = (summary: string, content?: string | null): string => {
  if (summary && summary.trim().length > 0) {
    return summary;
  }

  const base = (content ?? '').trim();
  if (!base) {
    return '';
  }

  return base.length > PREVIEW_LENGTH ? `${base.slice(0, PREVIEW_LENGTH)}…` : base;
};

export const mapPostSummaryDtoToCommunityPost = (
  dto: CommunityPostSummaryDto
): CommunityPost => {
  const category = resolveCategory(dto.category);

  return {
    id: dto.id,
    title: dto.title,
    preview: resolvePreview(dto.summary, dto.content ?? undefined),
    category,
    categoryLabel: COMMUNITY_CATEGORY_LABEL_MAP[category],
    topicTag: undefined,
    isHot: false,
    authorName: '작성자',
    authorLevel: undefined,
    thumbnailUrl: dto.thumbnailUrl ?? null,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    viewCount: dto.viewCount,
    commentCount: dto.commentCount,
    likeCount: dto.likeCount,
    isLiked: dto.isLiked,
    isOwner: dto.isOwner,
  };
};

export const mapCommentDtoToCommunityComment = (
  dto: CommunityCommentDto
): CommunityComment => {
  return {
    id: dto.id,
    postId: dto.postId,
    content: dto.content,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    authorId: dto.authorId,
  };
};

export const mapPostDetailDtoToCommunityPostDetail = (
  dto: CommunityPostDetailDto
): CommunityPostDetail => {
  const category = resolveCategory(dto.category);

  const base: CommunityPost = {
    id: dto.id,
    title: dto.title,
    preview: resolvePreview(dto.content, dto.content),
    category,
    categoryLabel: COMMUNITY_CATEGORY_LABEL_MAP[category],
    topicTag: undefined,
    isHot: false,
    authorName: '작성자',
    authorLevel: undefined,
    thumbnailUrl: dto.thumbnailUrl ?? null,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    viewCount: dto.viewCount,
    commentCount: dto.commentCount,
    likeCount: dto.likeCount,
    isLiked: dto.isLiked,
    isOwner: dto.isOwner,
  };

  return {
    ...base,
    content: dto.content,
    images: [],
  };
};

export const mapCommunityListApiDataToResponse = (
  data: CommunityListApiData
): CommunityListResponse => {
  return {
    ok: true,
    items: data.items.map(mapPostSummaryDtoToCommunityPost),
    currentPage: data.currentPage,
    totalPages: data.totalPages,
    totalItems: data.totalItems,
    limit: data.limit,
    hasNextPage: data.hasNextPage,
    hasPrevPage: data.hasPrevPage,
  };
};

