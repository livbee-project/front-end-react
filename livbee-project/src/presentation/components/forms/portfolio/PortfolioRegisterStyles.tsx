import styled, { css } from 'styled-components';
/* eslint-disable react-refresh/only-export-components */
import { H1, H2, PMuted, Small, Caption } from '@/presentation/components/styled/Typography';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #F9FAFB;
  padding: 0 20px 20px 20px;

  @media (min-width: 768px) {
    padding: 0 20px 40px 20px;
  }
`;

export const FormContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export const HeaderContainer = styled.header`
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  margin: 0 -20px 24px -20px;
  width: calc(100% + 40px);

  @media (min-width: 768px) {
    margin: 0 -20px 24px -20px;
    width: calc(100% + 40px);
  }
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: #111111;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F3F4F6;
  }
`;

export const HeaderTitle = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
  margin: 0;
`;

export const HeaderSpacer = styled.div`
  width: 40px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormSection = styled.section`
  background-color: #FFFFFF;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #111111;
  margin: 0 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #F3F4F6;
`;

export const SectionDescription = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 16px;
  line-height: 1.5;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LabelText = styled(H2)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
`;

export const LabelNote = styled(Caption)`
  font-size: 12px;
  font-weight: 400;
  color: #9CA3AF;
  margin-left: 4px;
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StyledSelect = styled.select`
  width: 100%;
  background-color: #F9FAFB;
  border: none;
  border-radius: 16px;
  padding: 16px 20px;
  font-size: 15px;
  color: #111111;
  height: auto;
  transition: all 0.2s;
  font-family: inherit;

  &:focus {
    outline: none;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

export const StyledInput = styled.input`
  width: 100%;
  background-color: #F9FAFB;
  border: none;
  border-radius: 16px;
  padding: 16px 20px;
  font-size: 15px;
  color: #111111;
  transition: all 0.2s;
  font-family: inherit;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  background-color: #F9FAFB;
  border: none;
  border-radius: 16px;
  padding: 16px 20px;
  font-size: 15px;
  color: #111111;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.2s;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    background-color: #FFFFFF;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MutedHint = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const SmallText = styled(Small)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 56px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  background-color: #F3F4F6;
  color: #6B7280;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #E5E7EB;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  flex: 1;
  height: 56px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5566E3;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

