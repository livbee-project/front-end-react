/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_KAKAO_JS_KEY: string;
  readonly VITE_KAKAO_REST_KEY: string;
  readonly VITE_KAKAO_REDIRECT_URI: string;
  readonly VITE_DEBUG_LOG_ENABLED: string;
  readonly VITE_DEBUG_LOG_ENDPOINT: string;
  readonly VITE_USE_COMMUNITY_MOCK: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_DEPLOY_TARGET: string;
  readonly VITE_DEPLOY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
