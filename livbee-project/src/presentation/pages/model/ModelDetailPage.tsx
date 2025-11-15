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
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { ModelDetail } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailData } from '@/presentation/hooks/useDetailData';
import '@/presentation/styles/global.css';

/**
 * 모델 상세 페이지 컴포넌트입니다.
 * 이미지에 맞게 다음 섹션들을 포함합니다:
 * 1. 모델 프로필 섹션 (이름, 설명, 프로필 이미지)
 * 2. 상세소개 섹션
 * 3. 갤러리 섹션 (3x3 그리드)
 * 4. 정보 및 태그 섹션
 * 5. 하단 버튼
 */
const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // modelRepository를 useRepository 훅으로 관리
  const modelRepository = useRepository(ModelRepository);

  // 상세 데이터 조회
  const { data: model, loading: isLoading, error } = useDetailData<ModelDetail>(
    (id, signal) => modelRepository.getModelById(id, signal),
    id,
    '모델을 불러오는데 실패했습니다.'
  );

  /**
   * 프로필 이미지 클릭 핸들러
   */
  const handleProfileImageClick = () => {
    console.log('프로필 이미지 클릭');
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
  };

  /**
   * 갤러리 이미지 클릭 핸들러
   */
  const handleGalleryImageClick = (index: number) => {
    console.log(`갤러리 이미지 ${index + 1} 클릭`);
    // TODO: 이미지 확대 또는 갤러리 뷰어 열기 기능 구현
  };

  /**
   * 하단 버튼 클릭 핸들러
   */
  const handleButtonClick = () => {
    if (model?.isReceivingOffers) {
      console.log('제안하기');
      // TODO: 제안하기 기능 구현
    } else {
      console.log('문의하기');
      // TODO: 문의하기 기능 구현
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <DetailPageLayout>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      </DetailPageLayout>
    );
  }

  // 에러 발생
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

  // SNS 링크 배열 생성
  const snsLinks = [
    model.websiteUrl && { label: '웹사이트', url: model.websiteUrl },
    model.instagramUrl && { label: '인스타그램', url: model.instagramUrl },
    model.youtubeUrl && { label: '유튜브', url: model.youtubeUrl },
    model.tiktokUrl && { label: '틱톡', url: model.tiktokUrl },
  ].filter(Boolean) as Array<{ label: string; url: string }>;

  return (
    <DetailPageLayout>
      {/* 1. 모델 프로필 섹션 */}
      <ProfileSection
        name={model.nickname || '이름 없음'}
        description={model.oneLineIntro || '소개 없음'}
        profileImageUrl={model.mainThumbnailUrl || undefined}
        onImageClick={handleProfileImageClick}
      />

      {/* 2. 상세소개 섹션 */}
      {model.detailedIntro && (
        <DetailSection showDivider>
          <div style={{ paddingBottom: '16px' }}>
            <SectionHeader title="상세소개" />
          </div>
          <DetailContent>
            <div
              style={{ fontSize: 'var(--p2)', lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: model.detailedIntro }}
            />
          </DetailContent>
        </DetailSection>
      )}

      {/* 3. 갤러리 섹션 */}
      {model.subThumbnailUrls && model.subThumbnailUrls.length > 0 && (
        <DetailSection>
          <SectionHeader title="갤러리" />
          <div style={{ marginTop: '16px' }}>
            <GalleryGrid
              images={model.subThumbnailUrls}
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
          content={model.experienceYears != null ? `${model.experienceYears}년` : '-'}
        />
        <InfoItem
          title="나이"
          content={model.isAgePublic && model.age != null ? `${model.age}세` : '-'}
        />
        <InfoItem
          title="지역"
          content={model.detailedRegion || '-'}
        />
        <InfoItem
          title="성별"
          content={model.gender === 'male' ? '남성' : model.gender === 'female' ? '여성' : '-'}
        />
        <InfoItem
          title="키"
          content={model.isSizingPublic && model.height != null ? `${model.height}cm` : '-'}
        />
        <InfoItem
          title="몸무게"
          content={model.isSizingPublic && model.weight != null ? `${model.weight}kg` : '-'}
        />
        <InfoItem
          title="상의 사이즈"
          content={model.isSizingPublic && model.topSize ? model.topSize : '-'}
        />
        <InfoItem
          title="하의 사이즈"
          content={model.isSizingPublic && model.bottomSize ? model.bottomSize : '-'}
        />
        <InfoItem
          title="신발 사이즈"
          content={model.isSizingPublic && model.shoeSize != null ? `${model.shoeSize}mm` : '-'}
        />
        
        {/* SNS 링크 */}
        <SnsLinks links={snsLinks} />
      </div>

      {/* 5. 하단 버튼 */}
      <div style={{ padding: '16px' }}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleButtonClick}
          disabled={!model.isReceivingOffers}
        >
          {model.isReceivingOffers ? '제안하기' : '제안 받지 않음'}
        </Button>
      </div>
    </DetailPageLayout>
  );
};

export default ModelDetailPage;

