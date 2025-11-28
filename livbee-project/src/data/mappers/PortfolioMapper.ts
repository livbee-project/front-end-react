/**
 * Portfolio API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { PortfolioDetail, PortfolioDetailResponse } from '@/domain/entities/Portfolio';

/**
 * PortfolioDetail 응답을 프론트엔드에서 사용하는 PortfolioDetail로 변환합니다.
 */
export const transformPortfolioDetailResponse = (
  result: unknown,
  id: string
): PortfolioDetail => {
  const payload =
    ((result as PortfolioDetailResponse)?.data ??
      (result as PortfolioDetail) ??
      {}) as Partial<PortfolioDetail> & Record<string, unknown>;

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

  const merged = {
    ...baseDetail,
    ...(payload as Partial<PortfolioDetail>),
  };

  merged.id = (typeof payload.id === 'string' && payload.id) || id;

  return merged;
};

