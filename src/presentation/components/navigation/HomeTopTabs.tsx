import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/presentation/contexts/ToastContext';

const TAB_ITEMS = [
  { label: '홈', path: '/' },
  { label: '쇼핑라이브', path: '/live' },
  { label: '뉴스', path: '/news' },
  { label: '숏클립', path: '/clips' },
  { label: '커뮤니티', path: '/community' },
  { label: '이벤트', path: '/event' },
  { label: '서비스', path: '/service' },
];

const comingSoon = ['/live', '/event', '/service'];

const TabsWrapper = styled.div`
  position: sticky;
  top: 6.75rem;
  z-index: 40;
  background-color: ${({ theme }) => theme.colors.background};
`;

const TabsInner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 0 ${({ theme }) => theme.layout.pagePadding.mobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.layout.pagePadding.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.layout.pagePadding.desktop};
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  border: none;
  background: none;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ theme, $active }) => ($active ? theme.colors.foreground : theme.colors.muted)};
  padding: 1rem 0.5rem;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme, $active }) => ($active ? theme.colors.foreground : 'transparent')};
  transition: color 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }

  &:first-of-type {
    padding-left: 0;
  }
`;

const HomeTopTabs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleClick = (path: string) => {
    if (comingSoon.includes(path)) {
      showToast('준비중인 서비스입니다.');
      return;
    }
    navigate(path);
  };

  return (
    <TabsWrapper>
      <TabsInner>
        {TAB_ITEMS.map((tab) => (
          <TabButton key={tab.path} $active={location.pathname === tab.path} onClick={() => handleClick(tab.path)} type="button">
            {tab.label}
          </TabButton>
        ))}
      </TabsInner>
    </TabsWrapper>
  );
};

export default HomeTopTabs;

