import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';
import { CROP_RATIOS } from '@/types/imageCrop';
import type { CropRatio } from '@/types/imageCrop';

interface CropControlsProps {
  selectedRatio: CropRatio;
  onRatioChange: (ratio: CropRatio) => void;
}

export const CropControls: React.FC<CropControlsProps> = ({
  selectedRatio,
  onRatioChange,
}) => {
  return (
    <BottomBar>
      {CROP_RATIOS.map((ratio) => (
        <RatioButton
          key={ratio.value}
          onClick={() => onRatioChange(ratio.value)}
          $isActive={selectedRatio === ratio.value}
        >
          {ratio.label}
        </RatioButton>
      ))}
    </BottomBar>
  );
};

const BottomBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: #1a1a1a;
  overflow-x: auto;
`;

const RatioButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background-color: ${({ $isActive }) => ($isActive ? theme.colors.primaryForeground : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#000' : theme.colors.primaryForeground)};
  font: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
`;

