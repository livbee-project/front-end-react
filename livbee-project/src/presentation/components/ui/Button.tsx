import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonBase } from '@/presentation/components/styled/CommonStyles';

/**
 * Button 컴포넌트가 받을 props 타입을 정의합니다.
 * @param variant - 버튼 스타일 변형 ('primary' | 'secondary' | 'outline')
 * @param size - 버튼 크기 ('small' | 'medium' | 'large')
 * @param fullWidth - 전체 너비 사용 여부
 * @param disabled - 비활성화 여부
 * @param onClick - 버튼 클릭 시 실행될 함수
 * @param children - 버튼 내부에 표시될 내용
 */
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

/**
 * 버튼 크기별 스타일
 */
const sizeStyles = {
  small: css`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.md};
    font: ${({ theme }) => theme.fonts.caption};
  `,
  medium: css`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.radii.lg};
    font: ${({ theme }) => theme.fonts.button};
  `,
  large: css`
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
    border-radius: ${({ theme }) => theme.radii.xl};
    font: ${({ theme }) => theme.fonts.h2};
  `,
};

/**
 * 버튼 variant별 스타일
 */
const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryForeground};
    border: none;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.primaryForeground};
    border: none;

    &:hover:not(:disabled) {
      opacity: 0.9;
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.primaryOpacity['10']};
    }
  `,
};

/**
 * StyledButton - styled-components 기반 버튼
 */
const StyledButton = styled(ButtonBase)<{
  $variant: 'primary' | 'secondary' | 'outline';
  $size: 'small' | 'medium' | 'large';
  $fullWidth: boolean;
}>`
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}
`;

/**
 * 공통 버튼 컴포넌트입니다.
 * 다양한 스타일과 크기를 지원합니다.
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  ...rest
}) => {
  /**
   * 클릭 핸들러
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
