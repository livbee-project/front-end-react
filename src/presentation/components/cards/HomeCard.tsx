import styled from 'styled-components';
import { ImageElement } from '@/presentation/components/cards/HomeCardImage';

export const HomeCard = styled.article<{ $basis?: string }>`
  flex: 0 0 ${({ $basis }) => $basis ?? '65vw'};
  min-width: 240px;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  position: relative;
  will-change: transform;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 280px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 0 0 300px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    z-index: 1;

    ${ImageElement} {
      transform: scale(1.05);
    }
  }
`;

