import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../presentation/pages/Home';
import '../presentation/styles/global.css';
// (추가) 방금 생성한 레이아웃 컴포넌트를 import합니다.
import TopNavLayout from '../presentation/layouts/TopNavLayout';

const AppRouter = () => (
  <BrowserRouter>
    {/*
      (수정) .app-container에서 style={{ height: '100vh' }} 를 제거합니다.
      이제 이 div는 페이지 컨텐츠의 길이에 따라 자연스럽게 늘어납니다.
    */}
    <div className="app-container">
      <Routes>
        <Route element={<TopNavLayout />}>
          {/* ... (자식 라우트들은 변경 없음) ... */}
          <Route path="/" element={<Home />} />
          <Route path="/clips" element={<div>클립 페이지</div>} />
          <Route path="/live" element={<div>쇼핑라이브 페이지</div>} />
          <Route path="/news" element={<div>뉴스 페이지</div>} />
          <Route path="/event" element={<div>이벤트 페이지</div>} />
          <Route path="/service" element={<div>서비스 페이지</div>} />
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;