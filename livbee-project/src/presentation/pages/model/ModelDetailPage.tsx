import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';
import ProfileSection from '@/presentation/components/detail/common/ProfileSection';
import HomeSectionHeader from '@/presentation/components/home/sections/HomeSectionHeader';
import GalleryGrid from '@/presentation/components/detail/common/GalleryGrid';
import ActionSection from '@/presentation/components/detail/common/ActionSection';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { ModelDetail } from '@/domain/entities/Model';
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

const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const modelRepository = useRepository(ModelRepository);

  const {
    data: model,
    loading: isLoading,
    error,
  } = useDetailFetcher<ModelDetail, ModelRepository>({
    repository: modelRepository,
    method: 'getModelById',
    id,
    errorMessage: '모델을 불러오는데 실패했습니다.',
  });

  // 하드코딩된 기본 데이터 (데이터가 없을 때 사용)
  const defaultModel: ModelDetail = {
    id: id || '',
    user: '',
    nickname: '한지우',
    oneLineIntro: '청순/내추럴 컨셉 전문 모델',
    detailedIntro: '안녕하세요! 패션과 뷰티 분야에서 활동하고 있는 모델 한지우입니다.\n청순하고 자연스러운 이미지로 다양한 브랜드와 협업하고 있으며, 카메라 앞에서 자연스러운 포즈와 표현력을 자랑합니다.\n함께 성장할 수 있는 브랜드와의 협업을 기대합니다!',
    experienceYears: 3,
    age: null,
    isAgePublic: false,
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    backgroundImageUrl: null,
    subThumbnailUrls: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
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
    websiteUrl: 'https://www.instagram.com/jiwoo_model',
    instagramUrl: null,
    youtubeUrl: null,
    tiktokUrl: null,
    publicScope: 'public',
    isReceivingOffers: true,
    attachedFileUrl: null,
    createdAt: '',
    updatedAt: '',
  };

  // 데이터가 준비되지 않았으면 기본 데이터 사용
  const displayModel = model || defaultModel;

  // 모든 Hook은 early return 이전에 호출되어야 합니다
  const gallery = useImageGallery(displayModel.subThumbnailUrls ?? []);

  const categories = useMemo(() => {
    if (!displayModel.oneLineIntro) {
      return ['패션', '뷰티'];
    }
    const extracted = extractCategories({ description: displayModel.oneLineIntro });
    return extracted.length > 0 ? extracted : ['패션', '뷰티'];
  }, [displayModel.oneLineIntro]);

  const tags = useMemo(() => {
    return generateProfileTags({
      height: displayModel.height,
      weight: displayModel.weight,
      topSize: displayModel.topSize,
      experienceYears: displayModel.experienceYears,
      isSizingPublic: displayModel.isSizingPublic,
    });
  }, [displayModel]);

  // 로딩/에러 상태 처리
  const { renderState, isReady } = useDetailPageState({
    data: model,
    loading: isLoading,
    error,
    notFoundMessage: '모델을 찾을 수 없습니다.',
    listPath: '/models',
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

  // websiteUrl 우선순위: websiteUrl > instagramUrl
  const websiteUrl = displayModel.websiteUrl || displayModel.instagramUrl || null;

  return (
    <DetailPageLayout>
      <StickyHeader title={displayModel.nickname || '모델'} onShare={handleShare} />

      <ProfileSection
        name={displayModel.nickname || '한지우'}
        description={displayModel.oneLineIntro || '청순/내추럴 컨셉 전문 모델'}
        detailedIntro={displayModel.detailedIntro || '안녕하세요! 패션과 뷰티 분야에서 활동하고 있는 모델 한지우입니다.\n청순하고 자연스러운 이미지로 다양한 브랜드와 협업하고 있으며, 카메라 앞에서 자연스러운 포즈와 표현력을 자랑합니다.\n함께 성장할 수 있는 브랜드와의 협업을 기대합니다!'}
        profileImageUrl={displayModel.mainThumbnailUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
        type="model"
        categories={categories.length > 0 ? categories : ['패션', '뷰티']}
        tags={tags.length > 0 ? tags : ['키 168cm', '사이즈 55(S)', '경력 3년']}
        websiteUrl={websiteUrl || 'https://www.instagram.com/jiwoo_model'}
        onImageClick={handleProfileImageClick}
      />

      <GallerySection>
        <GalleryHeaderWrapper>
          <HomeSectionHeader title="갤러리" />
        </GalleryHeaderWrapper>
        <GalleryWrapper>
          <GalleryGrid
            images={
              displayModel.subThumbnailUrls && displayModel.subThumbnailUrls.length > 0
                ? displayModel.subThumbnailUrls
                : defaultModel.subThumbnailUrls
            }
            columns={3}
            onImageClick={handleGalleryImageClick}
          />
        </GalleryWrapper>
      </GallerySection>

      <ActionSection
        isScraped={false}
        isReceivingOffers={displayModel.isReceivingOffers}
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

export default ModelDetailPage;
