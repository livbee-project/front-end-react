import styled, { css } from 'styled-components'
import { theme } from '@/presentation/styles/theme'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

/** 공통 버튼 컴포넌트 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  )
}

const sizeStyles = {
  sm: css`padding: 8px 14px; font-size: 13px;`,
  md: css`padding: 12px 20px; font-size: 14px;`,
  lg: css`padding: 14px 24px; font-size: 15px; font-weight: 600;`,
}

const variantStyles = {
  primary: css`
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: none;
    &:hover:not(:disabled) { background: ${theme.colors.primaryHover}; }
  `,
  secondary: css`
    background: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    border: none;
  `,
  outline: css`
    background: transparent;
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};
  `,
  ghost: css`
    background: transparent;
    color: ${theme.colors.textSecondary};
    border: none;
  `,
}

const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  font-weight: 500;
  transition: background 0.15s, opacity 0.15s;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`
