import { useState } from 'react'
import type { ModelProfileFormErrors, ModelProfileFormValues } from '@/domain/entities/modelProfile'
import { MODEL_PROFILE_LIMITS, isModelProfileFormComplete } from '@/domain/usecases/modelProfile/validateModelProfileForm'
import { ModelCard } from '@/presentation/components/models/ModelCard'
import { ModelDetailPreview } from '@/presentation/components/models/ModelDetailPreview'
import { Input } from '@/presentation/components/ui/Input'
import {
  Checklist,
  FormStack,
  SectionDesc,
  SectionHeading,
  SectionTitle,
  TagChip,
  TagInputRow,
  TagList,
} from '@/presentation/pages/models/create/styles/modelCreate.styles'
import { Button } from '@/presentation/components/ui/Button'

interface Step4PreviewProps {
  values: ModelProfileFormValues
  errors: ModelProfileFormErrors
  onChange: (patch: Partial<ModelProfileFormValues>) => void
}

/** STEP 4 — 태그 입력·전체 미리보기·체크리스트 섹션 */
export function Step4Preview({ values, errors, onChange }: Step4PreviewProps) {
  const [tagInput, setTagInput] = useState('')
  const isComplete = isModelProfileFormComplete(values)

  /** 태그 추가 (최대 5개) */
  const addTag = () => {
    const tag = tagInput.trim().replace(/^#/, '')
    if (!tag || values.tags.includes(tag)) return
    if (values.tags.length >= MODEL_PROFILE_LIMITS.tags) return
    onChange({ tags: [...values.tags, tag] })
    setTagInput('')
  }

  /** 태그 삭제 */
  const removeTag = (tag: string) => {
    onChange({ tags: values.tags.filter((t) => t !== tag) })
  }

  return (
    <>
      <SectionHeading>
        <SectionTitle>미리보기 / 완료</SectionTitle>
        <SectionDesc>태그를 추가하고 등록 전 최종 확인합니다.</SectionDesc>
      </SectionHeading>

      <FormStack>
        <div>
          <Input
            label={`태그 (최대 ${MODEL_PROFILE_LIMITS.tags}개)`}
            value={tagInput}
            placeholder="태그 입력 후 추가"
            error={errors.tags}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <TagInputRow style={{ marginTop: 8 }}>
            <Button type="button" variant="secondary" size="sm" onClick={addTag}>
              태그 추가
            </Button>
          </TagInputRow>
          <TagList>
            {values.tags.map((tag) => (
              <TagChip key={tag}>
                #{tag}
                <button type="button" onClick={() => removeTag(tag)}>×</button>
              </TagChip>
            ))}
          </TagList>
        </div>

        <div>
          <SectionDesc style={{ fontWeight: 600, color: 'inherit', marginBottom: 12 }}>
            1. ModelCard 미리보기
          </SectionDesc>
          <ModelCard
            profileImage={values.profileImage}
            name={values.name}
            modelType={values.modelType}
            height={values.height}
          />
        </div>

        <ModelDetailPreview values={values} />

        <div>
          <SectionDesc style={{ fontWeight: 600, color: 'inherit', marginBottom: 8 }}>
            최종 체크리스트
          </SectionDesc>
          <Checklist>
            <li>프로필 이미지 3:4 비율</li>
            <li>필수 입력값 완료 {isComplete ? '' : '(미완료)'}</li>
            <li>키/몸무게 숫자 입력</li>
            <li>URL 형식 검증</li>
            <li>태그 최대 5개 · 갤러리 9장 · 파일 10개</li>
            <li>평점·팔로워 필드 미사용</li>
          </Checklist>
        </div>
      </FormStack>
    </>
  )
}
