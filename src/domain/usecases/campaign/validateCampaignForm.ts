import type {
  CampaignCreateStep,
  CampaignFormErrors,
  CampaignFormValues,
} from '@/domain/entities/campaign'

const LIMITS = {
  brandName: 50,
  title: 100,
  summary: 80,
  description: 3000,
  imageMb: 10,
} as const

/** HH:mm 문자열을 분 단위로 변환 */
function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return (h ?? 0) * 60 + (m ?? 0)
}

/** 종료시간이 시작시간보다 이후인지 검사 */
export function isEndTimeAfterStart(startTime: string, endTime: string): boolean {
  if (!startTime || !endTime) return false
  return timeToMinutes(endTime) > timeToMinutes(startTime)
}

/** 단계별 공고 폼 검증 */
export function validateCampaignStep(
  step: CampaignCreateStep,
  values: CampaignFormValues,
): CampaignFormErrors {
  const errors: CampaignFormErrors = {}

  if (step === 1) {
    if (!values.coverImage) errors.coverImage = '대표 이미지를 등록해 주세요.'
    if (!values.liveThumbnail) errors.liveThumbnail = '라이브 썸네일을 등록해 주세요.'
    if (!values.brandName.trim()) errors.brandName = '브랜드명을 입력해 주세요.'
    else if (values.brandName.length > LIMITS.brandName)
      errors.brandName = `브랜드명은 ${LIMITS.brandName}자 이내입니다.`
    if (!values.title.trim()) errors.title = '공고 제목을 입력해 주세요.'
    else if (values.title.length > LIMITS.title)
      errors.title = `제목은 ${LIMITS.title}자 이내입니다.`
    if (!values.summary.trim()) errors.summary = '한줄 소개를 입력해 주세요.'
    else if (values.summary.length > LIMITS.summary)
      errors.summary = `한줄 소개는 ${LIMITS.summary}자 이내입니다.`
    if (!values.description.trim()) errors.description = '상세 설명을 입력해 주세요.'
    else if (values.description.length > LIMITS.description)
      errors.description = `상세 설명은 ${LIMITS.description}자 이내입니다.`
  }

  if (step === 2) {
    if (!values.recruitType) errors.recruitType = '모집 구분을 선택해 주세요.'
    if (!values.category) errors.category = '카테고리를 선택해 주세요.'
    if (!values.payment.trim()) errors.payment = '출연료를 입력해 주세요.'
    else if (!/^\d+$/.test(values.payment)) errors.payment = '출연료는 숫자만 입력해 주세요.'
    if (!values.recruitCount.trim()) errors.recruitCount = '모집 인원을 입력해 주세요.'
    else if (!/^\d+$/.test(values.recruitCount)) errors.recruitCount = '모집 인원은 숫자만 입력해 주세요.'
    if (!values.location.trim()) errors.location = '장소를 입력해 주세요.'
  }

  if (step === 3) {
    if (!values.shootingDate) errors.shootingDate = '촬영일을 선택해 주세요.'
    if (!values.applyDeadline) errors.applyDeadline = '지원 마감일을 선택해 주세요.'
    if (!values.startTime) errors.startTime = '시작 시간을 선택해 주세요.'
    if (!values.endTime) errors.endTime = '종료 시간을 선택해 주세요.'
    else if (values.startTime && !isEndTimeAfterStart(values.startTime, values.endTime))
      errors.endTime = '종료 시간은 시작 시간보다 이후여야 합니다.'
    if (!values.location.trim()) errors.location = '장소를 입력해 주세요.'
  }

  if (step === 4) {
    Object.assign(errors, validateCampaignStep(1, values))
    Object.assign(errors, validateCampaignStep(2, values))
    Object.assign(errors, validateCampaignStep(3, values))
  }

  return errors
}

/** 전체 폼 최종 제출 가능 여부 */
export function isCampaignFormComplete(values: CampaignFormValues): boolean {
  return Object.keys(validateCampaignStep(4, values)).length === 0
}

export { LIMITS as CAMPAIGN_LIMITS }
