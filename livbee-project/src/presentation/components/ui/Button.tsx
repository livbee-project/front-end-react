import React from 'react';

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
  onClick?: () => void;
  children: React.ReactNode;
}

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
  style,
  ...rest
}) => {
  /**
   * variant에 따른 기본 스타일
   */
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary)',
          color: 'var(--white)',
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--dark-gray)',
          color: 'var(--white)',
          border: 'none',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--primary)',
          border: '1px solid var(--primary)',
        };
      default:
        return {
          backgroundColor: 'var(--primary)',
          color: 'var(--white)',
          border: 'none',
        };
    }
  };

  /**
   * size에 따른 스타일
   */
  const getSizeStyle = (): React.CSSProperties => {
    switch (size) {
      case 'small':
        return {
          padding: '8px 16px',
          fontSize: 'var(--p2)', // 14px
          fontWeight: 400,
          borderRadius: '8px',
        };
      case 'medium':
        return {
          padding: '12px 24px',
          fontSize: 'var(--h3)', // 16px
          fontWeight: 500,
          borderRadius: '10px',
        };
      case 'large':
        return {
          padding: '16px 32px',
          fontSize: 'var(--h2)', // 18px
          fontWeight: 700,
          borderRadius: '12px',
        };
      default:
        return {
          padding: '12px 24px',
          fontSize: 'var(--h3)',
          fontWeight: 500,
          borderRadius: '10px',
        };
    }
  };

  /**
   * 버튼 기본 스타일
   */
  const baseStyle: React.CSSProperties = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'all 0.2s',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  /**
   * 최종 스타일 병합
   */
  const buttonStyle: React.CSSProperties = {
    ...baseStyle,
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...style,
  };

  /**
   * 클릭 핸들러
   */
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      style={buttonStyle}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

