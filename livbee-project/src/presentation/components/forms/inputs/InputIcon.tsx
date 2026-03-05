import React from 'react';
import styled from 'styled-components';

interface InputIconProps {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color?: string;
  size?: number;
}

const IconWrapper = styled.span<{ $color?: string }>`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ $color, theme }) => $color ?? theme.colors.muted};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputIcon: React.FC<InputIconProps> = ({ icon: Icon, color, size = 20 }) => {
  return (
    <IconWrapper $color={color}>
      <Icon size={size} />
    </IconWrapper>
  );
};

export default InputIcon;

