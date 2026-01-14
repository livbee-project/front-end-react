import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/presentation/contexts/ToastContext';
import { H2 } from '@/presentation/components/styled/Typography';
// global.css의 .hide-scrollbar 클래스를 사용합니다.
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

    // --- 4. 렌더링 ---
    return (
        // 1. 스크롤 컨테이너
        <Container className="hide-scrollbar">
            {/* 2. (추가) 중앙 정렬 래퍼 */}
            <InnerWrapper>
                {TABS.map((tab) => {
                    const isActive = location.pathname === tab.path;

                    return (
                        <TabButton
                            key={tab.path}
                            onClick={() => handleTabClick(tab.path)}
                        >
                            <TabText>{tab.label}</TabText>
                            <Underline $isActive={isActive} />
                        </TabButton>
                    );
                })}
            </InnerWrapper>
            {/* --- 중앙 정렬 래퍼 종료 --- */}
        </Container>
        /* --- 스크롤 컨테이너 종료 --- */
    );
};

const Container = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    box-sizing: border-box;
`;

const InnerWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    flex-shrink: 0;
`;

const TabButton = styled.button`
    background: none;
    border: none;
    padding: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const TabText = styled(H2)`
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 400;
    margin: 0;
`;

const Underline = styled.div<{ $isActive: boolean }>`
    margin-top: 2px;
    height: 3px;
    width: 30px;
    background-color: ${({ $isActive, theme }) =>
        $isActive ? theme.colors.primary : 'transparent'};
    border-radius: 3px;
`;

export default TopTabBar;