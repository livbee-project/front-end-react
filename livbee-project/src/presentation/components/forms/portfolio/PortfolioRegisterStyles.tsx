import styled, { css } from 'styled-components';
/* eslint-disable react-refresh/only-export-components */
import { H1, H2, PMuted, Small, Caption } from '@/presentation/components/styled/Typography';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 40px 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 30px 16px;
  }
`;

export const FormContainer = styled.div`
  max-width: 680px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 12px 32px rgba(3, 2, 19, 0.06);
  padding: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px;
  }
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FormSection = styled.section`
  padding: 30px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 24px 0;
  }
`;

export const SectionTitle = styled(H1)`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

export const SectionDescription = styled(Small)`
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  line-height: 1.5;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const LabelText = styled(H2)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
`;

export const LabelNote = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 400;
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font: ${({ theme }) => theme.fonts.body};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primaryOpacity['10']};
  }
`;

export const hiddenInputStyles = css`
  width: 1px;
  height: 1px;
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

export const HiddenInput = styled.input`
  ${hiddenInputStyles}
`;

const underlineField = css`
  width: 100%;
  padding: 8px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  font: ${({ theme }) => theme.fonts.body};

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const StyledInput = styled.input`
  ${underlineField}
`;

export const StyledTextarea = styled.textarea`
  ${underlineField};
  min-height: 120px;
  resize: vertical;
`;

export const MutedHint = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const SmallText = styled(Small)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const ButtonGroup = styled.div`
  padding-top: 30px;
  margin-top: 40px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.primaryOpacity['25']};
  }
`;

