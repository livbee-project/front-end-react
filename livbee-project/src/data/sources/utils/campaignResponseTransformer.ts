/**
 * Campaign API 응답 변환 유틸리티
 */

import type { CampaignDetail, CampaignDetailResponse } from '@/domain/entities/Campaign';
import type { NestedDataResponse } from '@/shared/types/api';
import { mapPrefixToKorean, mapCategoryToKorean } from '@/shared/utils/campaignUtils';
import { extractData } from '@/shared/utils/apiResponseHandler';

/**
 * CampaignDetailResponse를 CampaignDetail로 변환
 */
export const transformCampaignDetailResponse = (
  result: unknown,
  id: string
): CampaignDetail => {
  // FastAPI 응답 형식: { ok: true, data: {...} } 또는 { success: true, data: {...} }
  const data = extractData<CampaignDetailResponse>(result);
  const responseData = data || (result as CampaignDetailResponse);

  // API 응답을 프론트엔드 타입으로 변환
  const nestedResponse = responseData as NestedDataResponse<CampaignDetail>;
  const responseDataObj = (nestedResponse.data && typeof nestedResponse.data === 'object' && !('data' in nestedResponse.data))
    ? nestedResponse.data
    : responseData;

  const campaignDetail: CampaignDetail = {
    id: responseDataObj.id || responseDataObj._id || id,
    brandName: responseDataObj.brandName,
    prefix: mapPrefixToKorean(responseDataObj.prefix),
    prefixName: responseDataObj.prefixName,
    title: responseDataObj.title,
    content: responseDataObj.content,
    detailedContent: responseDataObj.detailedContent,
    category: mapCategoryToKorean(responseDataObj.category),
    categoryName: responseDataObj.categoryName,
    location: responseDataObj.location,
    shootDate: responseDataObj.shootDate,
    closeAt: responseDataObj.closeAt,
    durationHours: responseDataObj.durationHours,
    startTime: responseDataObj.startTime,
    endTime: responseDataObj.endTime,
    fee: responseDataObj.fee,
    feeNegotiable: responseDataObj.feeNegotiable,
    coverImageUrl: responseDataObj.coverImageUrl,
    imageUrl: responseDataObj.imageUrl,
    thumbnailUrl: responseDataObj.thumbnailUrl,
    liveVerticalCoverUrl: responseDataObj.liveVerticalCoverUrl,
    liveStreamUrl: responseDataObj.liveStreamUrl,
    productThumbnailUrl: responseDataObj.productThumbnailUrl,
    productImageUrl: responseDataObj.productImageUrl,
    productName: responseDataObj.productName,
    productUrl: responseDataObj.productUrl,
    brandIntroduction: responseDataObj.brandIntroduction,
    recruitmentSection: responseDataObj.recruitmentSection,
    qualifications: responseDataObj.qualifications,
    preferredQualifications: responseDataObj.preferredQualifications,
    isPublic: responseDataObj.isPublic,
    createdAt: responseDataObj.createdAt,
    updatedAt: responseDataObj.updatedAt,
    createdBy: responseDataObj.createdBy,
    metrics: responseDataObj.metrics,
    isApplied: responseDataObj.isApplied,
  };

  return campaignDetail;
};

