import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import '@/presentation/styles/global.css';
import TopNavLayout from '@/presentation/layouts/TopNavLayout';
import RootLayout from '@/presentation/layouts/RootLayout';
import { AuthProvider } from '@/presentation/hooks/auth/useAuth';
import { AuthGuard } from '@/presentation/routes/AuthGuard';
import { ROUTE_PATHS, ROUTE_ROLE_PERMISSIONS } from '@/app/routes/routeMeta';
import { RouteFallback } from '@/presentation/components/states/RouteFallback';
import { error as logError } from '@/shared/utils/logger';

// 동적 임포트에 에러 핸들링 추가 (Vite HMR 이슈 대응)
const lazyWithRetry = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> => {
  return lazy(() =>
    importFn().catch((error) => {
      logError('Router', 'Failed to load module:', error);
      // 재시도 로직: 1초 후 다시 시도
      return new Promise((resolve) => {
        setTimeout(() => {
          importFn()
            .then(resolve)
            .catch((retryError) => {
              logError('Router', 'Retry failed:', retryError);
              throw retryError;
            });
        }, 1000);
      });
    })
  );
};

const Home = lazyWithRetry(() => import('@/presentation/pages/home/Home'));
const CampaignsPage = lazyWithRetry(() => import('@/presentation/pages/campaign/CampaignsPage'));
const CampaignRegisterPage = lazyWithRetry(() => import('@/presentation/pages/campaign/CampaignRegisterPage'));
const CampaignDetailPage = lazyWithRetry(() => import('@/presentation/pages/campaign/CampaignDetailPage'));
const ModelsPage = lazyWithRetry(() => import('@/presentation/pages/model/ModelsPage'));
const ModelRegisterPage = lazyWithRetry(() => import('@/presentation/pages/model/ModelRegisterPage'));
const ModelDetailPage = lazyWithRetry(() => import('@/presentation/pages/model/ModelDetailPage'));
const PortfolioPage = lazyWithRetry(() => import('@/presentation/pages/portfolio/PortfolioPage'));
const PortfolioRegisterPage = lazyWithRetry(() => import('@/presentation/pages/portfolio/PortfolioRegisterPage'));
const PortfolioDetailPage = lazyWithRetry(() => import('@/presentation/pages/portfolio/PortfolioDetailPage'));
const MyPortfolioPage = lazyWithRetry(() => import('@/presentation/pages/portfolio/MyPortfolioPage'));
const MyPage = lazyWithRetry(() => import('@/presentation/pages/mypage/MyPage'));
const ClipsPage = lazyWithRetry(() => import('@/presentation/pages/clip/ClipsPage'));
const MyClipsPage = lazyWithRetry(() => import('@/presentation/pages/clip/MyClipsPage'));
const MyAppliedCampaignsPage = lazyWithRetry(() => import('@/presentation/pages/mypage/MyAppliedCampaignsPage'));
const MessagesPage = lazyWithRetry(() => import('@/presentation/pages/message/MessagesPage'));
const LoginPage = lazyWithRetry(() => import('@/presentation/pages/auth/LoginPage'));
const SignupPage = lazyWithRetry(() => import('@/presentation/pages/auth/SignupPage'));
const ImageCropPage = lazyWithRetry(() => import('@/presentation/pages/image/ImageCropPage'));
const ChatRoomPage = lazyWithRetry(() => import('@/presentation/pages/chat/ChatRoomPage'));

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
          {/* 회원가입 페이지 - 하단 네비게이션 표시 */}
          <Route
            path={ROUTE_PATHS.signup}
            element={
              <AuthGuard requireAuth={false} guestOnly redirectTo={ROUTE_PATHS.myPage}>
                <SignupPage />
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
