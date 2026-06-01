import styled, { css } from 'styled-components';
import { PMuted, Small } from '@/presentation/components/styled/Typography';

export const PageWrapper = styled.div<{ $variant: 'page' | 'modal' }>`
  background-color: #f9fafb;

  ${({ $variant, theme }) =>
    $variant === 'page'
      ? css`
          min-height: 100vh;
          padding: 0 16px 24px;

          @media (min-width: ${theme.breakpoints.tablet}) {
            padding: 0 20px 32px;
          }
        `
      : css`
          min-height: auto;
          padding: 0;
        `}
`;

export const FormContainer = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export const Sheet = styled.div<{ $variant: 'page' | 'modal' }>`
  background-color: ${({ theme }) => theme.colors.surface};

  ${({ $variant, theme }) =>
    $variant === 'page'
      ? css`
          margin: 0 -16px;
          padding: 16px 16px 24px;
          border-radius: 20px 20px 0 0;
          box-shadow: 0 -4px 12px rgba(15, 23, 42, 0.06);

          @media (min-width: ${theme.breakpoints.tablet}) {
            margin: 0 -20px;
            padding: 20px 20px 28px;
          }
        `
      : css`
          margin: 0;
          padding: 16px 16px 20px;
          border-radius: 20px;
          box-shadow: none;
          max-height: calc(90vh - 40px);
          overflow-y: auto;
        `}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 16px;
`;

export const HeaderTitle = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const HeaderIconButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #4b5563;
  cursor: pointer;
  border-radius: 9999px;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const HeaderSpacer = styled.div`
  width: 32px;
  height: 32px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionLabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

export const SectionLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const RequiredMark = styled.span`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`;

export const HintText = styled(PMuted)`
  font-size: 12px;
  color: #6b7280;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 12px 14px;
  font-size: 14px;
  background-color: #f9fafb;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 180px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 12px 14px;
  font-size: 14px;
  background-color: #f9fafb;
  resize: vertical;
  outline: none;
  line-height: 1.5;
  white-space: pre-wrap;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}20;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    resize: none;
  }
`;

export const CounterRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
`;

export const CounterText = styled(Small)`
  font-size: 12px;
  color: #9ca3af;
`;

export const ErrorText = styled(Small)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;

export const ImageUploadBox = styled.div`
  border-radius: 12px;
  border: 1px dashed #d1d5db;
  background-color: #f9fafb;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ImageUploadTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 9999px;
  border: none;
  background-color: #111827;
  color: ${({ theme }) => theme.colors.surface};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  gap: 6px;

  &:hover {
    background-color: #111827dd;
  }
`;

export const ImageUploadHint = styled(Small)`
  font-size: 12px;
  color: #9ca3af;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ImagePreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ImagePreviewItem = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #e5e7eb;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageRemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  border: none;
  background-color: rgba(0, 0, 0, 0.6);
  color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const FooterButtonRow = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  margin-top: 24px;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
  background: linear-gradient(to top, ${({ theme }) => theme.colors.surface}, rgba(255, 255, 255, 0.9));
  display: flex;
  gap: 12px;
`;

export const FooterButton = styled.button<{ $variant: 'ghost' | 'primary' }>`
  flex: 1;
  height: 48px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s, transform 0.1s;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background-color: ${theme.colors.primary};
        color: ${theme.colors.primaryForeground};
      `
      : `
        background-color: #f3f4f6;
        color: #4b5563;
      `}

  &:hover {
    opacity: 0.95;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

