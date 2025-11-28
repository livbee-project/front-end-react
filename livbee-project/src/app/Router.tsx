import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import '@/presentation/styles/global.css';
import TopNavLayout from '@/presentation/layouts/TopNavLayout';
import RootLayout from '@/presentation/layouts/RootLayout';
import { AuthProvider } from '@/presentation/hooks/useAuth';
import { AuthGuard } from '@/presentation/routes/AuthGuard';
import { ROUTE_PATHS, ROUTE_ROLE_PERMISSIONS } from './routes/routeMeta';
import { RouteFallback } from '@/presentation/components/states/RouteFallback';

const Home = lazy(() => import('@/presentation/pages/home/Home'));
const CampaignsPage = lazy(() => import('@/presentation/pages/campaign/CampaignsPage'));
const CampaignRegisterPage = lazy(() => import('@/presentation/pages/campaign/CampaignRegisterPage'));
const CampaignDetailPage = lazy(() => import('@/presentation/pages/campaign/CampaignDetailPage'));
const ModelsPage = lazy(() => import('@/presentation/pages/model/ModelsPage'));
const ModelRegisterPage = lazy(() => import('@/presentation/pages/model/ModelRegisterPage'));
const ModelDetailPage = lazy(() => import('@/presentation/pages/model/ModelDetailPage'));
const PortfolioPage = lazy(() => import('@/presentation/pages/portfolio/PortfolioPage'));
const PortfolioRegisterPage = lazy(() => import('@/presentation/pages/portfolio/PortfolioRegisterPage'));
const PortfolioDetailPage = lazy(() => import('@/presentation/pages/portfolio/PortfolioDetailPage'));
const MyPortfolioPage = lazy(() => import('@/presentation/pages/portfolio/MyPortfolioPage'));
const MyPage = lazy(() => import('@/presentation/pages/mypage/MyPage'));
const ClipsPage = lazy(() => import('@/presentation/pages/clip/ClipsPage'));
const MyClipsPage = lazy(() => import('@/presentation/pages/clip/MyClipsPage'));
const MyAppliedCampaignsPage = lazy(() => import('@/presentation/pages/mypage/MyAppliedCampaignsPage'));
const MessagesPage = lazy(() => import('@/presentation/pages/message/MessagesPage'));
const LoginPage = lazy(() => import('@/presentation/pages/auth/LoginPage'));
const ImageCropPage = lazy(() => import('@/presentation/pages/image/ImageCropPage'));
const ChatRoomPage = lazy(() => import('@/presentation/pages/chat/ChatRoomPage'));

