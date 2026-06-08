import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  CampaignCreateStep,
  CampaignFormErrors,
  CampaignFormValues,
} from '@/domain/entities/campaign'
import { createEmptyCampaignForm } from '@/domain/usecases/campaign/createEmptyCampaignForm'
import { validateCampaignStep } from '@/domain/usecases/campaign/validateCampaignForm'
import { createCampaign, saveCampaignDraft } from '@/data/repositories/campaignRepository'

/** 공고 등록 4단계 위저드 훅 */
export function useCampaignCreateWizard() {
  const navigate = useNavigate()
  const [step, setStep] = useState<CampaignCreateStep>(1)
  const [values, setValues] = useState<CampaignFormValues>(createEmptyCampaignForm)
  const [errors, setErrors] = useState<CampaignFormErrors>({})
  const [draftId, setDraftId] = useState<string | undefined>()
  const [toast, setToast] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  /** 폼 필드 부분 업데이트 */
  const updateValues = useCallback((patch: Partial<CampaignFormValues>) => {
    setValues((prev) => ({ ...prev, ...patch }))
    setErrors({})
  }, [])

  /** 검증 후 다음 단계 */
  const goNext = useCallback(() => {
    const stepErrors = validateCampaignStep(step, values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setStep((s) => Math.min(4, s + 1) as CampaignCreateStep)
  }, [step, values])

  /** 이전 단계 또는 목록 */
  const goPrev = useCallback(() => {
    if (step === 1) {
      navigate('/campaigns')
      return
    }
    setStep((s) => (s - 1) as CampaignCreateStep)
    setErrors({})
  }, [step, navigate])

  /** 임시 저장 */
  const saveDraft = useCallback(async () => {
    setSubmitting(true)
    try {
      const saved = await saveCampaignDraft(values, draftId)
      setDraftId(saved.id)
      setToast('임시 저장되었습니다.')
    } finally {
      setSubmitting(false)
    }
  }, [values, draftId])

  /** 등록 완료 후 상세 이동 */
  const submit = useCallback(async () => {
    const stepErrors = validateCampaignStep(4, values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setSubmitting(true)
    try {
      const campaign = await createCampaign(values)
      navigate(`/campaigns/${campaign.id}`)
    } finally {
      setSubmitting(false)
    }
  }, [values, navigate])

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
  }
}
