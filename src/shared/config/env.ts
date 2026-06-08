/**
 * 환경 변수 SSOT
 * import.meta.env 직접 참조는 이 파일에서만 허용한다.
 */

const read = (key: keyof ImportMetaEnv): string =>
  (import.meta.env[key] as string | undefined) ?? '';

const readBool = (key: keyof ImportMetaEnv): boolean =>
  read(key).toLowerCase() === 'true';

export const env = {
  apiUrl: read('VITE_API_URL'),
  kakaoJsKey: read('VITE_KAKAO_JS_KEY'),
  kakaoRestKey: read('VITE_KAKAO_REST_KEY'),
  kakaoRedirectUri: read('VITE_KAKAO_REDIRECT_URI'),
  debugLogEnabled: readBool('VITE_DEBUG_LOG_ENABLED'),
  debugLogEndpoint: read('VITE_DEBUG_LOG_ENDPOINT'),
  useCommunityMock: readBool('VITE_USE_COMMUNITY_MOCK'),
  appTitle: read('VITE_APP_TITLE') || 'Livbee',
  deployTarget: read('VITE_DEPLOY_TARGET') || 'local',
  deployUrl: read('VITE_DEPLOY_URL'),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;
