import type { ChangeEvent } from 'react'
import {
  LOCATION_OPTIONS,
  MODEL_TYPE_OPTIONS,
  type ModelProfileFormErrors,
  type ModelProfileFormValues,
  type ModelLocation,
  type ModelType,
} from '@/domain/entities/modelProfile'
import { MODEL_PROFILE_LIMITS } from '@/domain/usecases/modelProfile/validateModelProfileForm'
import { ChipGroup } from '@/presentation/components/ui/ChipGroup'
import { Input } from '@/presentation/components/ui/Input'
import { Textarea } from '@/presentation/components/ui/Textarea'
import {
  FormStack,
  SectionDesc,
  SectionHeading,
  SectionTitle,
  UploadZone,
} from '@/presentation/pages/models/create/styles/modelCreate.styles'

interface Step1BasicInfoProps {
  values: ModelProfileFormValues
  errors: ModelProfileFormErrors
  onChange: (patch: Partial<ModelProfileFormValues>) => void
}

/** STEP 1 — 기본 정보 입력 섹션 */
export function Step1BasicInfo({ values, errors, onChange }: Step1BasicInfoProps) {
  /** 프로필 이미지 파일 선택 처리 */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MODEL_PROFILE_LIMITS.profileImageMb * 1024 * 1024) return
    const url = URL.createObjectURL(file)
    onChange({ profileImage: url })
  }

  return (
    <>
      <SectionHeading>
        <SectionTitle>기본 정보</SectionTitle>
        <SectionDesc>프로필의 핵심 정보를 정확히 입력해 주세요.</SectionDesc>
      </SectionHeading>

      <FormStack>
        <div>
          {errors.profileImage && (
            <span style={{ fontSize: 12, color: '#EF4444', display: 'block', marginBottom: 6, textAlign: 'left' }}>
              {errors.profileImage}
            </span>
          )}
          <UploadZone>
            {values.profileImage ? (
              <img src={values.profileImage} alt="프로필 미리보기" />
            ) : (
              <>
                <span>+ 이미지 업로드</span>
                <span>JPG, PNG · 최대 5MB · 3:4</span>
              </>
            )}
            <input type="file" accept="image/jpeg,image/png" onChange={handleImageChange} />
          </UploadZone>
        </div>

        <Input
          label="이름"
          required
          value={values.name}
          maxLength={MODEL_PROFILE_LIMITS.name}
          placeholder="이름을 입력하세요"
          error={errors.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />

        <Input
          label="한줄 소개"
          required
          value={values.summary}
          maxLength={MODEL_PROFILE_LIMITS.summary}
          placeholder="한줄로 자신을 소개해 주세요"
          error={errors.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
        />

        <Textarea
          label="상세 소개"
          required
          value={values.description}
          maxLength={MODEL_PROFILE_LIMITS.description}
          placeholder="경력, 특기, 스타일 등을 자세히 작성해 주세요"
          error={errors.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />

        <ChipGroup<ModelType>
          label="모델 유형"
          required
          options={MODEL_TYPE_OPTIONS}
          value={values.modelType}
          error={errors.modelType}
          onChange={(v) => onChange({ modelType: v })}
        />

        <Input
          label="키 (cm)"
          required
          type="number"
          value={values.height}
          placeholder="170"
          error={errors.height}
          onChange={(e) => onChange({ height: e.target.value })}
        />

        <Input
          label="몸무게 (kg)"
          type="number"
          value={values.weight}
          placeholder="선택 입력"
          error={errors.weight}
          onChange={(e) => onChange({ weight: e.target.value })}
        />

        <ChipGroup<ModelLocation>
          label="활동 지역"
          required
          options={LOCATION_OPTIONS}
          value={values.location}
          error={errors.location}
          onChange={(v) => onChange({ location: v })}
        />
      </FormStack>
    </>
  )
}
