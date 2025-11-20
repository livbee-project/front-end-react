import React from 'react';
import type { RefObject } from 'react';
import styled, { keyframes } from 'styled-components';
import type { UserType } from '@/types/auth';

interface UserTypeTabsProps {
  userType: UserType;
  onTypeChange: (type: UserType) => void;
  showhostButtonRef: RefObject<HTMLButtonElement | null>;
  tabContainerRef: RefObject<HTMLDivElement | null>;
  bubbleLeft: string;
}

export const UserTypeTabs: React.FC<UserTypeTabsProps> = ({
  userType,
  onTypeChange,
  showhostButtonRef,
  tabContainerRef,
  bubbleLeft,
}) => {
  return (
    <TabsContainer ref={tabContainerRef}>
      <BubbleContainer $left={bubbleLeft}>
        <Bubble>
          모델도 여기!
          <BubblePointer />
        </Bubble>
      </BubbleContainer>
      <TypeTabButton
        type="button"
        $active={userType === 'brand'}
        onClick={() => onTypeChange('brand')}
      >
        브랜드
      </TypeTabButton>
      <TypeTabButton
        type="button"
        ref={showhostButtonRef}
        $active={userType === 'showhost'}
        onClick={() => onTypeChange('showhost')}
      >
        쇼호스트
      </TypeTabButton>
    </TabsContainer>
  );
};

const bounceVertical = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.xs};
  gap: ${({ theme }) => theme.spacing.xs};
  position: relative;
`;

const BubbleContainer = styled.div<{ $left: string }>`
  position: absolute;
  left: ${({ $left }) => $left};
  transform: translateX(-50%);
  bottom: calc(100% + ${({ theme }) => theme.spacing.xl} + 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${bounceVertical} 2s ease-in-out infinite;
`;

const Bubble = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font: ${({ theme }) => theme.fonts.caption};
  font-weight: 500;
  position: relative;
  white-space: nowrap;
`;

const BubblePointer = styled.span`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid ${({ theme }) => theme.colors.primary};
`;

const TypeTabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: ${({ theme, $active }) => ($active ? theme.colors.card : 'transparent')};
  color: ${({ theme }) => theme.colors.foreground};
  font: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: background 0.2s, box-shadow 0.2s;
`;

