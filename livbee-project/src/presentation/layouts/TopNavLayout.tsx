import React from 'react';
import { Outlet } from 'react-router-dom';
import TopTabBar from '../components/TopTabBar'; // 방금 만든 탭바

/**
 * 상단 탭바(TopTabBar)를 포함하는 레이아웃 셸(Shell)입니다.
 * 이 라우트의 자식(children) 경로는 모두 <Outlet /> 위치에 렌더링됩니다.
 * Flutter의 TopBarShellScreen과 동일한 역할입니다.
 */
const TopNavLayout: React.FC = () => {
  return (
    // Flutter의 Column[TabBar, Expanded(child)] 레이아웃과 동일하게 구현
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 1. 상단 탭바 (고정) */}
      <TopTabBar />

      {/* 2. 실제 페이지 내용 (교체됨) */}
      {/*
        <Outlet />은 react-router-dom이 제공하는 컴포넌트로,
        자식 라우트(예: <Home />, <ClipsPage />)가 렌더링될 위치를 지정합니다.
      */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default TopNavLayout;