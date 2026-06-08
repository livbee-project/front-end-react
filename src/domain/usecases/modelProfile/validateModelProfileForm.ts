import type {
  ModelCreateStep,
  ModelProfileFormErrors,
  ModelProfileFormValues,
} from '@/domain/entities/modelProfile'
import { isValidEmail, isValidPhone, isValidUrl } from '@/shared/utils/urlValidation'

const LIMITS = {
  name: 20,
  summary: 50,
  description: 500,
  tags: 5,
  galleryImages: 9,
  portfolioFiles: 10,
  profileImageMb: 5,
} as const

/** 문자열 길이 초과 여부 검사 */
function exceedsMax(value: string, max: number): boolean {
  return value.length > max
}

/** 단계별 필수·형식 검증 */
export function validateModelProfileStep(
  step: ModelCreateStep,
  values: ModelProfileFormValues,
): ModelProfileFormErrors {
  const errors: ModelProfileFormErrors = {}

  if (step === 1) {
    if (!values.profileImage) errors.profileImage = '프로필 이미지를 등록해 주세요.'
    if (!values.name.trim()) errors.name = '이름을 입력해 주세요.'
    else if (exceedsMax(values.name, LIMITS.name)) errors.name = `이름은 ${LIMITS.name}자 이내입니다.`
    if (!values.summary.trim()) errors.summary = '한줄 소개를 입력해 주세요.'
    else if (exceedsMax(values.summary, LIMITS.summary))
      errors.summary = `한줄 소개는 ${LIMITS.summary}자 이내입니다.`
    if (!values.description.trim()) errors.description = '상세 소개를 입력해 주세요.'
    else if (exceedsMax(values.description, LIMITS.description))
      errors.description = `상세 소개는 ${LIMITS.description}자 이내입니다.`
    if (!values.modelType) errors.modelType = '모델 유형을 선택해 주세요.'
    if (!values.height.trim()) errors.height = '키를 입력해 주세요.'
    else if (!/^\d+$/.test(values.height)) errors.height = '키는 숫자만 입력해 주세요.'
    if (values.weight.trim() && !/^\d+$/.test(values.weight))
      errors.weight = '몸무게는 숫자만 입력해 주세요.'
    if (!values.location) errors.location = '활동 지역을 선택해 주세요.'
  }

  if (step === 2) {
    if (values.galleryImages.length > LIMITS.galleryImages)
      errors.galleryImages = `갤러리 이미지는 최대 ${LIMITS.galleryImages}장입니다.`
    if (values.portfolioFiles.length > LIMITS.portfolioFiles)
      errors.portfolioFiles = `파일은 최대 ${LIMITS.portfolioFiles}개입니다.`
    if (values.recentWorkUrl.trim() && !isValidUrl(values.recentWorkUrl))
      errors.recentWorkUrl = '올바른 URL 형식이 아닙니다.'
  }

  if (step === 3) {
    if (!values.contactPhone.trim()) errors.contactPhone = '연락처를 입력해 주세요.'
    else if (!isValidPhone(values.contactPhone))
      errors.contactPhone = '올바른 전화번호 형식이 아닙니다.'
    if (values.contactEmail.trim() && !isValidEmail(values.contactEmail))
      errors.contactEmail = '올바른 이메일 형식이 아닙니다.'
    if (values.openChatUrl.trim() && !isValidUrl(values.openChatUrl))
      errors.openChatUrl = '올바른 URL 형식이 아닙니다.'
  }

  if (step === 4) {
    if (values.tags.length > LIMITS.tags) errors.tags = `태그는 최대 ${LIMITS.tags}개입니다.`
    Object.assign(errors, validateModelProfileStep(1, values))
    Object.assign(errors, validateModelProfileStep(2, values))
    Object.assign(errors, validateModelProfileStep(3, values))
  }

  return errors
}

/** 전체 폼 최종 제출 가능 여부 */
export function isModelProfileFormComplete(values: ModelProfileFormValues): boolean {
  return Object.keys(validateModelProfileStep(4, values)).length === 0
}

export { LIMITS as MODEL_PROFILE_LIMITS }
