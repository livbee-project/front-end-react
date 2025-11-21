import React from 'react';
import styled from 'styled-components';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  onClick: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <LogOut size={16} strokeWidth={2} />
      로그아웃
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font: ${({ theme }) => theme.fonts.body};
  transition: background-color 0.2s, color 0.2s;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  &:hover {
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.errorForeground};
  }
`;

