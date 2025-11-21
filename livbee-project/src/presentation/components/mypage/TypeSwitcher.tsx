import React from 'react';
import styled, { css } from 'styled-components';
import type { UserType } from '@/types/mypage';

interface TypeSwitcherProps {
  availableTypes: UserType[];
  selectedType: UserType;
  onTypeChange: (type: UserType) => void;
}

export const TypeSwitcher: React.FC<TypeSwitcherProps> = ({
  availableTypes,
  selectedType,
  onTypeChange,
}) => {
  if (availableTypes.length <= 1) {
    return null;
  }

  return (
    <Container>
      {availableTypes.includes('brand') && (
        <TypeBadge $isActive={selectedType === 'brand'} onClick={() => onTypeChange('brand')}>
          브랜드
        </TypeBadge>
      )}
      {availableTypes.includes('showhost') && (
        <TypeBadge $isActive={selectedType === 'showhost'} onClick={() => onTypeChange('showhost')}>
          쇼호스트
        </TypeBadge>
      )}
      {availableTypes.includes('model') && (
        <TypeBadge $isActive={selectedType === 'model'} onClick={() => onTypeChange('model')}>
          모델
        </TypeBadge>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TypeBadge = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all 0.2s;
  font: ${({ theme }) => theme.fonts.caption};
  ${({ $isActive }) =>
    $isActive
      ? css`
          background: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.primaryForeground};
        `
      : css`
          background: ${({ theme }) => theme.colors.secondary};
          color: ${({ theme }) => theme.colors.foreground};
        `}
  &:hover {
    background: ${({ theme }) => theme.primaryOpacity['10']};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

