import type { PortfolioDetail, PortfolioDetailResponse } from '@/domain/entities/Portfolio';
import type { NestedDataResponse } from '@/shared/types/api';
import { extractData } from '@/shared/utils/apiResponseHandler';

/**
 * PortfolioDetail 응답을 프론트엔드에서 사용하는 PortfolioDetail로 변환합니다.
 */
export const transformPortfolioDetailResponse = (
  result: unknown,
  id: string
): PortfolioDetail => {
  const data = extractData<PortfolioDetailResponse>(result);
  const responseData = data || (result as PortfolioDetailResponse);

  const nestedResponse = responseData as NestedDataResponse<PortfolioDetail>;
  const responseDataObj =
    nestedResponse.data && typeof nestedResponse.data === 'object' && !('data' in nestedResponse.data)
      ? nestedResponse.data
      : responseData;

  return {
    id: responseDataObj.id || id,
    user: responseDataObj.user,
    nickname: responseDataObj.nickname,
    oneLineIntro: responseDataObj.oneLineIntro,
    detailedIntro: responseDataObj.detailedIntro,
    experienceYears: responseDataObj.experienceYears,
    age: responseDataObj.age,
    mainThumbnailUrl: responseDataObj.mainThumbnailUrl,
    backgroundImageUrl: responseDataObj.backgroundImageUrl,
    subThumbnailUrls: responseDataObj.subThumbnailUrls,
    status: responseDataObj.status,
    isAgePublic: responseDataObj.isAgePublic,
    detailedRegion: responseDataObj.detailedRegion,
    gender: responseDataObj.gender,
    height: responseDataObj.height,
    weight: responseDataObj.weight,
    topSize: responseDataObj.topSize,
    bottomSize: responseDataObj.bottomSize,
    shoeSize: responseDataObj.shoeSize,
    isSizingPublic: responseDataObj.isSizingPublic,
    websiteUrl: responseDataObj.websiteUrl,
    instagramUrl: responseDataObj.instagramUrl,
    youtubeUrl: responseDataObj.youtubeUrl,
    tiktokUrl: responseDataObj.tiktokUrl,
    publicScope: responseDataObj.publicScope,
    isReceivingOffers: responseDataObj.isReceivingOffers,
    recentLives: responseDataObj.recentLives,
    attachedFileUrl: responseDataObj.attachedFileUrl,
    createdAt: responseDataObj.createdAt,
    updatedAt: responseDataObj.updatedAt,
  };
};

