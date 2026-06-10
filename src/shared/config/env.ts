/** 환경 변수 SSOT — import.meta.env 직접 참조는 이 파일만 사용 */

export type DeployTarget = 'local' | 'renewal' | 'preview' | 'production';

// VITE_* tri-state: true/false 명시 시 그대로, 미설정 시 defaultValue
const readEnvBool = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return defaultValue;
};

const deployTarget = (import.meta.env.VITE_DEPLOY_TARGET ?? 'local') as DeployTarget;

/** production 제외(local·renewal·preview)는 목데이터·등록 권한 우회 기본 on */
const devVerificationDefaults = deployTarget !== 'production';

export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  deployTarget,
  deployUrl: import.meta.env.VITE_DEPLOY_URL ?? '',
  useCommunityMock: import.meta.env.VITE_USE_COMMUNITY_MOCK === 'true',
  useHomeMock: readEnvBool(import.meta.env.VITE_USE_HOME_MOCK, devVerificationDefaults),
  usePortfolioMock: readEnvBool(import.meta.env.VITE_USE_PORTFOLIO_MOCK, devVerificationDefaults),
  useModelMock: readEnvBool(import.meta.env.VITE_USE_MODEL_MOCK, devVerificationDefaults),
  /** false면 목록 등록 FAB 숨김 (미설정 시 true) */
  registerFabEnabled: import.meta.env.VITE_REGISTER_FAB_ENABLED !== 'false',
  /** true면 FAB·등록 페이지 로그인·권한 검사 생략 (production 제외 기본 on) */
  registerFabAuthSkipped: readEnvBool(
    import.meta.env.VITE_REGISTER_FAB_SKIP_AUTH,
    devVerificationDefaults,
  ),
} as const;
