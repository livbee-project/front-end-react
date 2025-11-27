/**
 * Campaign API 응답 변환 유틸리티
 */

import type { CampaignDetail, CampaignDetailResponse } from '@/domain/entities/Campaign';
import { mapPrefixToKorean, mapCategoryToKorean } from '@/shared/utils/campaignUtils';

/**
 * CampaignDetailResponse를 CampaignDetail로 변환
 */
export const transformCampaignDetailResponse = (
  result: unknown,
  id: string
): CampaignDetail => {
  const payload =
    ((result as CampaignDetailResponse)?.data ??
      (result as CampaignDetail) ??
      {}) as Partial<CampaignDetail> & Record<string, unknown>;

  const baseDetail: CampaignDetail = {
    id,
    brandName: '',
    prefix: null,
    prefixName: null,
    title: '',
    content: '',
    detailedContent: '',
    category: null,
    categoryName: null,
    location: null,
    shootDate: '',
    closeAt: '',
    durationHours: 0,
    startTime: '',
    endTime: '',
    fee: null,
    feeNegotiable: false,
    coverImageUrl: null,
    imageUrl: '',
    thumbnailUrl: '',
    liveVerticalCoverUrl: null,
    liveStreamUrl: null,
    productThumbnailUrl: null,
    productImageUrl: '',
    productName: null,
    productUrl: null,
    brandIntroduction: '',
    recruitmentSection: '',
    qualifications: [],
    preferredQualifications: [],
    isPublic: false,
    createdAt: '',
    updatedAt: '',
    createdBy: '',
    metrics: {
      views: 0,
      clicks: 0,
      applications: 0,
    },
    isApplied: false,
  };

  const merged = {
    ...baseDetail,
    ...(payload as Partial<CampaignDetail>),
  };

  merged.id = (typeof payload.id === 'string' && payload.id) || (typeof payload._id === 'string' && payload._id) || id;
  if (typeof payload.brandName === 'string') {
    merged.brandName = payload.brandName;
  }
  if (payload.prefix) {
    merged.prefix = mapPrefixToKorean(payload.prefix as CampaignDetailResponse['data']['prefix']);
  }
  if (payload.category) {
    merged.category = mapCategoryToKorean(payload.category as CampaignDetailResponse['data']['category']);
  }

  return merged;
};

