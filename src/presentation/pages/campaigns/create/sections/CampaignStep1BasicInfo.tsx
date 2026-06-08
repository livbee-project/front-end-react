import type { ChangeEvent } from 'react'
import type { CampaignFormErrors, CampaignFormValues } from '@/domain/entities/campaign'
import { CAMPAIGN_LIMITS } from '@/domain/usecases/campaign/validateCampaignForm'
import { Input } from '@/presentation/components/ui/Input'
import { Textarea } from '@/presentation/components/ui/Textarea'
import {
  FormStack,
  SectionDesc,
  SectionHeading,
  SectionTitle,
  UploadRow,
  UploadZone,
} from '@/presentation/pages/campaigns/create/styles/campaignCreate.styles'
import { theme } from '@/presentation/styles/theme'
import styled from 'styled-components'

interface Props {
  values: CampaignFormValues
  errors: CampaignFormErrors
  onChange: (patch: Partial<CampaignFormValues>) => void
}

/** STEP 1 — 대표·라이브 이미지 및 기본 텍스트 */
export function CampaignStep1BasicInfo({ values, errors, onChange }: Props) {
  /** 이미지 파일 선택 공통 처리 */
  const handleImage =
    (field: 'coverImage' | 'liveThumbnail') => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || file.size > CAMPAIGN_LIMITS.imageMb * 1024 * 1024) return
      onChange({ [field]: URL.createObjectURL(file) })
    }

  return (
    <>
      <SectionHeading>
        <SectionTitle>기본 정보</SectionTitle>
        <SectionDesc>대표 이미지(4:3)와 라이브 썸네일(1:1)을 등록해 주세요.</SectionDesc>
      </SectionHeading>
      <FormStack>
        <UploadRow>
          <div>
            <FieldLabel>대표 이미지 (4:3) *</FieldLabel>
            {errors.coverImage && <Err>{errors.coverImage}</Err>}
            <UploadZone $ratio="4 / 3">
              {values.coverImage ? <img src={values.coverImage} alt="" /> : <>+ 업로드<br />JPG/PNG 10MB</>}
              <input type="file" accept="image/jpeg,image/png" onChange={handleImage('coverImage')} />
            </UploadZone>
          </div>
          <div>
            <FieldLabel>라이브 썸네일 (1:1) *</FieldLabel>
            {errors.liveThumbnail && <Err>{errors.liveThumbnail}</Err>}
            <UploadZone $ratio="1 / 1">
              {values.liveThumbnail ? <img src={values.liveThumbnail} alt="" /> : <>+ 업로드<br />1:1</>}
              <input type="file" accept="image/jpeg,image/png" onChange={handleImage('liveThumbnail')} />
            </UploadZone>
          </div>
        </UploadRow>
        <Input label="브랜드명" required value={values.brandName} maxLength={CAMPAIGN_LIMITS.brandName}
          error={errors.brandName} onChange={(e) => onChange({ brandName: e.target.value })} />
        <Input label="공고 제목" required value={values.title} maxLength={CAMPAIGN_LIMITS.title}
          error={errors.title} onChange={(e) => onChange({ title: e.target.value })} />
        <Input label="한줄 소개" required value={values.summary} maxLength={CAMPAIGN_LIMITS.summary}
          error={errors.summary} onChange={(e) => onChange({ summary: e.target.value })} />
        <Textarea label="상세 설명" required value={values.description} maxLength={CAMPAIGN_LIMITS.description}
          error={errors.description} onChange={(e) => onChange({ description: e.target.value })} />
      </FormStack>
    </>
  )
}

const FieldLabel = styled.div`font-size: 14px; font-weight: 600; margin-bottom: 8px; text-align: left;`
const Err = styled.span`font-size: 12px; color: ${theme.colors.error}; display: block; margin-bottom: 6px; text-align: left;`
