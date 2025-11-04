import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../presentation/pages/Home';
import '../presentation/styles/global.css';
// (추가) 방금 생성한 레이아웃 컴포넌트를 import합니다.
import TopNavLayout from '../presentation/layouts/TopNavLayout';

const AppRouter = () => (
  <BrowserRouter>
    {/*
      (수정) .app-container를 <Home /> 내부가 아닌 라우터의 최상위로 이동시켰습니다.
      Flutter의 max-width 1200px를 모든 페이지에 일관되게 적용합니다.
    */}
    <div className="app-container" style={{ height: '100vh' }}>
      <Routes>
        {/*
          --- (수정) 중첩 라우트(Shell Route) 적용 ---
          
          1. 부모 <Route>가 TopNavLayout을 렌더링합니다.
             이 부모 <Route>는 path가 없습니다.
        */}
        <Route element={<TopNavLayout />}>
          {/*
            2. 자식 <Route>들
            이제 이 경로들은 <TopNavLayout>의 <Outlet /> 내부에 렌더링됩니다.
            Flutter 라우터의 자식 경로들을 참고했습니다.
          */}
          <Route path="/" element={<Home />} />

          {/* (추가) 탭바에 있는 나머지 페이지들의 라우트 (임시) */}
          <Route path="/clips" element={<div>클립 페이지</div>} />
          <Route path="/live" element={<div>쇼핑라이브 페이지</div>} />
          <Route path="/news" element={<div>뉴스 페이지</div>} />
          <Route path="/event" element={<div>이벤트 페이지</div>} />
          <Route path="/service" element={<div>서비스 페이지</div>} />
        </Route>

        {/*
          (참고) 만약 /login 처럼 탭바가 *없는* 페이지를 만든다면,
          이 <Route> 그룹 밖에 별도로 선언하면 됩니다.
        */}
        {/* <Route path="/login" element={<div>로그인 페이지</div>} /> */}
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;