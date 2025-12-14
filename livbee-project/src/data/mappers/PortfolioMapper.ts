/**
 * Portfolio API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { PortfolioDetail, PortfolioDetailResponse } from '@/domain/entities/Portfolio';
import { isObject } from '@/shared/utils/typeGuards';

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
  } else {
    merged.id = id;
  }
  
  // 나머지 필드 병합 (타입 안전하게)
  Object.assign(merged, payload);

  return merged;
};

