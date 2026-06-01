import React from 'react';
import styled from 'styled-components';

/**
 * ToggleSwitch가 받을 props 타입을 정의합니다.
 */
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * 토글 스위치 컴포넌트
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <ToggleContainer
      $checked={checked}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <Thumb $checked={checked} />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.div<{ $checked: boolean }>`
  position: relative;
  width: 48px;
  height: 28px;
  border-radius: 14px;
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary : '#E5E7ED'};
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0;
`;

const Thumb = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 2px;
  left: ${({ $checked }) => ($checked ? '22px' : '2px')};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  transition: left 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export default ToggleSwitch;

