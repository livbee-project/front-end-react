import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

interface ChipGroupProps<T extends string> {
  label?: string
  options: readonly T[]
  value: T | ''
  onChange: (value: T) => void
  error?: string
  required?: boolean
}

/** 단일 선택 칩 그룹 */
export function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
  required,
}: ChipGroupProps<T>) {
  return (
    <Wrap>
      {label && (
        <Label>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      <ChipRow>
        {options.map((opt) => (
          <Chip
            key={opt}
            type="button"
            $active={value === opt}
            onClick={() => onChange(opt)}
          >
            {opt}
          </Chip>
        ))}
      </ChipRow>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const Required = styled.span`
  color: ${theme.colors.error};
`

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Chip = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: ${theme.radius.full};
  font-size: 13px;
  cursor: pointer;
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ $active }) => ($active ? theme.colors.primaryLight : theme.colors.white)};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text)};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
`

const ErrorText = styled.span`
  font-size: 12px;
  color: ${theme.colors.error};
`
