/** 모델 프로필 등록 폼 옵션·카피 SSOT (test_codex ModelProfileCreatePage) */
export const MODEL_REGISTER_TYPES = [
  '패션모델',
  '뷰티모델',
  '피팅모델',
  '라이프모델',
  '키즈모델',
  '제품모델',
  '기타',
] as const;

export const MODEL_PROFILE_CARD_RATIO_LABEL = '3:4';
export const MODEL_PROFILE_CARD_RATIO = 3 / 4;

export type ModelRegisterType = (typeof MODEL_REGISTER_TYPES)[number];
export type ModelRegisterVisibility = 'public' | 'private';
