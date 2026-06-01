import React from 'react';
import styled, { css } from 'styled-components';
import type { CommunityCategoryCode } from '@/domain/entities/Community';

interface CommunityPostCategorySelectorProps {
  value: CommunityCategoryCode;
  onChange: (value: CommunityCategoryCode) => void;
}

const CATEGORY_OPTIONS: { value: CommunityCategoryCode; label: string }[] = [
  { value: 'free', label: '자유게시판' },
  { value: 'question', label: '질문' },
  { value: 'info', label: '정보공유' },
  { value: 'review', label: '후기' },
  { value: 'knowhow', label: '탐소하우' },
];

export const CommunityPostCategorySelector: React.FC<CommunityPostCategorySelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <CategoryContainer>
      {CATEGORY_OPTIONS.map((option) => (
        <CategoryBadge
          key={option.value}
          type="button"
          $selected={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </CategoryBadge>
      ))}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CategoryBadge = styled.button<{ $selected: boolean }>`
  border-radius: ${({ theme }) => theme.radii.full};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
  font: ${({ theme }) => theme.fonts.caption};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.1s;

  ${({ $selected }) =>
    $selected
      ? css`
          background: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.primaryForeground};
        `
      : css`
          background: ${({ theme }) => theme.colors.secondary};
          color: ${({ theme }) => theme.colors.foreground};
        `}

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

