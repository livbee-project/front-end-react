import styled from 'styled-components'
import type { CampaignCreateStep } from '@/domain/entities/campaign'
import { CAMPAIGN_CREATE_STEPS } from '@/presentation/pages/campaigns/create/config/campaignCreateSteps'
import { theme } from '@/presentation/styles/theme'

interface Props {
  currentStep: CampaignCreateStep
}

/** 공고 등록 상단 가로 스텝퍼 */
export function CampaignStepProgress({ currentStep }: Props) {
  return (
    <Bar>
      {CAMPAIGN_CREATE_STEPS.map(({ step, title }) => (
        <Item key={step} $active={currentStep === step} $done={currentStep > step}>
          <Dot $active={currentStep === step} $done={currentStep > step}>
            {currentStep > step ? '✓' : step}
          </Dot>
          <Label $active={currentStep === step}>{title}</Label>
        </Item>
      ))}
    </Bar>
  )
}

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  padding: 16px 0;
  overflow-x: auto;
`

const Item = styled.div<{ $active: boolean; $done: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 56px;
  opacity: ${({ $active, $done }) => ($active || $done ? 1 : 0.5)};
`

const Dot = styled.div<{ $active: boolean; $done: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $active, $done }) => ($active || $done ? theme.colors.primary : theme.colors.border)};
  color: ${({ $active, $done }) => ($active || $done ? theme.colors.white : theme.colors.textSecondary)};
`

const Label = styled.span<{ $active: boolean }>`
  font-size: 10px;
  text-align: center;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
`
