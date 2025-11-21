import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import '@/presentation/styles/global.css';
import TopNavLayout from '@/presentation/layouts/TopNavLayout';
import RootLayout from '@/presentation/layouts/RootLayout';

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
const LoginPage = lazy(() => import('@/presentation/pages/auth/LoginPage'));
const ImageCropPage = lazy(() => import('@/presentation/pages/image/ImageCropPage'));
const ChatRoomPage = lazy(() => import('@/presentation/pages/chat/ChatRoomPage'));

const AppRouter = () => (
  <BrowserRouter>
    {/*
      (유지) .app-container의 100vh 스타일을 유지합니다.
      이것이 RootLayout이 3단(헤더/컨텐츠/푸터) 분리 작업을
      수행하기 위한 기준 높이가 됩니다.
    */}
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
            <Route
              path="/"
              element={
                <Suspense fallback={null}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/clips"
              element={
                <Suspense fallback={null}>
                  <ClipsPage />
                </Suspense>
              }
            />
            <Route path="/live" element={<div>쇼핑라이브 페이지</div>} />
            <Route path="/news" element={<div>뉴스 페이지</div>} />
            <Route path="/event" element={<div>이벤트 페이지</div>} />
            <Route path="/service" element={<div>서비스 페이지</div>} />
            <Route
              path="/chat"
              element={
                <Suspense fallback={null}>
                  <ChatRoomPage />
                </Suspense>
              }
            />

            {/* (추가) BottomNavBar의 탭 경로들을 추가합니다. */}
            <Route
              path="/campaigns"
              element={
                <Suspense fallback={null}>
                  <CampaignsPage />
                </Suspense>
              }
            />
            <Route
              path="/campaigns/register"
              element={
                <Suspense fallback={null}>
                  <CampaignRegisterPage />
                </Suspense>
              }
            />
            <Route
              path="/models"
              element={
                <Suspense fallback={null}>
                  <ModelsPage />
                </Suspense>
              }
            />
            <Route
              path="/models/register"
              element={
                <Suspense fallback={null}>
                  <ModelRegisterPage />
                </Suspense>
              }
            />
            <Route
              path="/portfolios"
              element={
                <Suspense fallback={null}>
                  <PortfolioPage />
                </Suspense>
              }
            />
            <Route
              path="/portfolios/register"
              element={
                <Suspense fallback={null}>
                  <PortfolioRegisterPage />
                </Suspense>
              }
            />
            <Route
              path="/mypage/portfolios"
              element={
                <Suspense fallback={null}>
                  <MyPortfolioPage />
                </Suspense>
              }
            />
            <Route
              path="/mypage/clips"
              element={
                <Suspense fallback={null}>
                  <MyClipsPage />
                </Suspense>
              }
            />
            <Route
              path="/mypage/applied-campaigns"
              element={
                <Suspense fallback={null}>
                  <MyAppliedCampaignsPage />
                </Suspense>
              }
            />
            <Route
              path="/mypage"
              element={
                <Suspense fallback={null}>
                  <MyPage />
                </Suspense>
              }
            />
          </Route>

          {/* 상세 페이지는 TopNavLayout을 사용하지 않아 상단 바를 숨깁니다. */}
          <Route
            path="/campaigns/:id"
            element={
              <Suspense fallback={null}>
                <CampaignDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/models/:id"
            element={
              <Suspense fallback={null}>
                <ModelDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/portfolios/:id"
            element={
              <Suspense fallback={null}>
                <PortfolioDetailPage />
              </Suspense>
            }
          />

          {/*
            (참고) 3. TopNavLayout 밖에, RootLayout 안에
            경로를 선언하면(예: /login), 상단 탭바는 없지만
            하단 탭바는 있는 페이지를 만들 수 있습니다.
          */}
          <Route
            path="/login"
            element={
              <Suspense fallback={null}>
                <LoginPage />
              </Suspense>
            }
          />
        </Route>

        {/* 이미지 크롭 페이지 - 레이아웃 없이 전체 화면 */}
        <Route
          path="/image/crop"
          element={
            <Suspense fallback={null}>
              <ImageCropPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;
