import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '@/presentation/components/navigation/AppHeader';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';

// 메인 헤더가 노출되는 페이지 목록
const MAIN_HEADER_PATHS = new Set([
  ROUTE_PATHS.home,
  ROUTE_PATHS.news,
  ROUTE_PATHS.clips,
  ROUTE_PATHS.community,
  ROUTE_PATHS.campaigns,
  ROUTE_PATHS.portfolios, // 쇼호스트
  ROUTE_PATHS.models,
  ROUTE_PATHS.myPage,
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
  ROUTE_PATHS.communityDetail,
]);

const TopNavLayout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // 뒤로가기 헤더가 있는 페이지인지 확인
  const hasBackHeader = BACK_HEADER_PATHS.has(currentPath) || 
    currentPath.startsWith('/campaigns/') && currentPath !== ROUTE_PATHS.campaigns && currentPath !== ROUTE_PATHS.campaignRegister ||
    currentPath.startsWith('/models/') && currentPath !== ROUTE_PATHS.models && currentPath !== ROUTE_PATHS.modelRegister ||
    currentPath.startsWith('/portfolios/') && currentPath !== ROUTE_PATHS.portfolios && currentPath !== ROUTE_PATHS.portfolioRegister ||
    currentPath.startsWith('/chat/') ||
    currentPath.startsWith('/community/') && currentPath !== ROUTE_PATHS.community;
  
  // 메인 헤더 노출 여부 (뒤로가기 헤더가 있으면 숨김)
  const showAppHeader = MAIN_HEADER_PATHS.has(currentPath) && !hasBackHeader;

  return (
    <div>
      {showAppHeader && <AppHeader />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TopNavLayout;