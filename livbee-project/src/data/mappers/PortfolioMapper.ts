/**
 * Portfolio API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { Portfolio, PortfolioDetail, PortfolioListResponse } from '@/domain/entities/Portfolio';
import { isObject } from '@/shared/utils/typeGuards';

/**
 * Portfolio 목록 응답을 변환합니다.
 * API 응답의 _id를 id로 변환합니다.
 */
export const transformPortfolioListResponse = (response: unknown): PortfolioListResponse => {
  if (!isObject(response)) {
    return {
      ok: false,
      items: [],
    };
  }

  const result = response as Partial<PortfolioListResponse> & Record<string, unknown>;

  // items 배열 변환
  let items: Portfolio[] = [];
  if (Array.isArray(result.items)) {
    items = result.items.map((item: unknown) => {
      if (!isObject(item)) {
        return null;
      }
      const portfolioItem = item as Partial<Portfolio> & Record<string, unknown>;
      
      // _id를 id로 변환
      const id = typeof portfolioItem.id === 'string' && portfolioItem.id
        ? portfolioItem.id
        : typeof portfolioItem._id === 'string' && portfolioItem._id
        ? portfolioItem._id
        : '';

      return {
        id,
        nickname: typeof portfolioItem.nickname === 'string' ? portfolioItem.nickname : null,
        oneLineIntro: typeof portfolioItem.oneLineIntro === 'string' ? portfolioItem.oneLineIntro : null,
        mainThumbnailUrl: typeof portfolioItem.mainThumbnailUrl === 'string' ? portfolioItem.mainThumbnailUrl : null,
        experienceYears: typeof portfolioItem.experienceYears === 'number' ? portfolioItem.experienceYears : null,
        detailedRegion: typeof portfolioItem.detailedRegion === 'string' ? portfolioItem.detailedRegion : null,
        height: typeof portfolioItem.height === 'number' ? portfolioItem.height : null,
      } as Portfolio;
    }).filter((item): item is Portfolio => item !== null);
  }

  return {
    ok: result.ok === true,
    items,
    currentPage: typeof result.currentPage === 'number' ? result.currentPage : undefined,
    totalPages: typeof result.totalPages === 'number' ? result.totalPages : undefined,
    totalItems: typeof result.totalItems === 'number' ? result.totalItems : undefined,
  };
};

/**
 * PortfolioDetail 응답을 프론트엔드에서 사용하는 PortfolioDetail로 변환합니다.
 */
export const transformPortfolioDetailResponse = (
  result: unknown,
  id: string
): PortfolioDetail => {
  let payload: Partial<PortfolioDetail> & Record<string, unknown> = {};
  
  if (isObject(result)) {
    // PortfolioDetailResponse 형식인 경우
    if ('data' in result && isObject(result.data)) {
      payload = result.data as Partial<PortfolioDetail> & Record<string, unknown>;
    } else {
      // PortfolioDetail 형식인 경우
      payload = result as Partial<PortfolioDetail> & Record<string, unknown>;
    }
  }

  const baseDetail: PortfolioDetail = {
    id,
    user: '',
    nickname: null,
    oneLineIntro: null,
    detailedIntro: null,
    experienceYears: null,
    age: null,
    mainThumbnailUrl: null,
    backgroundImageUrl: null,
    subThumbnailUrls: [],
    status: '',
    isAgePublic: false,
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
    recentLives: [],
    attachedFileUrl: null,
    createdAt: '',
    updatedAt: '',
  };

  const merged: PortfolioDetail = {
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

