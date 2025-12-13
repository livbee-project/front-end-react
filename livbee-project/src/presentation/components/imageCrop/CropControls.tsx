import React, { useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';
import { CROP_RATIOS } from '@/types/imageCrop';
import type { CropRatio } from '@/types/imageCrop';

interface CropControlsProps {
  selectedRatio: CropRatio;
  onRatioChange: (ratio: CropRatio) => void;
  recommendedRatio?: CropRatio | null;
}

export const CropControls: React.FC<CropControlsProps> = ({
  selectedRatio,
  onRatioChange,
  recommendedRatio,
}) => {
  const handleRatioClick = useCallback(
    (ratio: CropRatio) => {
      onRatioChange(ratio);
    },
    [onRatioChange]
  );

  return (
    <BottomBar>
      {CROP_RATIOS.map((ratio) => {
        const isSelected = selectedRatio === ratio.value;
        const isRecommended = recommendedRatio === ratio.value;

        return (
          <RatioButtonWrapper key={ratio.value}>
            {isRecommended && (
              <RecommendationBubble>
                <StarIcon />
                <RecommendationText>권장</RecommendationText>
              </RecommendationBubble>
            )}
            <RatioButton onClick={() => handleRatioClick(ratio.value)} $isActive={isSelected}>
              {ratio.label}
            </RatioButton>
          </RatioButtonWrapper>
        );
      })}
    </BottomBar>
  );
};

const BottomBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-top: calc(${({ theme }) => theme.spacing.md} + 40px);
  background-color: #1a1a1a;
  overflow-x: auto;
  overflow-y: visible;
  position: relative;
`;

const RatioButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
`;

const RecommendationBubble = styled.div`
  position: absolute;
  bottom: calc(100% + 16px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #6A8DFF;
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  z-index: 10000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  animation: floatUpDown 2s ease-in-out infinite;

  @keyframes floatUpDown {
    0%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-4px);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #6A8DFF;
  }
`;

const StarIcon = styled.span`
  display: inline-block;
  font-size: 14px;
  line-height: 1;
  color: #FFD700;
  filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
  
  &::before {
    content: '⭐';
  }
`;

const RecommendationText = styled.span`
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
`;

const RatioButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  border: none;
  background-color: ${({ $isActive }) => ($isActive ? '#ffffff' : '#333333')};
  color: ${({ $isActive }) => ($isActive ? '#000000' : '#ffffff')};
  font: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  min-width: 50px;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;

