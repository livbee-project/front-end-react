import React from 'react';
import styled from 'styled-components';

/**
 * BottomNavItem이 받을 props 타입을 정의합니다.
 * @param label - 탭에 표시될 텍스트
 * @param icon - 탭에 표시될 아이콘
 * @param isActive - 이 탭이 현재 활성화되었는지 여부
 * @param onClick - 탭 버튼 클릭 시 실행될 함수
 */
interface BottomNavItemProps {
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  isActive: boolean;
  onClick: () => void;
}

/**
 * BottomNavBar의 개별 탭 아이템 UI 컴포넌트
 * (BottomNavBar.tsx의 map 루프 내부 로직을 분리)
 */
const BottomNavItem: React.FC<BottomNavItemProps> = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <TabButton $isActive={isActive} onClick={onClick} aria-label={label}>
      <IconWrapper $isActive={isActive}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
      </IconWrapper>
      <NavLabel $isActive={isActive}>{label}</NavLabel>
    </TabButton>
  );
};

const TabButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 16px;
  min-width: 60px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.secondary : 'transparent'};
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const IconWrapper = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.muted};
  transition: color 0.2s ease-in-out;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  svg {
    flex-shrink: 0;
  }
`;

const NavLabel = styled.span<{ $isActive: boolean }>`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.muted};
  font-weight: ${({ $isActive }) => ($isActive ? 500 : 300)};
  white-space: nowrap;
  line-height: 1.4;
  transition: all 0.2s ease-in-out;
`;

export default BottomNavItem;
