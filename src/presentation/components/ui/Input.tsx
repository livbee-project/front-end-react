import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  required?: boolean
}

/** 라벨·에러를 포함한 텍스트 입력 */
export function Input({ label, error, hint, required, id, ...props }: InputProps) {
  const inputId = id ?? label?.replace(/\s/g, '-').toLowerCase()
  return (
    <FieldWrap>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      <StyledInput id={inputId} $hasError={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
      {!error && hint && <HintText>{hint}</HintText>}
    </FieldWrap>
  )
}

const FieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.text};
`

const Required = styled.span`
  color: ${theme.colors.error};
  margin-left: 2px;
`

const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: 12px 14px;
  border: 1px solid ${({ $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${theme.radius.md};
  font-size: 14px;
  outline: none;
  background: ${theme.colors.white};

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? theme.colors.error : theme.colors.borderFocus)};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }

  &::placeholder { color: ${theme.colors.textMuted}; }
`

const ErrorText = styled.span`
  font-size: 12px;
  color: ${theme.colors.error};
`

const HintText = styled.span`
  font-size: 12px;
  color: ${theme.colors.textMuted};
`
