import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StickyHeader from '@/presentation/components/detail/StickyHeader';
import ProfileSection from '@/presentation/components/detail/ProfileSection';
import SectionHeader from '@/presentation/components/section/SectionHeader';
import GalleryGrid from '@/presentation/components/detail/GalleryGrid';
import ActionSection from '@/presentation/components/detail/ActionSection';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import DetailSection from '@/presentation/layouts/DetailSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { theme } from '@/presentation/styles/theme';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { PortfolioDetail } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailData } from '@/presentation/hooks/useDetailData';

const GallerySection = styled(DetailSection)`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const portfolioRepository = useRepository(PortfolioRepository);

  const { data: portfolio, loading: isLoading, error } = useDetailData<PortfolioDetail>(
    (id, signal) => portfolioRepository.getPortfolioById(id, signal),
    id,
    '포트폴리오를 불러오는데 실패했습니다.'
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

  if (error || !portfolio) {
    return (
      <DetailPageLayout>
        <ErrorState
          message={error || '포트폴리오를 찾을 수 없습니다.'}
          padding="16px"
          onRetry={() => navigate('/portfolios')}
          retryLabel="목록으로 돌아가기"
        />
      </DetailPageLayout>
    );
  }

  // 카테고리 배열 생성 (description에서 추출)
  const categories: string[] = [];
  const description = portfolio.oneLineIntro || '';
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
  if (portfolio.height != null) {
    tags.push(`키 ${portfolio.height}cm`);
  }
  if (portfolio.weight != null) {
    tags.push(`몸무게 ${portfolio.weight}kg`);
  }
  if (portfolio.topSize) {
    tags.push(`사이즈 ${portfolio.topSize}`);
  }
  if (portfolio.experienceYears != null && portfolio.experienceYears > 0) {
    tags.push(`경력 ${portfolio.experienceYears}년`);
  }

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
          <SectionHeader title="갤러리" />
          <div style={{ marginTop: theme.spacing.lg }}>
            <GalleryGrid
              images={portfolio.subThumbnailUrls}
              columns={3}
              onImageClick={handleGalleryImageClick}
            />
          </div>
        </GallerySection>
      )}

      <ActionSection
        isScraped={false}
        isReceivingOffers={portfolio.isReceivingOffers}
        onScrap={handleScrap}
        onOffer={handleOffer}
      />
    </DetailPageLayout>
  );
};

export default PortfolioDetailPage;
