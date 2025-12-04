import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';
import ProfileSection from '@/presentation/components/detail/common/ProfileSection';
import HomeSectionHeader from '@/presentation/components/home/sections/HomeSectionHeader';
import GalleryGrid from '@/presentation/components/detail/common/GalleryGrid';
import ActionSection from '@/presentation/components/detail/common/ActionSection';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { PortfolioDetail } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/useDetailPageState';
import { useImageGallery } from '@/presentation/hooks/useImageGallery';
import GalleryLightbox from '@/presentation/components/detail/common/GalleryLightbox';
import { extractCategories, generateProfileTags } from '@/shared/utils/detailPageUtils';

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

  if (renderState) {
    return <>{renderState}</>;
  }

  if (!isReady) {
    return null;
  }

  // 하드코딩된 기본 데이터 (데이터가 없을 때 사용)
  const defaultPortfolio: PortfolioDetail = {
    id: id || '',
    user: '',
    nickname: '김지현',
    oneLineIntro: '패션 전문 쇼호스트, 5년 경력',
    detailedIntro: '안녕하세요! 패션과 뷰티 분야에서 5년간 활동한 쇼호스트 김지현입니다.\n라이브 커머스를 통해 고객과 소통하며 브랜드 가치를 전달하는 것을 즐깁니다. 진정성 있는 소통과 전문적인 제품 설명으로 높은 구매 전환율을 자랑합니다.\n함께 성장할 수 있는 브랜드와의 협업을 기대합니다!',
    experienceYears: 5,
    age: null,
    isAgePublic: false,
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    backgroundImageUrl: null,
    subThumbnailUrls: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    ],
    status: 'active',
    detailedRegion: null,
    gender: null,
    height: 168,
    weight: null,
    topSize: '55(S)',
    bottomSize: null,
    shoeSize: null,
    isSizingPublic: true,
    websiteUrl: 'https://www.instagram.com/jihyun_host',
    instagramUrl: null,
    youtubeUrl: null,
    tiktokUrl: null,
    publicScope: 'public',
    isReceivingOffers: true,
    recentLives: [],
    attachedFileUrl: null,
    createdAt: '',
    updatedAt: '',
  };

  // 데이터가 준비되지 않았으면 기본 데이터 사용
  const displayPortfolio = portfolio || defaultPortfolio;

  const gallery = useImageGallery(displayPortfolio.subThumbnailUrls ?? []);

  const categories = useMemo(() => {
    if (!displayPortfolio.oneLineIntro) {
      return ['패션', '뷰티'];
    }
    const extracted = extractCategories({ description: displayPortfolio.oneLineIntro });
    return extracted.length > 0 ? extracted : ['패션', '뷰티'];
  }, [displayPortfolio.oneLineIntro]);

  const tags = useMemo(() => {
    return generateProfileTags({
      height: displayPortfolio.height,
      weight: displayPortfolio.weight,
      topSize: displayPortfolio.topSize,
      experienceYears: displayPortfolio.experienceYears,
      isSizingPublic: displayPortfolio.isSizingPublic,
    });
  }, [displayPortfolio]);

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
      <StickyHeader title={displayPortfolio.nickname || '쇼호스트'} onShare={handleShare} />

      <ProfileSection
        name={displayPortfolio.nickname || '김지현'}
        description={displayPortfolio.oneLineIntro || '패션 전문 쇼호스트, 5년 경력'}
        detailedIntro={displayPortfolio.detailedIntro || '안녕하세요! 패션과 뷰티 분야에서 5년간 활동한 쇼호스트 김지현입니다.\n라이브 커머스를 통해 고객과 소통하며 브랜드 가치를 전달하는 것을 즐깁니다. 진정성 있는 소통과 전문적인 제품 설명으로 높은 구매 전환율을 자랑합니다.\n함께 성장할 수 있는 브랜드와의 협업을 기대합니다!'}
        profileImageUrl={displayPortfolio.mainThumbnailUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'}
        type="showhost"
        categories={categories.length > 0 ? categories : ['패션', '뷰티']}
        tags={tags.length > 0 ? tags : ['키 168cm', '사이즈 55(S)', '경력 5년']}
        websiteUrl={displayPortfolio.websiteUrl || 'https://www.instagram.com/jihyun_host'}
        onImageClick={handleProfileImageClick}
      />

      <GallerySection>
        <GalleryHeaderWrapper>
          <HomeSectionHeader title="갤러리" />
        </GalleryHeaderWrapper>
        <GalleryWrapper>
          <GalleryGrid
            images={
              displayPortfolio.subThumbnailUrls && displayPortfolio.subThumbnailUrls.length > 0
                ? displayPortfolio.subThumbnailUrls
                : defaultPortfolio.subThumbnailUrls
            }
            columns={3}
            onImageClick={handleGalleryImageClick}
          />
        </GalleryWrapper>
      </GallerySection>

      <ActionSection
        isScraped={false}
        isReceivingOffers={displayPortfolio.isReceivingOffers}
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
