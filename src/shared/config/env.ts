/** 환경 변수 SSOT — import.meta.env 직접 참조는 이 파일만 사용 */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? '',
  useCommunityMock: import.meta.env.VITE_USE_COMMUNITY_MOCK === 'true',
  useHomeMock: import.meta.env.VITE_USE_HOME_MOCK === 'true',
  usePortfolioMock: import.meta.env.VITE_USE_PORTFOLIO_MOCK === 'true',
  /** false면 목록 등록 FAB·로그인/권한 연동 비활성 (미설정 시 true) */
  registerFabEnabled: import.meta.env.VITE_REGISTER_FAB_ENABLED !== 'false',
} as const;
