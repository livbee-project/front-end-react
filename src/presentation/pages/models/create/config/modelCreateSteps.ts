import type { ModelCreateStep } from '@/domain/entities/modelProfile'

/** 등록 위저드 단계 메타 정보 */
export const MODEL_CREATE_STEPS: {
  step: ModelCreateStep
  title: string
  description: string
}[] = [
  { step: 1, title: '기본 정보', description: '프로필의 핵심 정보를 입력합니다.' },
  { step: 2, title: '포트폴리오', description: '이미지·파일 포트폴리오를 등록합니다.' },
  { step: 3, title: '연락처', description: '연락 가능한 정보를 입력합니다.' },
  { step: 4, title: '미리보기/완료', description: '입력 내용을 최종 확인합니다.' },
]
