import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { X, Check } from 'lucide-react';

interface CropHeaderProps {
  onBack: () => void;
  onSave: () => void;
}

const ICON_SIZE = 20;
const BUTTON_SIZE = 40;

export const CropHeader: React.FC<CropHeaderProps> = ({ onBack, onSave }) => {
  const handleBackClick = useCallback(() => {
    onBack();
  }, [onBack]);

  const handleSaveClick = useCallback(() => {
    onSave();
  }, [onSave]);

  return (
    <TopBar>
      <IconButton onClick={handleBackClick} $variant="cancel">
        <X size={ICON_SIZE} />
      </IconButton>
      <IconButton onClick={handleSaveClick} $variant="confirm">
        <Check size={ICON_SIZE} />
      </IconButton>
    </TopBar>
  );
};

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(${({ theme }) => theme.spacing.md} + env(safe-area-inset-top));
  background-color: #1a1a1a;
  color: ${({ theme }) => theme.colors.primaryForeground};
  position: fixed; /* 상단 고정 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* 다른 요소 위에 표시 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); /* 하단 그림자 */
  height: calc(60px + env(safe-area-inset-top)); /* 고정 높이 */
  box-sizing: border-box;
  flex-shrink: 0; /* 축소 방지 */
  touch-action: none; /* 터치 이벤트 차단 (확대/축소/드래그 방지) */
  user-select: none; /* 텍스트 선택 방지 */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const cancelButtonStyles = css`
  background-color: #000000;
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background-color: #333333;
  }

  &:active {
    background-color: #1a1a1a;
  }
`;

const confirmButtonStyles = css`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

const IconButton = styled.button<{ $variant: 'cancel' | 'confirm' }>`
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  flex-shrink: 0;

  ${({ $variant }) => ($variant === 'cancel' ? cancelButtonStyles : confirmButtonStyles)}
`;

