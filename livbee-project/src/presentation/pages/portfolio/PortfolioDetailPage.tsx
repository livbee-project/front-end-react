import React from 'react';
import { useParams } from 'react-router-dom';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { PortfolioDetail } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/useDetailPageState';
import { useProfileDetailPage } from '@/presentation/pages/detail/shared/useProfileDetailPage';
import { ProfileDetailContent } from '@/presentation/pages/detail/shared/ProfileDetailContent';

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

  // 모든 Hook은 early return 이전에 호출되어야 합니다
  const { displayData: displayPortfolio, gallery, categories, tags, websiteUrl } = useProfileDetailPage({
    data: portfolio,
    defaultData: defaultPortfolio,
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

  const handleProfileImageClick = () => {
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
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
      <ProfileDetailContent
        title={displayPortfolio.nickname || '쇼호스트'}
        name={displayPortfolio.nickname || ''}
        description={displayPortfolio.oneLineIntro || ''}
        detailedIntro={displayPortfolio.detailedIntro || ''}
        profileImageUrl={displayPortfolio.mainThumbnailUrl || ''}
        type="showhost"
        categories={categories}
        tags={tags}
        websiteUrl={websiteUrl || ''}
        galleryImages={displayPortfolio.subThumbnailUrls || []}
        defaultGalleryImages={defaultPortfolio.subThumbnailUrls}
        isReceivingOffers={displayPortfolio.isReceivingOffers ?? true}
        gallery={gallery}
        onProfileImageClick={handleProfileImageClick}
        onScrap={handleScrap}
        onOffer={handleOffer}
        onShare={handleShare}
        defaultName="김지현"
        defaultDescription="패션 전문 쇼호스트, 5년 경력"
        defaultDetailedIntro="안녕하세요! 패션과 뷰티 분야에서 5년간 활동한 쇼호스트 김지현입니다.\n라이브 커머스를 통해 고객과 소통하며 브랜드 가치를 전달하는 것을 즐깁니다. 진정성 있는 소통과 전문적인 제품 설명으로 높은 구매 전환율을 자랑합니다.\n함께 성장할 수 있는 브랜드와의 협업을 기대합니다!"
        defaultProfileImageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
        defaultWebsiteUrl="https://www.instagram.com/jihyun_host"
        defaultCategories={['패션', '뷰티']}
        defaultTags={['키 168cm', '사이즈 55(S)', '경력 5년']}
      />
    </DetailPageLayout>
  );
};

export default PortfolioDetailPage;
