import type { ModelProfileFormErrors, ModelProfileFormValues } from '@/domain/entities/modelProfile'
import { Input } from '@/presentation/components/ui/Input'
import { Toggle } from '@/presentation/components/ui/Toggle'
import {
  FormStack,
  InfoBox,
  SectionDesc,
  SectionHeading,
  SectionTitle,
} from '@/presentation/pages/models/create/styles/modelCreate.styles'

interface Step3ContactProps {
  values: ModelProfileFormValues
  errors: ModelProfileFormErrors
  onChange: (patch: Partial<ModelProfileFormValues>) => void
}

/** STEP 3 — 연락처·공개 여부 입력 섹션 */
export function Step3Contact({ values, errors, onChange }: Step3ContactProps) {
  return (
    <>
      <SectionHeading>
        <SectionTitle>연락처</SectionTitle>
        <SectionDesc>계약·제안 시 사용할 연락처와 공개 여부를 설정합니다.</SectionDesc>
      </SectionHeading>

      <FormStack>
        <Input
          label="연락처"
          required
          value={values.contactPhone}
          placeholder="010-0000-0000"
          hint="목록 카드에는 노출되지 않습니다."
          error={errors.contactPhone}
          onChange={(e) => onChange({ contactPhone: e.target.value })}
        />
        <Toggle
          label="연락처 공개"
          description="ON 시 모델 상세 페이지에 연락처가 표시됩니다."
          checked={values.contactPhonePublic}
          onChange={(v) => onChange({ contactPhonePublic: v })}
        />

        <Input
          label="이메일"
          value={values.contactEmail}
          placeholder="email@example.com"
          error={errors.contactEmail}
          onChange={(e) => onChange({ contactEmail: e.target.value })}
        />
        <Toggle
          label="이메일 공개"
          description="ON 시 모델 상세 페이지에 이메일이 표시됩니다."
          checked={values.contactEmailPublic}
          onChange={(v) => onChange({ contactEmailPublic: v })}
        />

        <Input
          label="오픈채팅 링크"
          value={values.openChatUrl}
          placeholder="https://open.kakao.com/..."
          error={errors.openChatUrl}
          onChange={(e) => onChange({ openChatUrl: e.target.value })}
        />
        <Toggle
          label="오픈채팅 공개"
          description="ON 시 모델 상세 페이지에 오픈채팅 링크가 표시됩니다."
          checked={values.openChatPublic}
          onChange={(v) => onChange({ openChatPublic: v })}
        />

        <Toggle
          label="활동 링크(인스타) 공개"
          description="STEP 2에서 입력한 최근 활동 링크의 상세 노출 여부입니다."
          checked={values.recentWorkUrlPublic}
          onChange={(v) => onChange({ recentWorkUrlPublic: v })}
        />

        <InfoBox>
          목록 카드에는 연락처가 표시되지 않습니다. 상세 페이지에서만 공개 설정된 항목이 노출됩니다.
        </InfoBox>
      </FormStack>
    </>
  )
}
