import styled from 'styled-components'
import type { ModelCreateStep } from '@/domain/entities/modelProfile'
import { MODEL_CREATE_STEPS } from '@/presentation/pages/models/create/config/modelCreateSteps'
import { theme } from '@/presentation/styles/theme'

interface StepNavigationProps {
  currentStep: ModelCreateStep
  onStepClick?: (step: ModelCreateStep) => void
}

/** 데스크톱 좌측 세로 스텝 네비게이션 */
export function StepNavigation({ currentStep, onStepClick }: StepNavigationProps) {
  return (
    <Nav>
      {MODEL_CREATE_STEPS.map(({ step, title, description }) => (
        <NavItem
          key={step}
          type="button"
          $active={currentStep === step}
          $done={currentStep > step}
          onClick={() => onStepClick?.(step)}
        >
          <StepNum $active={currentStep === step} $done={currentStep > step}>
            {currentStep > step ? '✓' : step}
          </StepNum>
          <div>
            <NavTitle>{title}</NavTitle>
            <NavDesc>{description}</NavDesc>
          </div>
        </NavItem>
      ))}
      <Tip>입력 정보는 모델 목록·추천·상세에 노출됩니다.</Tip>
    </Nav>
  )
}

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const NavItem = styled.button<{ $active: boolean; $done: boolean }>`
  display: flex;
  gap: 12px;
  padding: 12px;
  border: none;
  border-radius: ${theme.radius.md};
  background: ${({ $active }) => ($active ? theme.colors.primaryLight : 'transparent')};
  cursor: pointer;
  text-align: left;
  width: 100%;
`

const StepNum = styled.span<{ $active: boolean; $done: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
  background: ${({ $active, $done }) =>
    $active || $done ? theme.colors.primary : theme.colors.border};
  color: ${({ $active, $done }) =>
    $active || $done ? theme.colors.white : theme.colors.textSecondary};
`

const NavTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`

const NavDesc = styled.div`
  font-size: 11px;
  color: ${theme.colors.textMuted};
  margin-top: 2px;
  line-height: 1.3;
`

const Tip = styled.p`
  margin: 16px 0 0;
  padding: 12px;
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.radius.md};
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  line-height: 1.4;
  text-align: left;
`
