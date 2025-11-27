import type { CreatePortfolioRequest } from '@/domain/entities/Portfolio';
import type { PortfolioFormData } from '../types';

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
  const youtubeUrl = formData.websites[2]?.trim() || undefined;

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

  return {
    nickname: formData.name.trim() || undefined,
    oneLineIntro: formData.oneLineIntro.trim() || undefined,
    detailedIntro: formData.detailedIntro.trim() || undefined,
    mainThumbnailUrl: uploadedMainThumbnailUrl,
    subThumbnailUrls: uploadedGalleryUrls.length > 0 ? uploadedGalleryUrls : undefined,
    websiteUrl,
    instagramUrl,
    youtubeUrl,
    recentLives,
    attachedFileUrl: uploadedAttachedFileUrl,
    status: 'published',
    publicScope: '전체공개',
    isAgePublic: true,
    isSizingPublic: true,
    isReceivingOffers: true,
  };
};

