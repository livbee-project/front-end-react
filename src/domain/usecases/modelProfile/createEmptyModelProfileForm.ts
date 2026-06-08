import type { ModelProfileFormValues } from '@/domain/entities/modelProfile'

/** 빈 모델 프로필 등록 폼 초기값 생성 */
export function createEmptyModelProfileForm(): ModelProfileFormValues {
  return {
    profileImage: null,
    name: '',
    summary: '',
    description: '',
    modelType: '',
    height: '',
    weight: '',
    location: '',
    galleryImages: [],
    portfolioFiles: [],
    recentWorkUrl: '',
    contactEmail: '',
    contactEmailPublic: false,
    contactPhone: '',
    contactPhonePublic: false,
    openChatUrl: '',
    openChatPublic: false,
    recentWorkUrlPublic: false,
    tags: [],
  }
}
