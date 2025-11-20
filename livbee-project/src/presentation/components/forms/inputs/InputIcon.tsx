import React from 'react';
import type { IconType } from 'react-icons';

interface InputIconProps {
  icon: IconType;
  color?: string;
  size?: number;
}

const InputIcon: React.FC<InputIconProps> = ({ icon: Icon, color = 'var(--dark-gray)', size = 20 }) => {
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

