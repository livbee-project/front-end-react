/**
 * Model API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { Model, ModelDetail, ModelListResponse } from '@/domain/entities/Model';
import { isObject } from '@/shared/utils/typeGuards';

/**
 * Model 목록 응답을 변환합니다.
 * API 응답의 _id를 id로 변환합니다.
 */
export const transformModelListResponse = (response: unknown): ModelListResponse => {
  if (!isObject(response)) {
    return {
      ok: false,
      items: [],
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
    };
  }

  const result = response as Partial<ModelListResponse> & Record<string, unknown>;

  // items 배열 변환
  let items: Model[] = [];
  if (Array.isArray(result.items)) {
    items = result.items.map((item: unknown) => {
      if (!isObject(item)) {
        return null;
      }
      const modelItem = item as Partial<Model> & Record<string, unknown>;
      
      // _id를 id로 변환
      const id = typeof modelItem.id === 'string' && modelItem.id
        ? modelItem.id
        : typeof modelItem._id === 'string' && modelItem._id
        ? modelItem._id
        : '';

      return {
        id,
        nickname: typeof modelItem.nickname === 'string' ? modelItem.nickname : null,
        oneLineIntro: typeof modelItem.oneLineIntro === 'string' ? modelItem.oneLineIntro : null,
        mainThumbnailUrl: typeof modelItem.mainThumbnailUrl === 'string' ? modelItem.mainThumbnailUrl : null,
        experienceYears: typeof modelItem.experienceYears === 'number' ? modelItem.experienceYears : null,
        detailedRegion: typeof modelItem.detailedRegion === 'string' ? modelItem.detailedRegion : null,
        height: typeof modelItem.height === 'number' ? modelItem.height : null,
        gender: typeof modelItem.gender === 'string' ? modelItem.gender : null,
        concept: typeof modelItem.concept === 'string' ? modelItem.concept : null,
        categories: Array.isArray(modelItem.categories) 
          ? modelItem.categories.filter((cat): cat is string => typeof cat === 'string')
          : typeof modelItem.categories === 'string'
          ? [modelItem.categories]
          : null,
      } as Model;
    }).filter((item): item is Model => item !== null);
  }

  return {
    ok: result.ok === true,
    items,
    currentPage: typeof result.currentPage === 'number' ? result.currentPage : 1,
    totalPages: typeof result.totalPages === 'number' ? result.totalPages : 1,
    totalItems: typeof result.totalItems === 'number' ? result.totalItems : 0,
  };
};

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

