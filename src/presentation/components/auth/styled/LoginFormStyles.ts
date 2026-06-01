import styled from 'styled-components';
import { Input } from '@/presentation/components/styled/CommonStyles';

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const StyledInput = styled(Input)`
  padding-right: ${({ theme }) => theme.spacing.lg};
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font: ${({ theme }) => theme.fonts.caption};
  margin: 0;
  text-align: center;
`;

export const ButtonSpacer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const KakaoButtonWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const SignUpRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
`;

export const SignUpLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
`;

