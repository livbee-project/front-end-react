/**
 * Campaign API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { CampaignDetail, CampaignDetailResponse } from '@/domain/entities/Campaign';
import { mapPrefixToKorean, mapCategoryToKorean } from '@/shared/utils/campaignUtils';
import { convertKeysToCamelCase } from '@/shared/utils/caseConverter';
import { isObject } from '@/shared/utils/typeGuards';
import {
  getStringField,
  getNumberField,
  getBooleanField,
  getNullableField,
  getArrayField,
  getObjectField,
} from '@/data/mappers/mapperUtils';

/**
 * CampaignDetailResponse를 CampaignDetail로 변환
 * 백엔드가 snake_case로 응답하는 경우 camelCase로 변환
 */
export const transformCampaignDetailResponse = (
  result: unknown,
  id: string
): CampaignDetail => {
  // 백엔드 응답이 snake_case일 수 있으므로 camelCase로 변환
  let rawPayload: Record<string, unknown> = {};
  
  if (isObject(result)) {
    // CampaignDetailResponse 형식인 경우
    if ('data' in result && isObject(result.data)) {
      rawPayload = result.data as Record<string, unknown>;
    } else {
      // CampaignDetail 형식인 경우
      rawPayload = result as Record<string, unknown>;
    }
  }
  
  // snake_case를 camelCase로 변환
  const payload = convertKeysToCamelCase(rawPayload) as Partial<CampaignDetail> & Record<string, unknown>;

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
    productThumbnailUrl: null,
    productImageUrl: '',
    productName: null,
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

  const merged: CampaignDetail = {
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
  
  // 필드 매핑 (snake_case와 camelCase 모두 처리) - 유틸리티 함수 사용으로 중복 제거
  merged.brandName = getStringField(payload, 'brandName', '', 'brand_name');
  merged.brandIntroduction = getStringField(payload, 'brandIntroduction', '', 'brand_introduction');
  merged.title = getStringField(payload, 'title');
  merged.content = getStringField(payload, 'content');
  merged.detailedContent = getStringField(payload, 'detailedContent', '', 'detailed_content');
  
  // prefix 필드 처리 (타입 안전하게)
  const prefixValue = payload.prefix;
  if (prefixValue !== null && prefixValue !== undefined) {
    const prefixStr = String(prefixValue);
    merged.prefix = mapPrefixToKorean(prefixStr as CampaignDetailResponse['data']['prefix']);
  }
  
  merged.prefixName = getNullableField<string>(payload, 'prefixName', 'prefix_name');
  
  // category 필드 처리 (타입 안전하게)
  const categoryValue = payload.category;
  if (categoryValue !== null && categoryValue !== undefined) {
    const categoryStr = String(categoryValue);
    merged.category = mapCategoryToKorean(categoryStr as CampaignDetailResponse['data']['category']);
  }
  
  merged.categoryName = getNullableField<string>(payload, 'categoryName', 'category_name');
  merged.location = getNullableField<string>(payload, 'location');
  merged.shootDate = getStringField(payload, 'shootDate', '', 'shoot_date');
  merged.closeAt = getStringField(payload, 'closeAt', '', 'close_at');
  merged.durationHours = getNumberField(payload, 'durationHours', 0, 'duration_hours');
  merged.startTime = getStringField(payload, 'startTime', '', 'start_time');
  merged.endTime = getStringField(payload, 'endTime', '', 'end_time');
  merged.fee = getNullableField<number>(payload, 'fee');
  merged.feeNegotiable = getBooleanField(payload, 'feeNegotiable', false, 'fee_negotiable');
  merged.coverImageUrl = getNullableField<string>(payload, 'coverImageUrl', 'cover_image_url');
  merged.imageUrl = getStringField(payload, 'imageUrl', '', 'image_url');
  merged.thumbnailUrl = getStringField(payload, 'thumbnailUrl', '', 'thumbnail_url');
  merged.liveVerticalCoverUrl = getNullableField<string>(payload, 'liveVerticalCoverUrl', 'live_vertical_cover_url');
  merged.productThumbnailUrl = getNullableField<string>(payload, 'productThumbnailUrl', 'product_thumbnail_url');
  merged.productImageUrl = getStringField(payload, 'productImageUrl', '', 'product_image_url');
  merged.productName = getNullableField<string>(payload, 'productName', 'product_name');
  merged.recruitmentSection = getStringField(payload, 'recruitmentSection', '', 'recruitment_section');
  merged.qualifications = getArrayField<string>(payload, 'qualifications', []);
  merged.preferredQualifications = getArrayField<string>(payload, 'preferredQualifications', [], 'preferred_qualifications');
  merged.isPublic = getBooleanField(payload, 'isPublic', false, 'is_public');
  merged.createdAt = getStringField(payload, 'createdAt', '', 'created_at');
  merged.updatedAt = getStringField(payload, 'updatedAt', '', 'updated_at');
  merged.createdBy = getStringField(payload, 'createdBy', '', 'created_by');
  
  // metrics 객체 처리
  const metricsPayload = getObjectField<Record<string, unknown>>(
    payload,
    'metrics',
    { views: 0, clicks: 0, applications: 0 }
  );
  merged.metrics = {
    views: getNumberField(metricsPayload, 'views', 0),
    clicks: getNumberField(metricsPayload, 'clicks', 0),
    applications: getNumberField(metricsPayload, 'applications', 0),
  };
  
  merged.isApplied = getBooleanField(payload, 'isApplied', false, 'is_applied');

  return merged;
};

