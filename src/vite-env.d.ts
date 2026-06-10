/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_KAKAO_JS_KEY?: string;
  readonly VITE_KAKAO_REST_KEY?: string;
  readonly VITE_KAKAO_REDIRECT_URI?: string;
  readonly VITE_DEBUG_LOG_ENABLED?: string;
  readonly VITE_DEBUG_LOG_ENDPOINT?: string;
  readonly VITE_USE_COMMUNITY_MOCK?: string;
  readonly VITE_USE_HOME_MOCK?: string;
  readonly VITE_USE_PORTFOLIO_MOCK?: string;
  readonly VITE_USE_MODEL_MOCK?: string;
  readonly VITE_REGISTER_FAB_ENABLED?: string;
  readonly VITE_REGISTER_FAB_SKIP_AUTH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
