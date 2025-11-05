import React from 'react';

import BannerSliderSection from './BannerSliderSection';
import ShoppingLiveSection from './ShoppingLiveSection';
import BrandPickSection from './BrandPickSection';
import LivbeeNewsSection from './LivbeeNewsSection';
import HowShowhostSection from './HowShowhostSection';
import ConceptModelSection from './ConceptModelSection';
import HotClipSection from './HotClipSection';

// (유지) 스크롤바 숨기기 클래스를 위해 import
import '../../styles/global.css';

/**
 * 홈 페이지 컴포넌트
 * 이제 이 컴포넌트는 공통 컴포넌트(SectionContainer, RecruitCard)를
 * 조립하는 역할만 담당합니다.
 */
const Home: React.FC = () => {
  // (수정) React.FC 반환 타입에 맞게 <></> (Fragment) 대신
  // 최상위 <div className="app-container">로 변경합니다.
  return (
    <div className="app-container">
      {/* 1. (추가) 배너 슬라이더 섹션 */}
      {/*
        Flutter 원본의 BannerSliderSection 위치와
        간격(SizedBox(height: 24))을 동일하게 적용
      */}
      <div style={{ marginBottom: 24 }}>
        <BannerSliderSection />
      </div>

      {/* "지금 뜨는 쇼핑라이브" 섹션 */}
      <ShoppingLiveSection />

      {/* "브랜드 픽" 섹션 */}
      <BrandPickSection />

      {/* "라이비 뉴스" 섹션 */}
      <LivbeeNewsSection />

      {/* "이런 쇼호스트는 어떠세요?" 섹션 */}
      <HowShowhostSection />

      {/* "컨셉에 맞는 모델찾기" 섹션 */}
      <ConceptModelSection />

      {/* "HOT CLIP" 섹션 */}
      <HotClipSection />
    </div>
  );
};

export default Home;
