import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  required?: boolean
  options: readonly string[]
  placeholder?: string
}

/** 라벨·에러를 포함한 셀렉트 */
export function Select({ label, error, required, options, placeholder, id, ...props }: SelectProps) {
  const selectId = id ?? label?.replace(/\s/g, '-').toLowerCase()
  return (
    <FieldWrap>
      {label && (
        <Label htmlFor={selectId}>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      <StyledSelect id={selectId} $hasError={!!error} {...props}>
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </StyledSelect>
      {error && <ErrorText>{error}</ErrorText>}
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
`

const Required = styled.span`
  color: ${theme.colors.error};
`

const StyledSelect = styled.select<{ $hasError: boolean }>`
  padding: 12px 14px;
  border: 1px solid ${({ $hasError }) => ($hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${theme.radius.md};
  font-size: 14px;
  background: ${theme.colors.white};
  outline: none;
  height: 48px;

  &:focus {
    border-color: ${({ $hasError }) => ($hasError ? theme.colors.error : theme.colors.borderFocus)};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLight};
  }
`

const ErrorText = styled.span`
  font-size: 12px;
  color: ${theme.colors.error};
`
