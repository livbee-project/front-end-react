import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

interface ToggleProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

/** ON/OFF 토글 스위치 */
export function Toggle({ label, description, checked, onChange, disabled }: ToggleProps) {
  return (
    <Row>
      <TextBlock>
        <ToggleLabel>{label}</ToggleLabel>
        {description && <ToggleDesc>{description}</ToggleDesc>}
      </TextBlock>
      <Track
        type="button"
        role="switch"
        aria-checked={checked}
        $on={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
      >
        <Thumb $on={checked} />
      </Track>
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:last-child { border-bottom: none; }
`

const TextBlock = styled.div`
  flex: 1;
  text-align: left;
`

const ToggleLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const ToggleDesc = styled.div`
  font-size: 12px;
  color: ${theme.colors.textMuted};
  margin-top: 4px;
`

const Track = styled.button<{ $on: boolean }>`
  width: 48px;
  height: 28px;
  border-radius: ${theme.radius.full};
  border: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  background: ${({ $on }) => ($on ? theme.colors.primary : theme.colors.border)};
  transition: background 0.2s;

  &:disabled { opacity: 0.5; cursor: not-allowed; }
`

const Thumb = styled.span<{ $on: boolean }>`
  position: absolute;
  top: 3px;
  left: ${({ $on }) => ($on ? '23px' : '3px')};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: ${theme.colors.white};
  transition: left 0.2s;
  box-shadow: ${theme.shadow.sm};
`
