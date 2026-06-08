import type { ModelProfile, ModelProfileFormValues } from '@/domain/entities/modelProfile'

const profiles = new Map<string, ModelProfile>()

/** 고유 ID 생성 */
function createId(): string {
  return `model-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/** 폼 값을 프로필 엔티티로 변환 */
function toProfile(
  values: ModelProfileFormValues,
  isDraft: boolean,
  existing?: ModelProfile,
): ModelProfile {
  const now = new Date().toISOString()
  return {
    ...values,
    id: existing?.id ?? createId(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    isDraft,
  }
}

/** 목 저장소에 프로필 등록 */
export function mockCreateModelProfile(values: ModelProfileFormValues): ModelProfile {
  const profile = toProfile(values, false)
  profiles.set(profile.id, profile)
  return profile
}

/** 목 저장소에 임시 저장 */
export function mockSaveModelProfileDraft(
  values: ModelProfileFormValues,
  draftId?: string,
): ModelProfile {
  const existing = draftId ? profiles.get(draftId) : undefined
  const profile = toProfile(values, true, existing)
  profiles.set(profile.id, profile)
  return profile
}

/** ID로 목 프로필 조회 */
export function mockGetModelProfileById(id: string): ModelProfile | null {
  return profiles.get(id) ?? null
}

/** 목 프로필 목록 조회 */
export function mockListModelProfiles(): ModelProfile[] {
  return Array.from(profiles.values()).sort(
    (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  )
}
