import React from 'react';
import styled from 'styled-components';
import { Caption } from '@/presentation/components/styled/Typography';

/**
 * BottomNavItem이 받을 props 타입을 정의합니다.
 * @param label - 탭에 표시될 텍스트
 * @param icon - 탭에 표시될 아이콘 (임시 텍스트)
 * @param isActive - 이 탭이 현재 활성화되었는지 여부
 * @param onClick - 탭 버튼 클릭 시 실행될 함수
 */
interface BottomNavItemProps {
  label: string;
  icon: React.ElementType;
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
    <TabButton onClick={onClick}>
      <IconWrapper $isActive={isActive}>
        <Icon size={20} />
      </IconWrapper>
      <LabelText $isActive={isActive}>{label}</LabelText>
    </TabButton>
  );
};

const TabButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  gap: ${({ theme }) => theme.spacing.sm};
  background: none;
  border: none;
  cursor: pointer;
`;

const IconWrapper = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.muted};
  transition: color 0.1s ease;
  display: flex;
  align-items: center;
`;

const LabelText = styled(Caption)<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.muted};
  transition: color 0.1s ease;
  font-weight: 700;
  margin: 0;
`;

export default BottomNavItem;
