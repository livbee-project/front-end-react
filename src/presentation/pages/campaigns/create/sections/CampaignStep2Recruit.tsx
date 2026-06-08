import {
  CAMPAIGN_CATEGORY_OPTIONS,
  RECRUIT_TYPE_OPTIONS,
  type CampaignCategory,
  type CampaignFormErrors,
  type CampaignFormValues,
  type RecruitType,
} from '@/domain/entities/campaign'
import { ChipGroup } from '@/presentation/components/ui/ChipGroup'
import { Input } from '@/presentation/components/ui/Input'
import { Select } from '@/presentation/components/ui/Select'
import { formatPayment, parsePaymentInput } from '@/shared/utils/formatPayment'
import { FormStack, SectionDesc, SectionHeading, SectionTitle } from '@/presentation/pages/campaigns/create/styles/campaignCreate.styles'

interface Props {
  values: CampaignFormValues
  errors: CampaignFormErrors
  onChange: (patch: Partial<CampaignFormValues>) => void
}

/** STEP 2 — 모집 구분·출연료·인원·장소 */
export function CampaignStep2Recruit({ values, errors, onChange }: Props) {
  return (
    <>
      <SectionHeading>
        <SectionTitle>모집 정보</SectionTitle>
        <SectionDesc>모집 조건과 출연료를 입력해 주세요.</SectionDesc>
      </SectionHeading>
      <FormStack>
        <ChipGroup<RecruitType>
          label="모집 구분"
          required
          options={RECRUIT_TYPE_OPTIONS}
          value={values.recruitType}
          error={errors.recruitType}
          onChange={(v) => onChange({ recruitType: v })}
        />
        <Select
          label="카테고리"
          required
          placeholder="선택"
          options={CAMPAIGN_CATEGORY_OPTIONS}
          value={values.category}
          error={errors.category}
          onChange={(e) => onChange({ category: e.target.value as CampaignCategory })}
        />
        <Input
          label="출연료"
          required
          value={values.payment ? formatPayment(values.payment) : ''}
          hint="숫자만 입력 시 원 단위로 표시됩니다."
          error={errors.payment}
          onChange={(e) => onChange({ payment: parsePaymentInput(e.target.value) })}
        />
        <Input
          label="모집 인원"
          required
          type="number"
          value={values.recruitCount}
          error={errors.recruitCount}
          onChange={(e) => onChange({ recruitCount: e.target.value })}
        />
        <Input
          label="장소"
          required
          value={values.location}
          placeholder="예: 서울 강남구"
          error={errors.location}
          onChange={(e) => onChange({ location: e.target.value })}
        />
      </FormStack>
    </>
  )
}
