import React from 'react';

import ShoppingLiveSection from './home/ShoppingLiveSection';
import BrandPickSection from './home/BrandPickSection';
import LivbeeNewsSection from './home/LivbeeNewsSection';

// (유지) 스크롤바 숨기기 클래스를 위해 import
import '../styles/global.css';

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
      {/* "지금 뜨는 쇼핑라이브" 섹션 */}
      <ShoppingLiveSection />

      {/* "브랜드 픽" 섹션 */}
      <BrandPickSection />

      {/* "라이비 뉴스" 섹션 */}
      <LivbeeNewsSection />
    </div>
  );
};

export default Home;