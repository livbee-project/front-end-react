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
          profileImageUrl: displayModel.mainThumbnailUrl || '',
          type: 'model',
          categories,
          tags,
          websiteUrl: websiteUrl || '',
        }}
        defaults={{
          name: '한지우',
          description: '청순/내추럴 컨셉 전문 모델',
          detailedIntro: '안녕하세요! 패션과 뷰티 분야에서 활동하고 있는 모델 한지우입니다.\n청순하고 자연스러운 이미지로 다양한 브랜드와 협업하고 있으며, 카메라 앞에서 자연스러운 포즈와 표현력을 자랑합니다.\n함께 성장할 수 있는 브랜드와의 협업을 기대합니다!',
          profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          websiteUrl: 'https://www.instagram.com/jiwoo_model',
          categories: ['패션', '뷰티'],
          tags: ['키 168cm', '사이즈 55(S)', '경력 3년'],
        }}
        gallery={{
          images: displayModel.subThumbnailUrls || [],
          defaultImages: defaultModel.subThumbnailUrls,
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
