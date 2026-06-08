import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  ModelCreateStep,
  ModelProfileFormErrors,
  ModelProfileFormValues,
} from '@/domain/entities/modelProfile'
import { createEmptyModelProfileForm } from '@/domain/usecases/modelProfile/createEmptyModelProfileForm'
import { validateModelProfileStep } from '@/domain/usecases/modelProfile/validateModelProfileForm'
import {
  createModelProfile,
  saveModelProfileDraft,
} from '@/data/repositories/modelProfileRepository'

/** 모델 등록 4단계 위저드 상태·네비게이션 훅 */
export function useModelCreateWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState<ModelCreateStep>(1)
  const [values, setValues] = useState<ModelProfileFormValues>(createEmptyModelProfileForm)
  const [errors, setErrors] = useState<ModelProfileFormErrors>({})
  const [draftId, setDraftId] = useState<string | undefined>()
  const [toast, setToast] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  /** 폼 필드 단일/부분 업데이트 */
  const updateValues = useCallback((patch: Partial<ModelProfileFormValues>) => {
    setValues((prev) => ({ ...prev, ...patch }))
    setErrors({})
  }, [])

  /** 현재 단계 검증 후 다음 단계 이동 */
  const goNext = useCallback(() => {
    const stepErrors = validateModelProfileStep(step, values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setStep((s) => Math.min(4, s + 1) as ModelCreateStep)
  }, [step, values])

  /** 이전 단계 또는 목록으로 이동 */
  const goPrev = useCallback(() => {
    if (step === 1) {
      navigate('/models')
      return
    }
    setStep((s) => (s - 1) as ModelCreateStep)
    setErrors({})
  }, [step, navigate])

  /** 임시 저장 후 토스트 표시 */
  const saveDraft = useCallback(async () => {
    setSubmitting(true)
    try {
      const saved = await saveModelProfileDraft(values, draftId)
      setDraftId(saved.id)
      setToast('임시 저장되었습니다.')
    } finally {
      setSubmitting(false)
    }
  }, [values, draftId])

  /** 최종 등록 후 상세 페이지로 이동 */
  const submit = useCallback(async () => {
    const stepErrors = validateModelProfileStep(4, values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setSubmitting(true)
    try {
      const profile = await createModelProfile(values)
      navigate(`/models/${profile.id}`)
    } finally {
      setSubmitting(false)
    }
  }, [values, navigate])

  /** 토스트 닫기 */
  const closeToast = useCallback(() => setToast(null), [])

  return {
    step,
    values,
    errors,
    toast,
    submitting,
    updateValues,
    goNext,
    goPrev,
    saveDraft,
    submit,
    closeToast,
    setStep,
  }
}
