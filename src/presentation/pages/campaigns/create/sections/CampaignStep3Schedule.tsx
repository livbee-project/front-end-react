import type { CampaignFormErrors, CampaignFormValues } from '@/domain/entities/campaign'
import { isEndTimeAfterStart } from '@/domain/usecases/campaign/validateCampaignForm'
import { Input } from '@/presentation/components/ui/Input'
import {
  FormStack,
  InfoBox,
  SectionDesc,
  SectionHeading,
  SectionTitle,
} from '@/presentation/pages/campaigns/create/styles/campaignCreate.styles'
import { theme } from '@/presentation/styles/theme'
import styled from 'styled-components'

interface Props {
  values: CampaignFormValues
  errors: CampaignFormErrors
  onChange: (patch: Partial<CampaignFormValues>) => void
}

/** STEP 3 — 촬영일·마감일·시간·장소 */
export function CampaignStep3Schedule({ values, errors, onChange }: Props) {
  const timeValid =
    values.startTime &&
    values.endTime &&
    isEndTimeAfterStart(values.startTime, values.endTime)

  return (
    <>
      <SectionHeading>
        <SectionTitle>일정 및 장소</SectionTitle>
        <SectionDesc>촬영 일정과 지원 마감일을 입력해 주세요.</SectionDesc>
      </SectionHeading>
      <FormStack>
        <Input label="촬영일" required type="date" value={values.shootingDate}
          error={errors.shootingDate} onChange={(e) => onChange({ shootingDate: e.target.value })} />
        <Input label="지원 마감일" required type="date" value={values.applyDeadline}
          hint="Brand PICK·공고 목록 노출 기준"
          error={errors.applyDeadline} onChange={(e) => onChange({ applyDeadline: e.target.value })} />
        <TimeRow>
          <Input label="시작 시간" required type="time" value={values.startTime}
            error={errors.startTime} onChange={(e) => onChange({ startTime: e.target.value })} />
          <Input label="종료 시간" required type="time" value={values.endTime}
            error={errors.endTime} onChange={(e) => onChange({ endTime: e.target.value })} />
        </TimeRow>
        {timeValid && (
          <ValidMsg>검증: 종료 시간이 시작 시간보다 이후입니다.</ValidMsg>
        )}
        <Input label="장소" required value={values.location}
          error={errors.location} onChange={(e) => onChange({ location: e.target.value })} />
        <InfoBox>지원 마감일은 공고 목록·Brand PICK D-day에 반영됩니다.</InfoBox>
      </FormStack>
    </>
  )
}

const TimeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`

const ValidMsg = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${theme.colors.success};
  text-align: left;
`
