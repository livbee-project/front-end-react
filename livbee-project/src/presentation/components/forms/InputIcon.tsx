import React from 'react';
import type { IconType } from 'react-icons';

/**
 * InputIcon 컴포넌트가 받을 props 타입을 정의합니다.
 * @param icon - React Icons의 아이콘 컴포넌트
 * @param color - 아이콘 색상 (기본값: 'var(--dark-gray)')
 * @param size - 아이콘 크기 (기본값: 20)
 */
interface InputIconProps {
  icon: IconType;
  color?: string;
  size?: number;
}

/**
 * 입력 필드 옆에 표시되는 공통 아이콘 컴포넌트입니다.
 * 일관된 위치와 스타일을 제공합니다.
 */
const InputIcon: React.FC<InputIconProps> = ({
  icon: Icon,
  color = 'var(--dark-gray)',
  size = 20,
}) => {
  /**
   * 아이콘 스타일
   */
  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color,
  };

  return <Icon size={size} style={iconStyle} />;
};

export default InputIcon;

