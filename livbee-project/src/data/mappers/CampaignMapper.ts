/**
 * Campaign API 응답 변환 Mapper
 * Clean Architecture: Data Layer - Mapper
 */

import type { CampaignDetail, CampaignDetailResponse } from '@/domain/entities/Campaign';
import { mapPrefixToKorean, mapCategoryToKorean } from '@/shared/utils/campaignUtils';
import { convertKeysToCamelCase } from '@/shared/utils/caseConverter';

/**
 * CampaignDetailResponse를 CampaignDetail로 변환
 * 백엔드가 snake_case로 응답하는 경우 camelCase로 변환
 */
export const transformCampaignDetailResponse = (
  result: unknown,
  id: string
): CampaignDetail => {
  // 백엔드 응답이 snake_case일 수 있으므로 camelCase로 변환
  const rawPayload =
    ((result as CampaignDetailResponse)?.data ??
      (result as CampaignDetail) ??
      {}) as Record<string, unknown>;
  
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

  const merged = {
    ...baseDetail,
    ...(payload as Partial<CampaignDetail>),
  };

  merged.id = (typeof payload.id === 'string' && payload.id) || (typeof payload._id === 'string' && payload._id) || id;
  
  // 필드 매핑 (snake_case와 camelCase 모두 처리)
  if (typeof payload.brandName === 'string' || typeof (payload as Record<string, unknown>).brand_name === 'string') {
    merged.brandName = (payload.brandName as string) || ((payload as Record<string, unknown>).brand_name as string) || '';
  }
  
  if (typeof payload.brandIntroduction === 'string' || typeof (payload as Record<string, unknown>).brand_introduction === 'string') {
    merged.brandIntroduction = (payload.brandIntroduction as string) || ((payload as Record<string, unknown>).brand_introduction as string) || '';
  }
  
  if (typeof payload.title === 'string') {
    merged.title = payload.title;
  }
  
  if (typeof payload.content === 'string') {
    merged.content = payload.content;
  }
  
  if (typeof payload.detailedContent === 'string' || typeof (payload as Record<string, unknown>).detailed_content === 'string') {
    merged.detailedContent = (payload.detailedContent as string) || ((payload as Record<string, unknown>).detailed_content as string) || '';
  }
  
  if (payload.prefix) {
    merged.prefix = mapPrefixToKorean(payload.prefix as CampaignDetailResponse['data']['prefix']);
  }
  
  if (payload.prefixName || (payload as Record<string, unknown>).prefix_name) {
    merged.prefixName = (payload.prefixName as string) || ((payload as Record<string, unknown>).prefix_name as string) || null;
  }
  
  if (payload.category) {
    merged.category = mapCategoryToKorean(payload.category as CampaignDetailResponse['data']['category']);
  }
  
  if (payload.categoryName || (payload as Record<string, unknown>).category_name) {
    merged.categoryName = (payload.categoryName as string) || ((payload as Record<string, unknown>).category_name as string) || null;
  }
  
  if (typeof payload.location === 'string' || typeof (payload as Record<string, unknown>).location === 'string') {
    merged.location = (payload.location as string) || ((payload as Record<string, unknown>).location as string) || null;
  }
  
  if (typeof payload.shootDate === 'string' || typeof (payload as Record<string, unknown>).shoot_date === 'string') {
    merged.shootDate = (payload.shootDate as string) || ((payload as Record<string, unknown>).shoot_date as string) || '';
  }
  
  if (typeof payload.closeAt === 'string' || typeof (payload as Record<string, unknown>).close_at === 'string') {
    merged.closeAt = (payload.closeAt as string) || ((payload as Record<string, unknown>).close_at as string) || '';
  }
  
  if (typeof payload.durationHours === 'number' || typeof (payload as Record<string, unknown>).duration_hours === 'number') {
    merged.durationHours = (payload.durationHours as number) || ((payload as Record<string, unknown>).duration_hours as number) || 0;
  }
  
  if (typeof payload.startTime === 'string' || typeof (payload as Record<string, unknown>).start_time === 'string') {
    merged.startTime = (payload.startTime as string) || ((payload as Record<string, unknown>).start_time as string) || '';
  }
  
  if (typeof payload.endTime === 'string' || typeof (payload as Record<string, unknown>).end_time === 'string') {
    merged.endTime = (payload.endTime as string) || ((payload as Record<string, unknown>).end_time as string) || '';
  }
  
  if (typeof payload.fee === 'number' || typeof (payload as Record<string, unknown>).fee === 'number' || payload.fee === null) {
    merged.fee = (payload.fee as number | null) || ((payload as Record<string, unknown>).fee as number | null) || null;
  }
  
  if (typeof payload.feeNegotiable === 'boolean' || typeof (payload as Record<string, unknown>).fee_negotiable === 'boolean') {
    merged.feeNegotiable = (payload.feeNegotiable as boolean) ?? ((payload as Record<string, unknown>).fee_negotiable as boolean) ?? false;
  }
  
  if (typeof payload.coverImageUrl === 'string' || typeof (payload as Record<string, unknown>).cover_image_url === 'string' || payload.coverImageUrl === null) {
    merged.coverImageUrl = (payload.coverImageUrl as string | null) || ((payload as Record<string, unknown>).cover_image_url as string | null) || null;
  }
  
  if (typeof payload.imageUrl === 'string' || typeof (payload as Record<string, unknown>).image_url === 'string') {
    merged.imageUrl = (payload.imageUrl as string) || ((payload as Record<string, unknown>).image_url as string) || '';
  }
  
  if (typeof payload.thumbnailUrl === 'string' || typeof (payload as Record<string, unknown>).thumbnail_url === 'string') {
    merged.thumbnailUrl = (payload.thumbnailUrl as string) || ((payload as Record<string, unknown>).thumbnail_url as string) || '';
  }
  
  if (typeof payload.liveVerticalCoverUrl === 'string' || typeof (payload as Record<string, unknown>).live_vertical_cover_url === 'string' || payload.liveVerticalCoverUrl === null) {
    merged.liveVerticalCoverUrl = (payload.liveVerticalCoverUrl as string | null) || ((payload as Record<string, unknown>).live_vertical_cover_url as string | null) || null;
  }
  
  if (typeof payload.productThumbnailUrl === 'string' || typeof (payload as Record<string, unknown>).product_thumbnail_url === 'string' || payload.productThumbnailUrl === null) {
    merged.productThumbnailUrl = (payload.productThumbnailUrl as string | null) || ((payload as Record<string, unknown>).product_thumbnail_url as string | null) || null;
  }
  
  if (typeof payload.productImageUrl === 'string' || typeof (payload as Record<string, unknown>).product_image_url === 'string') {
    merged.productImageUrl = (payload.productImageUrl as string) || ((payload as Record<string, unknown>).product_image_url as string) || '';
  }
  
  if (typeof payload.productName === 'string' || typeof (payload as Record<string, unknown>).product_name === 'string' || payload.productName === null) {
    merged.productName = (payload.productName as string | null) || ((payload as Record<string, unknown>).product_name as string | null) || null;
  }
  
  if (typeof payload.recruitmentSection === 'string' || typeof (payload as Record<string, unknown>).recruitment_section === 'string') {
    merged.recruitmentSection = (payload.recruitmentSection as string) || ((payload as Record<string, unknown>).recruitment_section as string) || '';
  }
  
  if (Array.isArray(payload.qualifications) || Array.isArray((payload as Record<string, unknown>).qualifications)) {
    merged.qualifications = (payload.qualifications as string[]) || ((payload as Record<string, unknown>).qualifications as string[]) || [];
  }
  
  if (Array.isArray(payload.preferredQualifications) || Array.isArray((payload as Record<string, unknown>).preferred_qualifications)) {
    merged.preferredQualifications = (payload.preferredQualifications as string[]) || ((payload as Record<string, unknown>).preferred_qualifications as string[]) || [];
  }
  
  if (typeof payload.isPublic === 'boolean' || typeof (payload as Record<string, unknown>).is_public === 'boolean') {
    merged.isPublic = (payload.isPublic as boolean) ?? ((payload as Record<string, unknown>).is_public as boolean) ?? false;
  }
  
  if (typeof payload.createdAt === 'string' || typeof (payload as Record<string, unknown>).created_at === 'string') {
    merged.createdAt = (payload.createdAt as string) || ((payload as Record<string, unknown>).created_at as string) || '';
  }
  
  if (typeof payload.updatedAt === 'string' || typeof (payload as Record<string, unknown>).updated_at === 'string') {
    merged.updatedAt = (payload.updatedAt as string) || ((payload as Record<string, unknown>).updated_at as string) || '';
  }
  
  if (typeof payload.createdBy === 'string' || typeof (payload as Record<string, unknown>).created_by === 'string') {
    merged.createdBy = (payload.createdBy as string) || ((payload as Record<string, unknown>).created_by as string) || '';
  }
  
  if (payload.metrics && typeof payload.metrics === 'object') {
    const metrics = payload.metrics as Record<string, unknown>;
    merged.metrics = {
      views: (typeof metrics.views === 'number' ? metrics.views : 0) || (typeof (metrics as Record<string, unknown>).views === 'number' ? (metrics as Record<string, unknown>).views as number : 0) || 0,
      clicks: (typeof metrics.clicks === 'number' ? metrics.clicks : 0) || (typeof (metrics as Record<string, unknown>).clicks === 'number' ? (metrics as Record<string, unknown>).clicks as number : 0) || 0,
      applications: (typeof metrics.applications === 'number' ? metrics.applications : 0) || (typeof (metrics as Record<string, unknown>).applications === 'number' ? (metrics as Record<string, unknown>).applications as number : 0) || 0,
    };
  }
  
  if (typeof payload.isApplied === 'boolean' || typeof (payload as Record<string, unknown>).is_applied === 'boolean') {
    merged.isApplied = (payload.isApplied as boolean) ?? ((payload as Record<string, unknown>).is_applied as boolean) ?? false;
  }

  return merged;
};

