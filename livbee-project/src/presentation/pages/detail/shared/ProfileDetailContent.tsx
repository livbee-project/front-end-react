import React from 'react';
import styled from 'styled-components';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';
import ProfileSection from '@/presentation/components/detail/common/ProfileSection';
import HomeSectionHeader from '@/presentation/components/home/sections/HomeSectionHeader';
import GalleryGrid from '@/presentation/components/detail/common/GalleryGrid';
import ActionSection from '@/presentation/components/detail/common/ActionSection';
import GalleryLightbox from '@/presentation/components/detail/common/GalleryLightbox';
import type {
  ProfileInfo,
  ProfileDefaults,
  GalleryData,
  ProfileActions,
  HeaderData,
} from '@/presentation/pages/detail/shared/types/ProfileDetailContentTypes';

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
  header: HeaderData;
  profileInfo: ProfileInfo;
  defaults: ProfileDefaults;
  gallery: GalleryData;
  actions: ProfileActions;
}

/**
 * 프로필 상세 페이지의 공통 컨텐츠 컴포넌트
 * SRP 준수: 각 책임을 props 객체로 그룹화
 */
export const ProfileDetailContent: React.FC<ProfileDetailContentProps> = ({
  header,
  profileInfo,
  defaults,
  gallery,
  actions,
}) => {
  const handleGalleryImageClick = (index: number) => {
    gallery.gallery.open(index);
  };

  return (
    <>
      <StickyHeader title={header.title} onShare={header.onShare} />
      <ProfileSection
        name={profileInfo.name || defaults.name}
        description={profileInfo.description || defaults.description}
        detailedIntro={profileInfo.detailedIntro || defaults.detailedIntro}
        profileImageUrl={profileInfo.profileImageUrl || defaults.profileImageUrl}
        type={profileInfo.type}
        categories={profileInfo.categories.length > 0 ? profileInfo.categories : defaults.categories}
        tags={profileInfo.tags.length > 0 ? profileInfo.tags : defaults.tags}
        websiteUrl={profileInfo.websiteUrl || defaults.websiteUrl}
        onImageClick={actions.onProfileImageClick}
      />
      <GallerySection>
        <GalleryHeaderWrapper>
          <HomeSectionHeader title="갤러리" />
        </GalleryHeaderWrapper>
        <GalleryWrapper>
          <GalleryGrid
            images={gallery.images && gallery.images.length > 0 ? gallery.images : gallery.defaultImages}
            columns={3}
            onImageClick={handleGalleryImageClick}
          />
        </GalleryWrapper>
      </GallerySection>
      <ActionSection
        isScraped={false}
        isReceivingOffers={actions.isReceivingOffers}
        onScrap={actions.onScrap}
        onOffer={actions.onOffer}
      />
      <GalleryLightbox
        image={gallery.gallery.currentImage}
        isOpen={gallery.gallery.isOpen}
        onClose={gallery.gallery.close}
        onPrev={gallery.gallery.showPrev}
        onNext={gallery.gallery.showNext}
        showControls={gallery.gallery.images.length > 1}
      />
    </>
  );
};

