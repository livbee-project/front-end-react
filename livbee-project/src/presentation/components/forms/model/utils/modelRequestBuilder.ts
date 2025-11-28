import type { CreateModelRequest } from '@/domain/entities/Model';
import type { ModelFormData } from '../types';

/**
 * 숫자 문자열을 파싱하여 숫자로 변환 (NaN인 경우 undefined 반환)
 */
const parseNumber = (value: string): number | undefined => {
  const num = parseFloat(value.trim());
  return Number.isNaN(num) ? undefined : num;
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
  const websiteUrl = formData.websites[0]?.content.trim() || undefined;
  const instagramUrl = formData.websites[1]?.content.trim() || undefined;
  const tiktokUrl = formData.websites[2]?.content.trim() || undefined;

  const height = parseNumber(formData.tags[0]?.value || '');
  const weight = parseNumber(formData.tags[1]?.value || '');
  const topSize = formData.tags[2]?.value.trim() || undefined;
  const experienceYears = parseNumber(formData.tags[3]?.value || '');
  const age = parseNumber(formData.tags[4]?.value || '');

  return {
    nickname: formData.name.trim() || undefined,
    oneLineIntro: formData.oneLineIntro.trim() || undefined,
    detailedIntro: formData.detailedIntro.trim() || undefined,
    mainThumbnailUrl: uploadedMainThumbnailUrl,
    subThumbnailUrls: uploadedGalleryUrls.length > 0 ? uploadedGalleryUrls : undefined,
    websiteUrl,
    instagramUrl,
    tiktokUrl,
    contact: formData.contact.trim() || undefined,
    openChat: formData.openChat.trim() || undefined,
    registrationType: formData.registrationType.trim() || undefined,
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
};

