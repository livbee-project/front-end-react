import React from 'react';
import ModelProfileSection from '@/presentation/components/common/ModelProfileSection';
import Header from '@/presentation/components/common/Header';
import GalleryGrid from '@/presentation/components/common/GalleryGrid';
import InfoItem from '@/presentation/components/common/InfoItem';
import Tag from '@/presentation/components/common/Tag';
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
  /**
   * 페이지 컨테이너 스타일
   */
  const pageStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--white)',
  };

  /**
   * 섹션 구분선 스타일
   */
  const dividerStyle: React.CSSProperties = {
    borderBottom: '1px solid #F7F8FA',
  };

  /**
   * 상세소개 컨텐츠 영역 스타일
   */
  const introContentStyle: React.CSSProperties = {
    padding: '16px',
    minHeight: '100px',
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    color: 'var(--dark-gray)',
  };

  /**
   * 하단 버튼 스타일
   */
  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    fontSize: 'var(--h2)', // 18px
    fontWeight: 700,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    margin: '16px',
    maxWidth: 'calc(100% - 32px)',
    boxSizing: 'border-box',
  };

  /**
   * 태그 컨테이너 스타일
   */
  const tagContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  };

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
    // TODO: 버튼 액션 구현 (예: 제안하기, 문의하기 등)
  };

  return (
    <div style={pageStyle}>
      {/* 1. 포트폴리오 프로필 섹션 */}
      <ModelProfileSection
        name="오해원"
        description="깔끔한 이미지의 모델로써 열정적인 활동을 하고 있습니다."
        onImageClick={handleProfileImageClick}
      />

      {/* 2. 상세소개 섹션 */}
      <div style={dividerStyle}>
        <div style={{ padding: '16px 16px 0 16px' }}>
          <Header title="상세소개" />
        </div>
        <div style={introContentStyle}>
          내용을 입력해주세요
        </div>
      </div>

      {/* 3. 갤러리 섹션 */}
      <div style={{ ...dividerStyle, padding: '16px' }}>
        <Header title="갤러리" />
        <div style={{ marginTop: '16px' }}>
          <GalleryGrid
            columns={3}
            onImageClick={handleGalleryImageClick}
          />
        </div>
      </div>

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
          <div style={tagContainerStyle}>
            <Tag label="CH" variant="circle" />
            <Tag label="CH" variant="circle" />
            <Tag label="CH" variant="circle" />
            <Tag label="CH" variant="circle" />
            <Tag label="CH" variant="circle" />
            <Tag label="CH" variant="circle" />
          </div>
        </InfoItem>
      </div>

      {/* 5. 하단 버튼 */}
      <button style={buttonStyle} onClick={handleButtonClick}>
        BUTTON
      </button>
    </div>
  );
};

export default PortfolioDetailPage;

