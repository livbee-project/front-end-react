import styled from 'styled-components';
import { Caption, H3, PMuted } from '@/presentation/components/styled/Typography';

export const HomeCardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const HomeCardBrand = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
  text-transform: uppercase;
`;

export const HomeCardTitle = styled(H3)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;

export const HomeCardDescription = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  min-height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const HomeCardMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const CTAButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.button};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

