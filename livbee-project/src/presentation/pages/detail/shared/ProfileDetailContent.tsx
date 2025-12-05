import React from 'react';
import styled from 'styled-components';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';
import ProfileSection from '@/presentation/components/detail/common/ProfileSection';
import HomeSectionHeader from '@/presentation/components/home/sections/HomeSectionHeader';
import GalleryGrid from '@/presentation/components/detail/common/GalleryGrid';
import ActionSection from '@/presentation/components/detail/common/ActionSection';
import GalleryLightbox from '@/presentation/components/detail/common/GalleryLightbox';
import type { ImageGallery } from '@/presentation/hooks/useImageGallery';

const GallerySection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const GalleryHeaderWrapper = styled.div`
  padding: 0 16px;
  
  /* HomeSectionHeader 내부 HeaderWrapper의 margin 오버라이드 */
  > * {
    margin: ${({ theme }) => `${theme.spacing['2xl']} 0 ${theme.spacing.xl}`} !important;
  }
`;

const GalleryWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  margin-left: -16px;
  margin-right: -16px;
`;

interface ProfileDetailContentProps {
  title: string;
  name: string;
  description: string;
  detailedIntro: string;
  profileImageUrl: string;
  type: 'model' | 'showhost';
  categories: string[];
  tags: string[];
  websiteUrl: string;
  galleryImages: string[];
  defaultGalleryImages: string[];
  isReceivingOffers: boolean;
  gallery: ImageGallery;
  onProfileImageClick?: () => void;
  onScrap?: () => void;
  onOffer?: () => void;
  onShare?: () => void;
  defaultName: string;
  defaultDescription: string;
  defaultDetailedIntro: string;
  defaultProfileImageUrl: string;
  defaultWebsiteUrl: string;
  defaultCategories: string[];
  defaultTags: string[];
}

/**
 * 프로필 상세 페이지의 공통 컨텐츠 컴포넌트
 */
export const ProfileDetailContent: React.FC<ProfileDetailContentProps> = ({
  title,
  name,
  description,
  detailedIntro,
  profileImageUrl,
  type,
  categories,
  tags,
  websiteUrl,
  galleryImages,
  defaultGalleryImages,
  isReceivingOffers,
  gallery,
  onProfileImageClick,
  onScrap,
  onOffer,
  onShare,
  defaultName,
  defaultDescription,
  defaultDetailedIntro,
  defaultProfileImageUrl,
  defaultCategories,
  defaultTags,
  defaultWebsiteUrl,
}) => {
  const handleGalleryImageClick = (index: number) => {
    gallery.open(index);
  };

  return (
    <>
      <StickyHeader title={title} onShare={onShare} />
      <ProfileSection
        name={name || defaultName}
        description={description || defaultDescription}
        detailedIntro={detailedIntro || defaultDetailedIntro}
        profileImageUrl={profileImageUrl || defaultProfileImageUrl}
        type={type}
        categories={categories.length > 0 ? categories : defaultCategories}
        tags={tags.length > 0 ? tags : defaultTags}
        websiteUrl={websiteUrl || defaultWebsiteUrl}
        onImageClick={onProfileImageClick}
      />
      <GallerySection>
        <GalleryHeaderWrapper>
          <HomeSectionHeader title="갤러리" />
        </GalleryHeaderWrapper>
        <GalleryWrapper>
          <GalleryGrid
            images={galleryImages && galleryImages.length > 0 ? galleryImages : defaultGalleryImages}
            columns={3}
            onImageClick={handleGalleryImageClick}
          />
        </GalleryWrapper>
      </GallerySection>
      <ActionSection
        isScraped={false}
        isReceivingOffers={isReceivingOffers}
        onScrap={onScrap}
        onOffer={onOffer}
      />
      <GalleryLightbox
        image={gallery.currentImage}
        isOpen={gallery.isOpen}
        onClose={gallery.close}
        onPrev={gallery.showPrev}
        onNext={gallery.showNext}
        showControls={gallery.images.length > 1}
      />
    </>
  );
};

