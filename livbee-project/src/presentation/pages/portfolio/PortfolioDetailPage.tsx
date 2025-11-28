import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';
import ProfileSection from '@/presentation/components/detail/common/ProfileSection';
import HomeSectionHeader from '@/presentation/components/home/sections/HomeSectionHeader';
import GalleryGrid from '@/presentation/components/detail/common/GalleryGrid';
import ActionSection from '@/presentation/components/detail/common/ActionSection';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import DetailSection from '@/presentation/layouts/DetailSection';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { PortfolioDetail } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/useDetailPageState';
import { useImageGallery } from '@/presentation/hooks/useImageGallery';
import GalleryLightbox from '@/presentation/components/detail/common/GalleryLightbox';
import { extractCategories, generateProfileTags } from '@/shared/utils/detailPageUtils';

const GallerySection = styled(DetailSection)`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const GalleryWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const portfolioRepository = useRepository(PortfolioRepository);

  const {
    data: portfolio,
    loading: isLoading,
    error,
  } = useDetailFetcher<PortfolioDetail, PortfolioRepository>({
    repository: portfolioRepository,
    method: 'getPortfolioById',
    id,
    errorMessage: '포트폴리오를 불러오는데 실패했습니다.',
  });

  // 로딩/에러 상태 처리
  const { renderState, isReady } = useDetailPageState({
    data: portfolio,
    loading: isLoading,
    error,
    notFoundMessage: '포트폴리오를 찾을 수 없습니다.',
    listPath: '/portfolios',
    LayoutComponent: DetailPageLayout,
  });

  const gallery = useImageGallery(portfolio?.subThumbnailUrls ?? []);

  const categories = useMemo(() => {
    if (!portfolio?.oneLineIntro) {
      return [];
    }
    return extractCategories({ description: portfolio.oneLineIntro });
  }, [portfolio?.oneLineIntro]);

  const tags = useMemo(() => {
    if (!portfolio) {
      return [];
    }
    return generateProfileTags({
      height: portfolio.height,
      weight: portfolio.weight,
      topSize: portfolio.topSize,
      experienceYears: portfolio.experienceYears,
      isSizingPublic: true,
    });
  }, [portfolio]);

  // 로딩/에러 상태일 경우 UI 반환
  if (renderState) {
    return <>{renderState}</>;
  }

  // 데이터가 준비되지 않았으면 아무것도 렌더링하지 않음 (방어 코드)
  if (!isReady || !portfolio) {
    return null;
  }

  const handleProfileImageClick = () => {
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
  };

  const handleGalleryImageClick = (index: number) => {
    gallery.open(index);
  };

  const handleScrap = () => {
    // TODO: 찜하기 기능 구현
  };

  const handleOffer = () => {
    // TODO: 제안하기 기능 구현
  };

  const handleShare = () => {
    // TODO: 공유 기능 구현
  };

  return (
    <DetailPageLayout>
      <StickyHeader title={portfolio.nickname || '쇼호스트'} onShare={handleShare} />

      <ProfileSection
        name={portfolio.nickname || '이름 없음'}
        description={portfolio.oneLineIntro}
        detailedIntro={portfolio.detailedIntro}
        profileImageUrl={portfolio.mainThumbnailUrl || undefined}
        type="showhost"
        categories={categories}
        tags={tags}
        websiteUrl={portfolio.websiteUrl}
        onImageClick={handleProfileImageClick}
      />

      {portfolio.subThumbnailUrls && portfolio.subThumbnailUrls.length > 0 && (
        <GallerySection>
          <HomeSectionHeader title="갤러리" />
          <GalleryWrapper>
            <GalleryGrid
              images={portfolio.subThumbnailUrls}
              columns={3}
              onImageClick={handleGalleryImageClick}
            />
          </GalleryWrapper>
        </GallerySection>
      )}

      <ActionSection
        isScraped={false}
        isReceivingOffers={portfolio.isReceivingOffers}
        onScrap={handleScrap}
        onOffer={handleOffer}
      />
      <GalleryLightbox
        image={gallery.currentImage}
        isOpen={gallery.isOpen}
        onClose={gallery.close}
        onPrev={gallery.showPrev}
        onNext={gallery.showNext}
        showControls={gallery.images.length > 1}
      />
    </DetailPageLayout>
  );
};

export default PortfolioDetailPage;
