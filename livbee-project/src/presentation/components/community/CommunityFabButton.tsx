import React from 'react';
import styled from 'styled-components';
import { Pencil } from 'lucide-react';

interface CommunityFabButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

export const CommunityFabButton: React.FC<CommunityFabButtonProps> = ({
  onClick,
  ariaLabel = '커뮤니티 글쓰기',
}) => {
  return (
    <FabButton type="button" onClick={onClick} aria-label={ariaLabel}>
      <Pencil size={22} strokeWidth={2.4} />
    </FabButton>
  );
};

const FabButton = styled.button`
  position: fixed;
  right: ${({ theme }) => theme.spacing.xl};
  bottom: 6rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 24px ${({ theme }) => theme.primaryOpacity['35']};
  cursor: pointer;
  z-index: 50;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

