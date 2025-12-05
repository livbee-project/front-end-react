import { useMemo } from 'react';
import { useImageGallery } from '@/presentation/hooks/useImageGallery';
import { extractCategories, generateProfileTags } from '@/shared/utils/detailPageUtils';

interface ProfileDetailData {
  nickname?: string | null;
  oneLineIntro?: string | null;
  detailedIntro?: string | null;
  mainThumbnailUrl?: string | null;
  height?: number | null;
  weight?: number | null;
  topSize?: string | null;
  experienceYears?: number | null;
  isSizingPublic?: boolean;
  isReceivingOffers?: boolean;
  subThumbnailUrls?: string[];
  websiteUrl?: string | null;
  instagramUrl?: string | null;
}

interface UseProfileDetailPageOptions {
  data: ProfileDetailData | null;
  defaultData: ProfileDetailData;
}

/**
 * 프로필 상세 페이지의 공통 로직을 처리하는 훅
 */
export const useProfileDetailPage = <T extends ProfileDetailData>({
  data,
  defaultData,
}: UseProfileDetailPageOptions) => {
  const displayData = (data || defaultData) as T;

  const gallery = useImageGallery(displayData.subThumbnailUrls ?? []);

  const categories = useMemo(() => {
    if (!displayData.oneLineIntro) {
      return ['패션', '뷰티'];
    }
    const extracted = extractCategories({ description: displayData.oneLineIntro });
    return extracted.length > 0 ? extracted : ['패션', '뷰티'];
  }, [displayData.oneLineIntro]);

  const tags = useMemo(() => {
    return generateProfileTags({
      height: displayData.height,
      weight: displayData.weight,
      topSize: displayData.topSize,
      experienceYears: displayData.experienceYears,
      isSizingPublic: displayData.isSizingPublic,
    });
  }, [displayData]);

  const websiteUrl = useMemo(() => {
    return displayData.websiteUrl || displayData.instagramUrl || null;
  }, [displayData.websiteUrl, displayData.instagramUrl]);

  return {
    displayData,
    gallery,
    categories,
    tags,
    websiteUrl,
  };
};

