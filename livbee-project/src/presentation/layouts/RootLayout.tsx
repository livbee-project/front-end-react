import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
// import CommonHeader from '../components/CommonHeader'; // (주석 처리) Flutter의 CommonHeader에 해당하는 로고 헤더가 추후 이 자리에 추가될 수 있습니다.

/**
 * 앱 전체의 최상위 셸(Shell) 레이아웃입니다.
 * 화면을 [헤더(미구현)], [컨텐츠(스크롤)], [하단 탭바(고정)] 3단으로 분리합니다.
 * Flutter의 RootShellScreen 위젯에 해당합니다.
 */
const RootLayout: React.FC = () => {
  /**
   * (1) 최상위 컨테이너 스타일
   * 이 컴포넌트를 감싸는 부모(.app-container)가 100vh여야 합니다.
   * [헤더]
   * [컨텐츠] (남은 공간 모두 차지 + 스크롤)
   * [푸터]
   */
  const rootStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // 부모(.app-container)의 100vh를 채움
  };

  /**
   * (2) 컨텐츠 영역 스타일 (스크롤 O)
   * flex: 1을 주어 헤더와 풋터를 제외한 모든 공간을 차지하게 하고,
   * overflowY: 'auto'로 컨텐츠가 길어질 경우 이 영역만 스크롤되게 합니다.
   */
  const contentStyle: React.CSSProperties = {
    flex: 1, // 남은 공간 모두 차지
    overflowY: 'auto', // 세로 스크롤 활성화
    overflowX: 'hidden', // 가로 스크롤 방지
  };

  /**
   * (3) 헤더/풋터 영역 스타일 (고정)
   * flexShrink: 0으로 설정하여 공간이 부족해도 줄어들지 않게 합니다.
   */
  const headerFooterStyle: React.CSSProperties = {
    flexShrink: 0,
  };

  return (
    <div style={rootStyle}>
      {/* (주석 처리) Flutter의 CommonHeader에 해당하는
        로고 헤더가 추후 이 자리에 추가될 수 있습니다.
      <header style={headerFooterStyle}>
        <CommonHeader /> 
      </header>
      */}

      {/* (핵심) 스크롤이 되는 메인 컨텐츠 영역
        TopNavLayout과 그 자식(Home 등)이 이 <Outlet>에 렌더링됩니다.
      */}
      <main style={contentStyle}>
        <Outlet />
      </main>

      {/* (핵심) 하단 고정 네비게이션 바
        Flutter의 bottomNavigationBar에 해당합니다.
      */}
      <footer style={headerFooterStyle}>
        <BottomNavBar />
      </footer>
    </div>
  );
};

export default RootLayout;
