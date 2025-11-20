import styled from 'styled-components';

export const HomeCard = styled.article<{ $basis?: string }>`
  flex: 0 0 ${({ $basis }) => $basis ?? '65vw'};
  min-width: 240px;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 0 0 280px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 0 0 300px;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

