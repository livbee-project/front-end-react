/** 모델 유형 선택지 */
export const MODEL_TYPE_OPTIONS = [
  '여성',
  '남성',
  '키즈',
  '시니어',
  '피팅',
  '뷰티',
  '스포츠',
  '기타',
] as const

/** 활동 지역 선택지 */
export const LOCATION_OPTIONS = [
  '서울',
  '경기',
  '인천',
  '부산',
  '대구',
  '대전',
  '광주',
  '기타',
] as const

export type ModelType = (typeof MODEL_TYPE_OPTIONS)[number]
export type ModelLocation = (typeof LOCATION_OPTIONS)[number]

/** 갤러리 이미지 항목 */
export interface GalleryImageItem {
  id: string
  name: string
  url: string
}

/** 포트폴리오 파일 항목 */
export interface PortfolioFileItem {
  id: string
  name: string
  mimeType: string
  size: number
  url: string
}

/** 모델 프로필 등록 폼 전체 값 */
export interface ModelProfileFormValues {
  profileImage: string | null
  name: string
  summary: string
  description: string
  modelType: ModelType | ''
  height: string
  weight: string
  location: ModelLocation | ''
  galleryImages: GalleryImageItem[]
  portfolioFiles: PortfolioFileItem[]
  recentWorkUrl: string
  contactEmail: string
  contactEmailPublic: boolean
  contactPhone: string
  contactPhonePublic: boolean
  openChatUrl: string
  openChatPublic: boolean
  recentWorkUrlPublic: boolean
  tags: string[]
}

/** 저장된 모델 프로필 엔티티 */
export interface ModelProfile extends ModelProfileFormValues {
  id: string
  createdAt: string
  updatedAt: string
  isDraft: boolean
}

/** 등록 위저드 단계 (1~4) */
export type ModelCreateStep = 1 | 2 | 3 | 4

/** 폼 필드별 검증 에러 맵 */
export type ModelProfileFormErrors = Partial<Record<keyof ModelProfileFormValues, string>>
