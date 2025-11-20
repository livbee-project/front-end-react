import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StickyHeader from '@/presentation/components/detail/StickyHeader';
import ProfileSection from '@/presentation/components/detail/ProfileSection';
import HomeSectionHeader from '@/presentation/components/section/HomeSectionHeader';
import GalleryGrid from '@/presentation/components/detail/GalleryGrid';
import ActionSection from '@/presentation/components/detail/ActionSection';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import DetailSection from '@/presentation/layouts/DetailSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { theme } from '@/presentation/styles/theme';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { ModelDetail } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailData } from '@/presentation/hooks/useDetailData';

const GallerySection = styled(DetailSection)`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const modelRepository = useRepository(ModelRepository);

  const { data: model, loading: isLoading, error } = useDetailData<ModelDetail>(
    (id, signal) => modelRepository.getModelById(id, signal),
    id,
    '모델을 불러오는데 실패했습니다.'
  );

  const handleProfileImageClick = () => {
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
  };

  const handleGalleryImageClick = (_index: number) => {
    // TODO: 이미지 확대 또는 갤러리 뷰어 열기 기능 구현
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

  if (isLoading) {
    return (
      <DetailPageLayout>
        <LoadingState padding="16px" />
      </DetailPageLayout>
    );
  }

  if (error || !model) {
    return (
      <DetailPageLayout>
        <ErrorState
          message={error || '모델을 찾을 수 없습니다.'}
          padding="16px"
          onRetry={() => navigate('/models')}
          retryLabel="목록으로 돌아가기"
        />
      </DetailPageLayout>
    );
  }

  // 카테고리 배열 생성 (description에서 추출)
  const categories: string[] = [];
  const description = model.oneLineIntro || '';
  if (description.includes('패션')) {
    categories.push('패션');
  }
  if (description.includes('뷰티')) {
    categories.push('뷰티');
  }
  if (description.includes('식품')) {
    categories.push('식품');
  }
  if (description.includes('가전')) {
    categories.push('가전');
  }
  if (description.includes('생활') || description.includes('리빙')) {
    categories.push('생활/리빙');
  }

  // 태그 배열 생성
  const tags: string[] = [];
  if (model.isSizingPublic && model.height != null) {
    tags.push(`키 ${model.height}cm`);
  }
  if (model.isSizingPublic && model.weight != null) {
    tags.push(`몸무게 ${model.weight}kg`);
  }
  if (model.isSizingPublic && model.topSize) {
    tags.push(`사이즈 ${model.topSize}`);
  }
  if (model.experienceYears != null && model.experienceYears > 0) {
    tags.push(`경력 ${model.experienceYears}년`);
  }

  return (
    <DetailPageLayout>
      <StickyHeader title={model.nickname || '모델'} onShare={handleShare} />

      <ProfileSection
        name={model.nickname || '이름 없음'}
        description={model.oneLineIntro}
        detailedIntro={model.detailedIntro}
        profileImageUrl={model.mainThumbnailUrl || undefined}
        type="model"
        categories={categories}
        tags={tags}
        websiteUrl={model.websiteUrl}
        onImageClick={handleProfileImageClick}
      />

      {model.subThumbnailUrls && model.subThumbnailUrls.length > 0 && (
        <GallerySection>
          <HomeSectionHeader title="갤러리" />
          <div style={{ marginTop: theme.spacing.lg }}>
            <GalleryGrid
              images={model.subThumbnailUrls}
              columns={3}
              onImageClick={handleGalleryImageClick}
            />
          </div>
        </GallerySection>
      )}

      <ActionSection
        isScraped={false}
        isReceivingOffers={model.isReceivingOffers}
        onScrap={handleScrap}
        onOffer={handleOffer}
      />
    </DetailPageLayout>
  );
};

export default ModelDetailPage;
