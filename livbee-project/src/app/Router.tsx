import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../presentation/pages/Home';
import '../presentation/styles/global.css';
import TopNavLayout from '../presentation/layouts/TopNavLayout';
import RootLayout from '../presentation/layouts/RootLayout';

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
            <Route path='/' element={<Home />} />
            <Route path='/clips' element={<div>클립 페이지</div>} />
            <Route path='/live' element={<div>쇼핑라이브 페이지</div>} />
            <Route path='/news' element={<div>뉴스 페이지</div>} />
            <Route path='/event' element={<div>이벤트 페이지</div>} />
            <Route path='/service' element={<div>서비스 페이지</div>} />

            {/* (추가) BottomNavBar의 탭 경로들을 추가합니다. */}
            <Route path='/campaigns' element={<div>모집공고 페이지</div>} />
            <Route path='/models' element={<div>모델 페이지</div>} />
            <Route path='/portfolios' element={<div>포트폴리오 페이지</div>} />
            <Route path='/mypage' element={<div>마이페이지</div>} />
          </Route>

          {/*
            (참고) 3. TopNavLayout 밖에, RootLayout 안에
            경로를 선언하면(예: /login), 상단 탭바는 없지만
            하단 탭바는 있는 페이지를 만들 수 있습니다.
          */}
          {/* <Route path="/login" element={<div>로그인 페이지</div>} /> */}
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;
