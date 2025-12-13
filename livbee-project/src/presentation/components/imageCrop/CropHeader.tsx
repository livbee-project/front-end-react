import React, { useCallback } from 'react';
import styled from 'styled-components';
import { X, Check } from 'lucide-react';
import { theme } from '@/presentation/styles/theme';

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
  background-color: #1a1a1a;
  color: ${theme.colors.primaryForeground};
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

  ${({ $variant }) =>
    $variant === 'cancel'
      ? `
    background-color: #000000;
    color: #ffffff;
    
    &:hover {
      background-color: #333333;
    }
    
    &:active {
      background-color: #1a1a1a;
    }
  `
      : `
    background-color: ${theme.colors.primary};
    color: #ffffff;
    
    &:hover {
      background-color: ${theme.colors.primaryHover || theme.colors.primary};
      opacity: 0.9;
    }
    
    &:active {
      opacity: 0.8;
    }
  `}
`;

