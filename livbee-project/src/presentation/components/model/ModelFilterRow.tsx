import React from 'react';
import styled, { css } from 'styled-components';

interface ModelFilterRowProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

export const ModelFilterRow: React.FC<ModelFilterRowProps> = ({
  filters,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <FilterContainer>
      {filters.map((filter) => (
        <FilterBadge
          key={filter}
          type="button"
          $isActive={activeFilter === filter}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </FilterBadge>
      ))}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterBadge = styled.button<{ $isActive: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  white-space: nowrap;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  font: ${({ theme }) => theme.fonts.caption};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.2s;
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
  &:active {
    transform: scale(0.98);
  }
`;

