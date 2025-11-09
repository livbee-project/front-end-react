import React from 'react';
import ProfileSection from '@/presentation/components/detail/ProfileSection';
import SectionHeader from '@/presentation/components/section/SectionHeader';
import GalleryGrid from '@/presentation/components/detail/GalleryGrid';
import InfoItem from '@/presentation/components/detail/InfoItem';
import TagContainer from '@/presentation/components/ui/TagContainer';
import Button from '@/presentation/components/ui/Button';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import DetailSection from '@/presentation/layouts/DetailSection';
import DetailContent from '@/presentation/layouts/DetailContent';
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
    console.log('버튼 클릭');
    // TODO: 버튼 액션 구현 (예: 모집 공고 신청, 문의하기 등)
  };

  return (
    <DetailPageLayout>
      {/* 1. 모델 프로필 섹션 */}
      <ProfileSection
        name="오해원"
        description="깔끔한 이미지의 모델로써 열정적인 활동을 하고 있습니다."
        onImageClick={handleProfileImageClick}
      />

      {/* 2. 상세소개 섹션 */}
      <DetailSection showDivider>
        <div style={{ paddingBottom: '16px' }}>
          <SectionHeader title="상세소개" />
        </div>
        <DetailContent>내용을 입력해주세요</DetailContent>
      </DetailSection>

      {/* 3. 갤러리 섹션 */}
      <DetailSection>
        <SectionHeader title="갤러리" />
        <div style={{ marginTop: '16px' }}>
          <GalleryGrid
            columns={3}
            onImageClick={handleGalleryImageClick}
          />
        </div>
      </DetailSection>

      {/* 4. 정보 및 태그 섹션 */}
      <div>
        {/* 정보 항목들 */}
        <InfoItem title="타이틀" />
        <InfoItem title="타이틀" />
        <InfoItem title="타이틀" />
        <InfoItem title="타이틀" />
        <InfoItem title="타이틀" />
        
        {/* 태그가 포함된 정보 항목 */}
        <InfoItem title="타이틀">
          <TagContainer
            tags={[
              { label: '경력 5년', variant: 'rounded' },
              { label: 'CH', variant: 'circle' },
              { label: 'CH', variant: 'circle' },
              { label: 'CH', variant: 'circle' },
              { label: 'CH', variant: 'circle' },
              { label: 'CH', variant: 'circle' },
            ]}
          />
        </InfoItem>
      </div>

      {/* 5. 하단 버튼 */}
      <div style={{ padding: '16px' }}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleButtonClick}
        >
          BUTTON
        </Button>
      </div>
    </DetailPageLayout>
  );
};

export default ModelDetailPage;

