import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/presentation/contexts/ToastContext';
// global.css의 CSS 변수(색상)와 .hide-scrollbar 클래스를 사용합니다.
import '@/presentation/styles/global.css';

/**
 * Flutter 원본의
 * 탭 메뉴 데이터를 React 상수로 정의
 */
const TABS = [
    { label: '숏클립', path: '/clips' },
    { label: '쇼핑라이브', path: '/live' },
    { label: '뉴스', path: '/news' },
    { label: '이벤트', path: '/event' },
    { label: '서비스', path: '/service' },
];

/**
 * Flutter 원본의
 * "준비중" 경로 데이터를 React 상수로 정의
 */
const COMING_SOON_PATHS = ['/live', '/event', '/service'];

/**
 * 앱 상단에 고정되는 탭 네비게이션 바 컴포넌트
 * Flutter의 CommonTopTabBar 위젯에 해당합니다.
 */
const TopTabBar: React.FC = () => {
    // 1. React Router의 훅을 사용하여 현재 경로와 네비게이션 함수를 가져옵니다.
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();

    /**
     * 2. 탭 클릭 시 실행될 핸들러
     */
    const handleTabClick = (path: string) => {
        // Flutter 원본의 "준비중" 토스트 로직
        if (COMING_SOON_PATHS.includes(path)) {
            showToast('준비중인 기능입니다.');
        } else {
            // Flutter의 context.go(path) 로직
            navigate(path);
        }
    };

    // --- 3. 스타일 정의 ---

    /** 가로 스크롤 컨테이너 스타일 (Flutter의 SingleChildScrollView) */
    const containerStyle: React.CSSProperties = {
        width: '100%',
        backgroundColor: 'var(--white)',
        borderBottom: '1px solid #F7F8FA', // --background-color
        display: 'flex',
        overflowX: 'auto', // 가로 스크롤 활성화
        overflowY: 'hidden',
        boxSizing: 'border-box',
    };

    /** (추가) 탭 버튼들을 감싸서 중앙 정렬시키는 래퍼 */
    const innerWrapperStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto', // (핵심) 이 부분이 탭 그룹을 중앙 정렬시킴
        padding: '0 12px', // container의 좌우 패딩을 여기로 이동
        flexShrink: 0, // 스크롤 시 찌그러지지 않도록
    };

    /** 개별 탭 버튼 (TextButton) 스타일 */
    const tabButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        padding: '20px 20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0, // 가로 스크롤 시 탭이 찌그러지지 않도록 설정
    };

    // --- 4. 렌더링 ---
    return (
        // 1. 스크롤 컨테이너
        <div style={containerStyle} className="hide-scrollbar">
            {/* 2. (추가) 중앙 정렬 래퍼 */}
            <div style={innerWrapperStyle}>
                {TABS.map((tab) => {
                    const isActive = location.pathname === tab.path;

                    /** 탭 텍스트 스타일 */
                    const textStyle: React.CSSProperties = {
                        fontSize: 'var(--h2)',
                        color: 'var(--dark-gray)',
                        fontWeight: 'normal',
                    };

                    /** 하단 밑줄 스타일 (변경 없음) */
                    const underlineStyle: React.CSSProperties = {
                        marginTop: 2,
                        height: 3,
                        width: 30,
                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                        borderRadius: 3,
                    };

                    return (
                        <button
                            key={tab.path}
                            style={tabButtonStyle}
                            onClick={() => handleTabClick(tab.path)}
                        >
                            <span style={textStyle}>{tab.label}</span>
                            <div style={underlineStyle} />
                        </button>
                    );
                })}
            </div>
            {/* --- 중앙 정렬 래퍼 종료 --- */}
        </div>
        /* --- 스크롤 컨테이너 종료 --- */
    );
};

export default TopTabBar;