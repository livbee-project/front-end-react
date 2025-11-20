import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

interface CropHeaderProps {
  onBack: () => void;
  onSave: () => void;
}

export const CropHeader: React.FC<CropHeaderProps> = ({ onBack, onSave }) => {
  return (
    <TopBar>
      <HeaderButton onClick={onBack}>
        {'<< 뒤로가기'}
      </HeaderButton>
      <HeaderButton onClick={onSave}>
        저장
      </HeaderButton>
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

const HeaderButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.h2};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
`;

