import type { CreateCampaignRequest } from '@/domain/entities/Campaign';
import type { CampaignFormData } from '../types';
import { mapRecruitmentType } from '../config/recruitmentTypeConfig';

/**
 * 날짜 문자열을 YYYY-MM-DD 형식으로 변환 (백엔드 date 타입에 맞춤)
 */
const convertToDateString = (dateString: string): string => {
  if (!dateString) return '';
  // 이미 YYYY-MM-DD 형식이면 그대로 반환
  // ISO 8601 형식이면 날짜 부분만 추출
  const dateOnly = dateString.split('T')[0];
  return dateOnly;
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
  // 수당 문자열을 숫자로 변환 (빈 문자열이면 undefined)
  const feeNumber = formData.fee.trim() ? Number(formData.fee.trim().replace(/,/g, '')) : undefined;
  const fee = feeNumber && !isNaN(feeNumber) ? feeNumber : undefined;

  return {
    brandName: formData.brandName.trim(),
    brandIntroduction: formData.brandIntroduction.trim() || undefined,
    title: formData.title.trim(),
    content: formData.content.trim() || undefined,
    detailedContent: formData.detailedContent.trim() || undefined,
    prefix: mapRecruitmentType(formData.recruitmentType),
    category: formData.category as CreateCampaignRequest['category'],
    location: formData.location.trim() || undefined,
    shootDate: convertToDateString(formData.filmingDate),
    closeAt: convertToDateString(formData.deadline),
    startTime: formData.startTime || '',
    endTime: formData.endTime || '',
    productName: formData.productName.trim() || undefined,
    fee,
    feeNegotiable: formData.feeNegotiable,
    coverImageUrl: uploadedCoverImageUrl,
    productThumbnailUrl: uploadedProductImageUrl,
    liveVerticalCoverUrl: uploadedLiveCoverImageUrl,
    isPublic: true,
  };
};

