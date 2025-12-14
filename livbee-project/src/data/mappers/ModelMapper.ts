/**
 * Model API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { ModelDetail } from '@/domain/entities/Model';
import { isObject } from '@/shared/utils/typeGuards';

/**
 * ModelDetail 응답을 프론트엔드에서 사용하는 ModelDetail로 변환합니다.
 */
export const transformModelDetailResponse = (
  result: unknown,
  id: string
): ModelDetail => {
  let payload: Partial<ModelDetail> & Record<string, unknown> = {};
  
  if (isObject(result)) {
    // ModelDetailResponse 형식인 경우
    if ('data' in result && isObject(result.data)) {
      payload = result.data as Partial<ModelDetail> & Record<string, unknown>;
    } else {
      // ModelDetail 형식인 경우
      payload = result as Partial<ModelDetail> & Record<string, unknown>;
    }
  }

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

  const merged: ModelDetail = {
    ...baseDetail,
  };

  // id 필드 처리
  if (typeof payload.id === 'string' && payload.id) {
    merged.id = payload.id;
  } else if (typeof payload._id === 'string' && payload._id) {
    merged.id = payload._id;
  } else {
    merged.id = id;
  }
  
  // 나머지 필드 병합 (타입 안전하게)
  Object.assign(merged, payload);

  return merged;
};

