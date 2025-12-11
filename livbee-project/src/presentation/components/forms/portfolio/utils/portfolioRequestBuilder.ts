import type { CreatePortfolioRequest } from '@/domain/entities/Portfolio';
import type { PortfolioFormData } from '../types';

/**
 * 숫자 문자열을 파싱하여 숫자로 변환 (NaN인 경우 undefined 반환)
 */
const parseNumber = (value: string): number | undefined => {
  const num = parseFloat(value.trim());
  return Number.isNaN(num) ? undefined : num;
};

/**
 * 포트폴리오 생성 요청 객체 생성
 */
export const buildPortfolioRequest = (
  formData: PortfolioFormData,
  uploadedMainThumbnailUrl?: string,
  uploadedGalleryUrls: string[] = [],
  uploadedAttachedFileUrl?: string
): CreatePortfolioRequest => {
  const websiteUrl = formData.websites[0]?.trim() || undefined;
  const instagramUrl = formData.websites[1]?.trim() || undefined;
  const tiktokUrl = formData.websites[2]?.trim() || undefined;

  const trimmedRecentLive = formData.recentLiveLink.trim();
  const recentLives = trimmedRecentLive
    ? [
        {
          url: trimmedRecentLive,
          title: undefined,
          date: undefined,
        },
      ]
    : undefined;

  // 태그 정보 파싱 (숫자만 추출)
  const height = parseNumber(formData.tags[0] || '');
  const weight = parseNumber(formData.tags[1] || '');
  const topSize = formData.tags[2]?.trim() || undefined;
  const experienceYears = parseNumber(formData.tags[3] || '');
  const age = parseNumber(formData.tags[4] || '');

  // 필수 필드는 validation을 통과했으므로 반드시 값이 있음
  const trimmedName = formData.name.trim();
  const trimmedRegistrationType = formData.registrationType.trim();
  
  if (!trimmedName || !trimmedRegistrationType) {
    throw new Error('필수 필드(nickname, registrationType)가 누락되었습니다.');
  }

  const request = {
    nickname: trimmedName,
    oneLineIntro: formData.oneLineIntro.trim() || undefined,
    detailedIntro: formData.detailedIntro.trim() || undefined,
    mainThumbnailUrl: uploadedMainThumbnailUrl,
    subThumbnailUrls: uploadedGalleryUrls.length > 0 ? uploadedGalleryUrls : undefined,
    websiteUrl,
    instagramUrl,
    tiktokUrl,
    contact: formData.contact.trim() || undefined,
    openChat: formData.openChat.trim() || undefined,
    registrationType: trimmedRegistrationType,
    recentLives,
    attachedFileUrl: uploadedAttachedFileUrl,
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
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0f91d27f-d165-4cdf-82ab-ecb2f2648200',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'portfolioRequestBuilder.ts:75',message:'요청 객체 생성 완료',data:{requestKeys:Object.keys(request),hasNickname:!!request.nickname,hasRegistrationType:!!request.registrationType,hasMainThumbnail:!!request.mainThumbnailUrl,subThumbnailCount:request.subThumbnailUrls?.length||0,undefinedFields:Object.entries(request).filter(([,v])=>v===undefined).map(([k])=>k)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
  // #endregion
  
  return request;
};

