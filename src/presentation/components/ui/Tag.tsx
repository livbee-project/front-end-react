import React from 'react';
import styled, { css } from 'styled-components';
import { PrimaryBadge } from '@/presentation/components/styled/CommonStyles';
import { Caption } from '@/presentation/components/styled/Typography';

/**
 * Tag 컴포넌트가 받을 props 타입을 정의합니다.
 * @param label - 태그에 표시될 텍스트
 * @param variant - 태그 스타일 변형 ('rounded' | 'circle')
 * @param onClick - 태그 클릭 시 실행될 함수 (선택)
 */
interface TagProps {
  label: string;
  variant?: 'rounded' | 'circle';
  onClick?: () => void;
}

/**
 * StyledTag - styled-components 기반 태그
 */
const StyledTag = styled(PrimaryBadge)<{ $variant: 'rounded' | 'circle' }>`
  ${({ $variant }) =>
    $variant === 'rounded'
      ? css`
          padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
          border-radius: ${({ theme }) => theme.radii.xl};
        `
      : css`
          padding: 0;
          width: 2rem;
          height: 2rem;
          border-radius: ${({ theme }) => theme.radii.full};
          display: flex;
          align-items: center;
          justify-content: center;
        `}
  flex-shrink: 0;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  transition: opacity 0.2s;

  &:hover {
    ${({ onClick }) =>
      onClick &&
      css`
        opacity: 0.9;
      `}
  }
`;

/**
 * 정보 및 태그 섹션에서 사용되는 태그 컴포넌트입니다.
 * 둥근 사각형 또는 원형 스타일을 지원합니다.
 */
const Tag: React.FC<TagProps> = ({ label, variant = 'rounded', onClick }) => {
  return (
    <StyledTag $variant={variant} onClick={onClick}>
      <Caption>{label}</Caption>
    </StyledTag>
  );
};

export default Tag;
