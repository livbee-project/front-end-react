import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/presentation/pages/home/Home';
import '@/presentation/styles/global.css';
import TopNavLayout from '@/presentation/layouts/TopNavLayout';
import RootLayout from '@/presentation/layouts/RootLayout';
import CampaignsPage from '@/presentation/pages/campaign/CampaignsPage';
import CampaignRegisterPage from '@/presentation/pages/campaign/CampaignRegisterPage';
import CampaignDetailPage from '@/presentation/pages/campaign/CampaignDetailPage';
import ModelsPage from '@/presentation/pages/model/ModelsPage';
import ModelRegisterPage from '@/presentation/pages/model/ModelRegisterPage';
import ModelDetailPage from '@/presentation/pages/model/ModelDetailPage';
import PortfolioPage from '@/presentation/pages/portfolio/PortfolioPage';
import PortfolioRegisterPage from '@/presentation/pages/portfolio/PortfolioRegisterPage';
import PortfolioDetailPage from '@/presentation/pages/portfolio/PortfolioDetailPage';
import MyPortfolioPage from '@/presentation/pages/portfolio/MyPortfolioPage';
import MyPage from '@/presentation/pages/mypage/MyPage';
import ClipsPage from '@/presentation/pages/clip/ClipsPage';
import MyClipsPage from '@/presentation/pages/clip/MyClipsPage';
import LoginPage from '@/presentation/pages/auth/LoginPage';
import ImageCropPage from '@/presentation/pages/image/ImageCropPage';

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
            <Route path="/" element={<Home />} />
            <Route path="/clips" element={<ClipsPage />} />
            <Route path="/live" element={<div>쇼핑라이브 페이지</div>} />
            <Route path="/news" element={<div>뉴스 페이지</div>} />
            <Route path="/event" element={<div>이벤트 페이지</div>} />
            <Route path="/service" element={<div>서비스 페이지</div>} />

            {/* (추가) BottomNavBar의 탭 경로들을 추가합니다. */}
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/register" element={<CampaignRegisterPage />} />
            <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
            <Route path="/models" element={<ModelsPage />} />
            <Route path="/models/register" element={<ModelRegisterPage />} />
            <Route path="/models/:id" element={<ModelDetailPage />} />
            <Route path="/portfolios" element={<PortfolioPage />} />
            <Route path="/portfolios/register" element={<PortfolioRegisterPage />} />
            <Route path="/portfolios/:id" element={<PortfolioDetailPage />} />
            <Route path="/mypage/portfolios" element={<MyPortfolioPage />} />
            <Route path="/mypage/clips" element={<MyClipsPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>

          {/*
            (참고) 3. TopNavLayout 밖에, RootLayout 안에
            경로를 선언하면(예: /login), 상단 탭바는 없지만
            하단 탭바는 있는 페이지를 만들 수 있습니다.
          */}
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* 이미지 크롭 페이지 - 레이아웃 없이 전체 화면 */}
        <Route path="/image/crop" element={<ImageCropPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;
