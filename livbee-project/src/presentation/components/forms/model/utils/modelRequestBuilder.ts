import type { CreateModelRequest } from '@/domain/entities/Model';
import type { ModelFormData } from '@/presentation/components/forms/model/types';

/**
 * 숫자 문자열을 파싱하여 숫자로 변환 (NaN인 경우 undefined 반환)
 */
const parseNumber = (value: string | undefined | null): number | undefined => {
  if (!value) return undefined;
  const num = parseFloat(value.trim());
  return Number.isNaN(num) ? undefined : num;
};

/**
 * 안전하게 문자열을 trim하고 빈 문자열인 경우 undefined 반환
 */
const safeTrim = (value: string | undefined | null): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed === '' ? undefined : trimmed;
};

/**
 * 모델 생성 요청 객체 생성
 */
export const buildModelRequest = (
  formData: ModelFormData,
  uploadedMainThumbnailUrl?: string,
  uploadedGalleryUrls: string[] = [],
  uploadedPortfolioFileUrl?: string
): CreateModelRequest => {
  const websiteUrl = safeTrim(formData.websites[0]?.content);
  const instagramUrl = safeTrim(formData.websites[1]?.content);
  const tiktokUrl = safeTrim(formData.websites[2]?.content);

  const height = parseNumber(formData.tags[0]?.value);
  const weight = parseNumber(formData.tags[1]?.value);
  const topSize = safeTrim(formData.tags[2]?.value);
  const experienceYears = parseNumber(formData.tags[3]?.value);
  const age = parseNumber(formData.tags[4]?.value);

  const request: CreateModelRequest = {
    nickname: safeTrim(formData.name),
    oneLineIntro: safeTrim(formData.oneLineIntro),
    detailedIntro: safeTrim(formData.detailedIntro),
    mainThumbnailUrl: uploadedMainThumbnailUrl,
    subThumbnailUrls: uploadedGalleryUrls.length > 0 ? uploadedGalleryUrls : undefined,
    websiteUrl,
    instagramUrl,
    tiktokUrl,
    contact: safeTrim(formData.contact),
    openChat: safeTrim(formData.openChat),
    registrationType: safeTrim(formData.registrationType),
    attachedFileUrl: uploadedPortfolioFileUrl,
    height,
    weight,
    topSize,
    experienceYears,
    age,
    status: 'published',
    publicScope: '전체공개',
    isAgePublic: true,
    isSizingPublic: true,
    isReceivingOffers: true,
  };

  return request;
};

