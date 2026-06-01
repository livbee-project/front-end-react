import React from 'react';
import styled, { css } from 'styled-components';
import type { CommunityCategoryCode } from '@/domain/entities/Community';

type FilterValue = 'all' | CommunityCategoryCode;

interface CommunityCategoryTabsProps {
  activeFilter: FilterValue;
  onFilterChange: (value: FilterValue) => void;
}

const COMMUNITY_FILTERS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'free', label: '자유게시판' },
  { value: 'question', label: '질문' },
  { value: 'info', label: '정보공유' },
  { value: 'review', label: '후기' },
];

export const CommunityCategoryTabs: React.FC<CommunityCategoryTabsProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  return (
    <FilterContainer>
      {COMMUNITY_FILTERS.map((filter) => (
        <FilterBadge
          key={filter.value}
          type="button"
          $isActive={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
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

