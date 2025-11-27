import type { ModelDetail, ModelDetailResponse } from '@/domain/entities/Model';
import type { NestedDataResponse } from '@/shared/types/api';
import { extractData } from '@/shared/utils/apiResponseHandler';

/**
 * ModelDetail 응답을 프론트엔드에서 사용하는 ModelDetail로 변환합니다.
 */
export const transformModelDetailResponse = (
  result: unknown,
  id: string
): ModelDetail => {
  const data = extractData<ModelDetailResponse>(result);
  const responseData = data || (result as ModelDetailResponse);

  const nestedResponse = responseData as NestedDataResponse<ModelDetail>;
  const responseDataObj =
    nestedResponse.data && typeof nestedResponse.data === 'object' && !('data' in nestedResponse.data)
      ? nestedResponse.data
      : responseData;

  return {
    id: responseDataObj.id || (responseDataObj as { _id?: string })?._id || id,
    user: responseDataObj.user,
    nickname: responseDataObj.nickname,
    oneLineIntro: responseDataObj.oneLineIntro,
    detailedIntro: responseDataObj.detailedIntro,
    experienceYears: responseDataObj.experienceYears,
    age: responseDataObj.age,
    isAgePublic: responseDataObj.isAgePublic,
    mainThumbnailUrl: responseDataObj.mainThumbnailUrl,
    backgroundImageUrl: responseDataObj.backgroundImageUrl,
    subThumbnailUrls: responseDataObj.subThumbnailUrls,
    status: responseDataObj.status,
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
    attachedFileUrl: responseDataObj.attachedFileUrl,
    createdAt: responseDataObj.createdAt,
    updatedAt: responseDataObj.updatedAt,
  };
};

