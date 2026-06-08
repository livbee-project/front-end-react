import type { ModelProfile, ModelProfileFormValues } from '@/domain/entities/modelProfile'
import {
  mockCreateModelProfile,
  mockGetModelProfileById,
  mockListModelProfiles,
  mockSaveModelProfileDraft,
} from '@/data/sources/mocks/modelProfileMockStore'

/** 모델 프로필 등록 완료 */
export async function createModelProfile(
  values: ModelProfileFormValues,
): Promise<ModelProfile> {
  return mockCreateModelProfile(values)
}

/** 모델 프로필 임시 저장 */
export async function saveModelProfileDraft(
  values: ModelProfileFormValues,
  draftId?: string,
): Promise<ModelProfile> {
  return mockSaveModelProfileDraft(values, draftId)
}

/** ID로 모델 프로필 조회 */
export async function getModelProfileById(id: string): Promise<ModelProfile | null> {
  return mockGetModelProfileById(id)
}

/** 모델 프로필 목록 조회 */
export async function listModelProfiles(): Promise<ModelProfile[]> {
  return mockListModelProfiles()
}
