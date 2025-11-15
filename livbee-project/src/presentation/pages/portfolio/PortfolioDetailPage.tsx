import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileSection from '@/presentation/components/detail/ProfileSection';
import SectionHeader from '@/presentation/components/section/SectionHeader';
import GalleryGrid from '@/presentation/components/detail/GalleryGrid';
import InfoItem from '@/presentation/components/detail/InfoItem';
import { SnsLinks } from '@/presentation/components/detail/SnsLinks';
import Button from '@/presentation/components/ui/Button';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import DetailSection from '@/presentation/layouts/DetailSection';
import DetailContent from '@/presentation/layouts/DetailContent';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { SPACING } from '@/presentation/styles/constants';
import { PortfolioRepository } from '@/data/repositories/PortfolioRepository';
import type { PortfolioDetail } from '@/domain/entities/Portfolio';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailData } from '@/presentation/hooks/useDetailData';
import '@/presentation/styles/global.css';

/**
 * 포트폴리오 상세 페이지 컴포넌트입니다.
 * 이미지에 맞게 다음 섹션들을 포함합니다:
 * 1. 포트폴리오 프로필 섹션 (이름, 설명, 프로필 이미지)
 * 2. 상세소개 섹션
 * 3. 갤러리 섹션 (3x3 그리드)
 * 4. 정보 및 태그 섹션
 * 5. 하단 버튼
 */
const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // portfolioRepository를 useRepository 훅으로 관리
  const portfolioRepository = useRepository(PortfolioRepository);

  // 상세 데이터 조회
  const { data: portfolio, loading: isLoading, error } = useDetailData<PortfolioDetail>(
    (id, signal) => portfolioRepository.getPortfolioById(id, signal),
    id,
    '포트폴리오를 불러오는데 실패했습니다.'
  );

  /**
   * 프로필 이미지 클릭 핸들러
   */
  const handleProfileImageClick = () => {
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
  };

  /**
   * 갤러리 이미지 클릭 핸들러
   */
  const handleGalleryImageClick = (index: number) => {
    // TODO: 이미지 확대 또는 갤러리 뷰어 열기 기능 구현
  };

  /**
   * 하단 버튼 클릭 핸들러
   */
  const handleButtonClick = () => {
    if (portfolio?.isReceivingOffers) {
      // TODO: 제안하기 기능 구현
    } else {
      // TODO: 문의하기 기능 구현
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <DetailPageLayout>
        <LoadingState padding="16px" />
      </DetailPageLayout>
    );
  }

  // 에러 발생
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

  // SNS 링크 배열 생성
  const snsLinks = [
    portfolio.websiteUrl && { label: '웹사이트', url: portfolio.websiteUrl },
    portfolio.instagramUrl && { label: '인스타그램', url: portfolio.instagramUrl },
    portfolio.youtubeUrl && { label: '유튜브', url: portfolio.youtubeUrl },
    portfolio.tiktokUrl && { label: '틱톡', url: portfolio.tiktokUrl },
  ].filter(Boolean) as Array<{ label: string; url: string }>;

  return (
    <DetailPageLayout>
      {/* 1. 포트폴리오 프로필 섹션 */}
      <ProfileSection
        name={portfolio.nickname || '이름 없음'}
        description={portfolio.oneLineIntro || '소개 없음'}
        profileImageUrl={portfolio.mainThumbnailUrl || undefined}
        onImageClick={handleProfileImageClick}
      />

      {/* 2. 상세소개 섹션 */}
      {portfolio.detailedIntro && (
        <DetailSection showDivider>
          <div style={{ paddingBottom: SPACING.LG }}>
            <SectionHeader title="상세소개" />
          </div>
          <DetailContent>
            <div
              style={{ fontSize: 'var(--p2)', lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: portfolio.detailedIntro }}
            />
          </DetailContent>
        </DetailSection>
      )}

      {/* 3. 갤러리 섹션 */}
      {portfolio.subThumbnailUrls && portfolio.subThumbnailUrls.length > 0 && (
        <DetailSection>
          <SectionHeader title="갤러리" />
          <div style={{ marginTop: '16px' }}>
            <GalleryGrid
              images={portfolio.subThumbnailUrls}
              columns={3}
              onImageClick={handleGalleryImageClick}
            />
          </div>
        </DetailSection>
      )}

      {/* 4. 정보 및 태그 섹션 */}
      <div>
        <InfoItem
          title="경력"
          content={portfolio.experienceYears != null ? `${portfolio.experienceYears}년` : '-'}
        />
        <InfoItem
          title="나이"
          content={portfolio.isAgePublic && portfolio.age != null ? `${portfolio.age}세` : '-'}
        />
        <InfoItem
          title="지역"
          content={portfolio.detailedRegion || '-'}
        />
        <InfoItem
          title="성별"
          content={portfolio.gender === 'male' ? '남성' : portfolio.gender === 'female' ? '여성' : '-'}
        />
        <InfoItem
          title="키"
          content={portfolio.isSizingPublic && portfolio.height != null ? `${portfolio.height}cm` : '-'}
        />
        <InfoItem
          title="몸무게"
          content={portfolio.isSizingPublic && portfolio.weight != null ? `${portfolio.weight}kg` : '-'}
        />
        <InfoItem
          title="상의 사이즈"
          content={portfolio.isSizingPublic && portfolio.topSize ? portfolio.topSize : '-'}
        />
        <InfoItem
          title="하의 사이즈"
          content={portfolio.isSizingPublic && portfolio.bottomSize ? portfolio.bottomSize : '-'}
        />
        <InfoItem
          title="신발 사이즈"
          content={portfolio.isSizingPublic && portfolio.shoeSize != null ? `${portfolio.shoeSize}mm` : '-'}
        />
        
        {/* SNS 링크 */}
        <SnsLinks links={snsLinks} />
      </div>

      {/* 5. 하단 버튼 */}
      <div style={{ padding: SPACING.LG }}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleButtonClick}
          disabled={!portfolio.isReceivingOffers}
        >
          {portfolio.isReceivingOffers ? '제안하기' : '제안 받지 않음'}
        </Button>
      </div>
    </DetailPageLayout>
  );
};

export default PortfolioDetailPage;

