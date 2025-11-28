/**
 * Model API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { ModelDetail, ModelDetailResponse } from '@/domain/entities/Model';

/**
 * ModelDetail 응답을 프론트엔드에서 사용하는 ModelDetail로 변환합니다.
 */
export const transformModelDetailResponse = (
  result: unknown,
  id: string
): ModelDetail => {
  const payload =
    ((result as ModelDetailResponse)?.data ??
      (result as ModelDetail) ??
      {}) as Partial<ModelDetail> & Record<string, unknown>;

  const baseDetail: ModelDetail = {
    id,
    user: '',
    nickname: null,
    oneLineIntro: null,
    detailedIntro: null,
    experienceYears: null,
    age: null,
    isAgePublic: false,
    mainThumbnailUrl: null,
    backgroundImageUrl: null,
    subThumbnailUrls: [],
    status: '',
    detailedRegion: null,
    gender: null,
    height: null,
    weight: null,
    topSize: null,
    bottomSize: null,
    shoeSize: null,
    isSizingPublic: false,
    websiteUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    tiktokUrl: null,
    publicScope: '',
    isReceivingOffers: false,
    attachedFileUrl: null,
    createdAt: '',
    updatedAt: '',
  };

  const merged = {
    ...baseDetail,
    ...(payload as Partial<ModelDetail>),
  };

  merged.id = (typeof payload.id === 'string' && payload.id) || (typeof payload._id === 'string' && payload._id) || id;

  return merged;
};

