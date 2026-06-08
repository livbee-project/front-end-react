import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  maxLength?: number
  value?: string
}

/** 글자 수 표시가 있는 여러 줄 입력 */
export function Textarea({
  label,
  error,
  hint,
  required,
  maxLength,
  value = '',
  id,
  ...props
}: TextareaProps) {
  const inputId = id ?? label?.replace(/\s/g, '-').toLowerCase()
  return (
    <FieldWrap>
      {label && (
        <LabelRow>
          <Label htmlFor={inputId}>
            {label}
            {required && <Required>*</Required>}
          </Label>
          {maxLength !== undefined && (
            <Counter>
              {value.length}/{maxLength}
            </Counter>
          )}
        </LabelRow>
      )}
      <StyledTextarea id={inputId} $hasError={!!error} value={value} maxLength={maxLength} {...props} />
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

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`

const Required = styled.span`
  color: ${theme.colors.error};
`

const Counter = styled.span`
  font-size: 12px;
  color: ${theme.colors.textMuted};
`

const StyledTextarea = styled.textarea<{ $hasError: boolean }>`
  padding: 12px 14px;
  border: 1px solid ${({ $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${theme.radius.md};
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  outline: none;
  background: ${theme.colors.white};
  line-height: 1.5;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? theme.colors.error : theme.colors.borderFocus)};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
`

const ErrorText = styled.span`
  font-size: 12px;
  color: ${theme.colors.error};
`

const HintText = styled.span`
  font-size: 12px;
  color: ${theme.colors.textMuted};
`
