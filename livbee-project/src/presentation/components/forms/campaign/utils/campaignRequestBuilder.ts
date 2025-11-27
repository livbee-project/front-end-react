import type { CreateCampaignRequest } from '@/domain/entities/Campaign';
import type { CampaignFormData } from '../types';

/**
 * 모집구분을 영문 코드로 변환
 */
const mapRecruitmentType = (type: CampaignFormData['recruitmentType']): 'showhost' | 'staff' | 'model' | 'other' => {
  const typeMap: Record<string, 'showhost' | 'staff' | 'model' | 'other'> = {
    store: 'showhost',
    showhost: 'showhost',
    model: 'model',
    staff: 'staff',
    other: 'other',
  };
  return typeMap[type] || 'showhost';
};

/**
 * 날짜 문자열을 ISO 8601 형식으로 변환
 */
const convertToISO8601 = (dateString: string): string => {
  if (!dateString) return '';
  return `${dateString}T00:00:00.000Z`;
};

/**
 * 캠페인 생성 요청 객체 생성
 */
export const buildCampaignRequest = (
  formData: CampaignFormData,
  uploadedCoverImageUrl?: string,
  uploadedProductImageUrl?: string,
  uploadedLiveCoverImageUrl?: string
): CreateCampaignRequest => {
  return {
    brandName: formData.brandName.trim(),
    title: formData.title.trim(),
    content: formData.content.trim() || undefined,
    detailedContent: formData.detailedContent.trim() || undefined,
    prefix: mapRecruitmentType(formData.recruitmentType),
    category: formData.category as CreateCampaignRequest['category'],
    location: formData.location.trim() || undefined,
    shootDate: convertToISO8601(formData.filmingDate),
    closeAt: convertToISO8601(formData.deadline),
    startTime: formData.startTime || undefined,
    endTime: formData.endTime || undefined,
    productName: formData.productName.trim() || undefined,
    coverImageUrl: uploadedCoverImageUrl,
    productThumbnailUrl: uploadedProductImageUrl,
    liveVerticalCoverUrl: uploadedLiveCoverImageUrl,
    isPublic: true,
  };
};

