import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HomeNavBar from '@/presentation/components/navigation/HomeNavBar';
import HomeTopTabs from '@/presentation/components/navigation/HomeTopTabs';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';

// 메인 헤더가 노출되는 페이지 목록
const MAIN_HEADER_PATHS = new Set([
  ROUTE_PATHS.home,
  ROUTE_PATHS.news,
  ROUTE_PATHS.clips, // 커뮤니티
  ROUTE_PATHS.campaigns,
  ROUTE_PATHS.portfolios, // 쇼호스트
  ROUTE_PATHS.models,
  ROUTE_PATHS.myPage,
]);

// 상단 탭이 노출되는 페이지 목록 (홈, 뉴스, 커뮤니티)
const TOP_TABS_PATHS = new Set([
  ROUTE_PATHS.home,
  ROUTE_PATHS.news,
  ROUTE_PATHS.clips, // 커뮤니티
]);

// 뒤로가기 헤더가 있는 페이지 (메인 헤더 숨김)
const BACK_HEADER_PATHS = new Set([
  ROUTE_PATHS.campaignDetail,
  ROUTE_PATHS.modelDetail,
  ROUTE_PATHS.portfolioDetail,
  ROUTE_PATHS.campaignRegister,
  ROUTE_PATHS.modelRegister,
  ROUTE_PATHS.portfolioRegister,
  ROUTE_PATHS.myPortfolio,
  ROUTE_PATHS.myClips,
  ROUTE_PATHS.myAppliedCampaigns,
  ROUTE_PATHS.myMessages,
  ROUTE_PATHS.chat,
  ROUTE_PATHS.chatRoom,
]);

const TopNavLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // 뒤로가기 헤더가 있는 페이지인지 확인
  const hasBackHeader = BACK_HEADER_PATHS.has(currentPath) || 
    currentPath.startsWith('/campaigns/') && currentPath !== ROUTE_PATHS.campaigns && currentPath !== ROUTE_PATHS.campaignRegister ||
    currentPath.startsWith('/models/') && currentPath !== ROUTE_PATHS.models && currentPath !== ROUTE_PATHS.modelRegister ||
    currentPath.startsWith('/portfolios/') && currentPath !== ROUTE_PATHS.portfolios && currentPath !== ROUTE_PATHS.portfolioRegister ||
    currentPath.startsWith('/chat/');
  
  // 메인 헤더 노출 여부 (뒤로가기 헤더가 있으면 숨김)
  const showMainHeader = MAIN_HEADER_PATHS.has(currentPath) && !hasBackHeader;
  
  // 상단 탭 노출 여부 (홈, 뉴스, 커뮤니티만)
  const showTopTabs = TOP_TABS_PATHS.has(currentPath) && !hasBackHeader;

  return (
    <div>
      {showMainHeader && <HomeNavBar />}
      {showTopTabs && <HomeTopTabs />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TopNavLayout;