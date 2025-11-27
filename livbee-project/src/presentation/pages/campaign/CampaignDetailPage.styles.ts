import styled from 'styled-components';

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

export const ActionSection = styled.section`
  margin: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
    width: calc(100% - ${({ theme }) => theme.spacing.xl} * 2);
  }
`;

export const ActionMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ActionMetaItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const ActionMetaLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;
`;

export const ActionMetaValue = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.4;
`;

export const SupportText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
`;

export const ContentActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;

    & > button {
      flex: 1;
    }
  }
`;