const AppRouter = () => (
  <BrowserRouter>
    <AuthProvider>
      <Suspense fallback={<RouteFallback />}>
        <div className="app-container" style={{ height: '100vh' }}>
          <Routes>
        {/*
          --- (수정) 최상위 Shell Route 적용 ---

          1. <RootLayout />을 최상위 element로 하는 Route가
             다른 모든 라우트를 감쌉니다.
             이제 모든 페이지에 BottomNavBar가 고정됩니다.
        */}
        <Route element={<RootLayout />}>
          {/*
            2. 기존 <TopNavLayout />은 RootLayout의 자식이 됩니다.
            이 경로들은 상단 탭바(TopNavLayout)와
            하단 탭바(RootLayout)를 모두 갖게 됩니다.
            (Flutter의 Shell-in-a-Shell 구조와 동일)
          */}
          <Route element={<TopNavLayout />}>
            {/* 기존 탭 페이지들 */}
            <Route path={ROUTE_PATHS.home} element={<Home />} />
            <Route path={ROUTE_PATHS.clips} element={<ClipsPage />} />
            <Route path={ROUTE_PATHS.live} element={<div>쇼핑라이브 페이지</div>} />
            <Route path={ROUTE_PATHS.news} element={<div>뉴스 페이지</div>} />
            <Route path={ROUTE_PATHS.event} element={<div>이벤트 페이지</div>} />
            <Route path={ROUTE_PATHS.service} element={<div>서비스 페이지</div>} />

            {/* (추가) BottomNavBar의 탭 경로들을 추가합니다. */}
            <Route path={ROUTE_PATHS.campaigns} element={<CampaignsPage />} />
            <Route
              path={ROUTE_PATHS.campaignRegister}
              element={
                <AuthGuard requireAuth allowedRoles={ROUTE_ROLE_PERMISSIONS[ROUTE_PATHS.campaignRegister]}>
                  <CampaignRegisterPage />
                </AuthGuard>
              }
            />
            <Route path={ROUTE_PATHS.models} element={<ModelsPage />} />
            <Route
              path={ROUTE_PATHS.modelRegister}
              element={
                <AuthGuard requireAuth allowedRoles={ROUTE_ROLE_PERMISSIONS[ROUTE_PATHS.modelRegister]}>
                  <ModelRegisterPage />
                </AuthGuard>
              }
            />
            <Route path={ROUTE_PATHS.portfolios} element={<PortfolioPage />} />
            <Route
              path={ROUTE_PATHS.portfolioRegister}
              element={
                <AuthGuard
                  requireAuth
                  allowedRoles={ROUTE_ROLE_PERMISSIONS[ROUTE_PATHS.portfolioRegister]}
                >
                  <PortfolioRegisterPage />
                </AuthGuard>
              }
            />
            <Route
              path={ROUTE_PATHS.myPortfolio}
              element={
                <AuthGuard requireAuth allowedRoles={ROUTE_ROLE_PERMISSIONS[ROUTE_PATHS.myPortfolio]}>
                  <MyPortfolioPage />
                </AuthGuard>
              }
            />
            <Route
              path={ROUTE_PATHS.myClips}
              element={
                <AuthGuard requireAuth allowedRoles={ROUTE_ROLE_PERMISSIONS[ROUTE_PATHS.myClips]}>
                  <MyClipsPage />
                </AuthGuard>
              }
            />
            <Route
              path={ROUTE_PATHS.myAppliedCampaigns}
              element={
                <AuthGuard
                  requireAuth
                  allowedRoles={ROUTE_ROLE_PERMISSIONS[ROUTE_PATHS.myAppliedCampaigns]}
                >
                  <MyAppliedCampaignsPage />
                </AuthGuard>
              }
            />
            <Route
              path={ROUTE_PATHS.myMessages}
              element={
                <AuthGuard requireAuth>
                  <MessagesPage />
                </AuthGuard>
              }
            />
            <Route
              path={ROUTE_PATHS.myPage}
              element={
                <AuthGuard requireAuth>
                  <MyPage />
                </AuthGuard>
              }
            />
          </Route>

          {/* 채팅방 페이지는 TopNavLayout 밖에 위치 (상단 탭바 없음) */}
          <Route
            path={ROUTE_PATHS.chat}
            element={
              <AuthGuard requireAuth>
                <ChatRoomPage />
              </AuthGuard>
            }
          />
          <Route
            path={ROUTE_PATHS.chatRoom}
            element={
              <AuthGuard requireAuth>
                <ChatRoomPage />
              </AuthGuard>
            }
          />

          {/* 상세 페이지는 TopNavLayout을 사용하지 않아 상단 바를 숨깁니다. */}
          <Route path={ROUTE_PATHS.campaignDetail} element={<CampaignDetailPage />} />
          <Route path={ROUTE_PATHS.modelDetail} element={<ModelDetailPage />} />
          <Route path={ROUTE_PATHS.portfolioDetail} element={<PortfolioDetailPage />} />

          {/* 로그인 페이지 - 하단 네비게이션 표시 */}
          <Route
            path={ROUTE_PATHS.login}
            element={
              <AuthGuard requireAuth={false} guestOnly redirectTo={ROUTE_PATHS.myPage}>
                <LoginPage />
              </AuthGuard>
            }
          />
        </Route>

        {/* 이미지 크롭 페이지 - 레이아웃 없이 전체 화면 (하단 네비게이션 없음) */}
        <Route
          path={ROUTE_PATHS.imageCrop}
          element={
            <AuthGuard requireAuth>
              <ImageCropPage />
            </AuthGuard>
          }
        />
      </Routes>
    </div>
      </Suspense>
    </AuthProvider>
  </BrowserRouter>
);

export default AppRouter;
