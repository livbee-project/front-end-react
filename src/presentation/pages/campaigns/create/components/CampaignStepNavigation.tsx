import styled from 'styled-components'
import type { CampaignCreateStep } from '@/domain/entities/campaign'
import { CAMPAIGN_CREATE_STEPS } from '@/presentation/pages/campaigns/create/config/campaignCreateSteps'
import { theme } from '@/presentation/styles/theme'

interface Props {
  currentStep: CampaignCreateStep
}

/** 공고 등록 좌측 세로 스텝 네비 */
export function CampaignStepNavigation({ currentStep }: Props) {
  return (
    <Nav>
      {CAMPAIGN_CREATE_STEPS.map(({ step, title, description }) => (
        <Item key={step} $active={currentStep === step} $done={currentStep > step}>
          <Num $active={currentStep === step} $done={currentStep > step}>
            {currentStep > step ? '✓' : step}
          </Num>
          <div>
            <Title>{title}</Title>
            <Desc>{description}</Desc>
          </div>
        </Item>
      ))}
    </Nav>
  )
}

const Nav = styled.nav`display: flex; flex-direction: column; gap: 4px;`

const Item = styled.div<{ $active: boolean; $done: boolean }>`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: ${theme.radius.md};
  background: ${({ $active }) => ($active ? theme.colors.primaryLight : 'transparent')};
  text-align: left;
`

const Num = styled.span<{ $active: boolean; $done: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
  background: ${({ $active, $done }) => ($active || $done ? theme.colors.primary : theme.colors.border)};
  color: ${({ $active, $done }) => ($active || $done ? theme.colors.white : theme.colors.textSecondary)};
`

const Title = styled.div`font-size: 14px; font-weight: 600;`
const Desc = styled.div`font-size: 11px; color: ${theme.colors.textMuted}; margin-top: 2px;`
