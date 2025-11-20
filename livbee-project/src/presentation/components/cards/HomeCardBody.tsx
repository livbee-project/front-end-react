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
`;

export const HomeCardMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

