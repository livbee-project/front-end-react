import styled from 'styled-components';

export const DetailContent = styled.div`
  padding: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5px;
  }
`;

export const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;

export const SectionContent = styled.p`
  color: ${({ theme }) => theme.colors.foreground};
  white-space: pre-line;
  line-height: 1.7;
  font-size: 0.875rem;
  font-weight: 300;
  margin: 0;
`;

export const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.875rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 300;
`;

export const BulletDot = styled.span`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
`;

export const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 0.125rem;
    flex-shrink: 0;
  }
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

export const InfoLabel = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  font-weight: 300;
  margin: 0;
`;

export const InfoValue = styled.p<{ $isDestructive?: boolean; $isPrimary?: boolean }>`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme, $isDestructive, $isPrimary }) => {
    if ($isDestructive) return theme.colors.error;
    if ($isPrimary) return theme.colors.primary;
    return theme.colors.foreground;
  }};
  font-weight: ${({ $isPrimary }) => ($isPrimary ? 700 : 500)};
  margin: 0;
  line-height: 1.4;
`;

export const Separator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

