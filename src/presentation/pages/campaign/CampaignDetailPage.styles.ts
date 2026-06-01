import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ActionSection = styled.section`
  position: sticky;
  bottom: 0;
  margin-top: 1.5rem;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  padding-top: 1rem;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.secondary}33,
    ${({ theme }) => theme.colors.secondary}33,
    transparent
  );
  margin-left: 0;
  margin-right: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ContentActions = styled.div`
  display: flex;
  gap: 0.75rem;

  & > button {
    flex: 1;
  }
`;

export const OutlineButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.foreground};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.inputBackground};
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

