import React from 'react';
import styled, { css } from 'styled-components';
import type { UserType } from '@/domain/entities/User';
import { TYPE_SWITCHER_CONFIGS } from '@/presentation/components/mypage/config/typeSwitcherConfig';

interface TypeSwitcherProps {
  availableTypes: UserType[];
  selectedType: UserType;
  onTypeChange: (type: UserType) => void;
}

/**
 * 타입 스위처 컴포넌트
 * OCP 준수: 동적 렌더링을 사용하여 새로운 타입 추가 시 기존 코드 수정 없이 확장 가능
 */
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
      {TYPE_SWITCHER_CONFIGS.filter((config) => availableTypes.includes(config.type)).map(
        (config) => (
          <TypeBadge
            key={config.type}
            $isActive={selectedType === config.type}
            onClick={() => onTypeChange(config.type)}
          >
            {config.label}
          </TypeBadge>
        )
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

