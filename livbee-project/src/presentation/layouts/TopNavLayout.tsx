import React from 'react';
import { Outlet } from 'react-router-dom';
import TopTabBar from '../components/TopTabBar'; // 방금 만든 탭바

const TopNavLayout: React.FC = () => {
    return (
        /*
          (수정) height: '100%' 및 flex/column 스타일을 제거합니다.
          이제 이 div는 일반적인 block 요소처럼 동작합니다.
        */
        <div>
            {/* 1. 상단 탭바 (먼저 렌더링됨) */}
            <TopTabBar />

            {/* 2. 실제 페이지 내용 (탭바 바로 아래에 렌더링됨) */}
            {/*
          (수정) <main> 태그의 flex: 1, overflowY: 'auto' 스타일을 제거합니다.
          이제 Home.tsx의 내용이 길어지면 <main> 태그가 길어지고,
          결과적으로 브라우저(window) 전체가 스크롤됩니다.
        */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default TopNavLayout;