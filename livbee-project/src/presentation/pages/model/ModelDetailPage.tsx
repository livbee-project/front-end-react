import React from 'react';
import { useParams } from 'react-router-dom';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { ModelDetail } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/detail/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/detail/useDetailPageState';
import { useProfileDetailPage } from '@/presentation/pages/detail/shared/useProfileDetailPage';
import { ProfileDetailContent } from '@/presentation/pages/detail/shared/ProfileDetailContent';

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

  // 기본 데이터 (API 데이터가 없을 때만 사용)
  const defaultModel: ModelDetail = {
    id: id || '',
    user: '',
    nickname: null,
    oneLineIntro: null,
    detailedIntro: null,
    experienceYears: null,
    age: null,
    isAgePublic: false,
    mainThumbnailUrl: null,
    backgroundImageUrl: null,
    subThumbnailUrls: [],
    status: 'active',
    detailedRegion: null,
    gender: null,
    height: null,
    weight: null,
    topSize: null,
    bottomSize: null,
    shoeSize: null,
    isSizingPublic: false,
    websiteUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    tiktokUrl: null,
    publicScope: 'public',
    isReceivingOffers: false,
    attachedFileUrl: null,
    createdAt: '',
    updatedAt: '',
  };

  // 모든 Hook은 early return 이전에 호출되어야 합니다
  const { displayData: displayModel, gallery, categories, tags, websiteUrl } = useProfileDetailPage({
    data: model,
    defaultData: defaultModel,
  });

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
        header={{
          title: displayModel.nickname || '모델',
          onShare: handleShare,
        }}
        profileInfo={{
          name: displayModel.nickname || '',
          description: displayModel.oneLineIntro || '',
          detailedIntro: displayModel.detailedIntro || '',
          profileImageUrl: displayModel.mainThumbnailUrl || null,
          type: 'model',
          categories,
          tags,
          websiteUrl: websiteUrl || '',
        }}
        defaults={{
          name: '모델',
          description: '',
          detailedIntro: '',
          profileImageUrl: '',
          websiteUrl: '',
          categories: [],
          tags: [],
        }}
        gallery={{
          images: displayModel.subThumbnailUrls ?? [],
          defaultImages: [],
          gallery,
        }}
        actions={{
          onProfileImageClick: handleProfileImageClick,
          onScrap: handleScrap,
          onOffer: handleOffer,
          onShare: handleShare,
          isReceivingOffers: displayModel.isReceivingOffers ?? true,
        }}
      />
    </DetailPageLayout>
  );
};

export default ModelDetailPage;
