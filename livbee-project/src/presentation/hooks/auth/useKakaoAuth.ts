import { useState, useCallback, useRef, useEffect } from 'react';
import type { KakaoUserInfo } from '@/domain/entities/User';
import { useToast } from '@/presentation/contexts/ToastContext';

// 카카오 공식 문서 기준 v2 SDK CDN (버전 명시 필요)
// 참고: https://developers.kakao.com/docs/latest/ko/javascript/download
const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.0/kakao.min.js';
const KAKAO_AUTH_BASE = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_USER_ME_URL = '/v2/user/me';
const POPUP_NAME = 'kakao_auth_popup';

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        authorize: (options: { redirectUri: string; scope?: string; state?: string }) => void;
        setAccessToken: (token: string) => void;
        getAccessToken: () => string | null;
      };
      API: {
        request: (params: { url: string; data?: { property_keys?: string[] } }) => Promise<KakaoMeResponse>;
      };
    };
  }
}

interface KakaoMeResponse {
  id?: number;
  kakao_account?: {
    email?: string;
    email_needs_agreement?: boolean;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
  properties?: {
    nickname?: string;
    profile_image?: string;
  };
}

function getRedirectUri(): string {
  const envUri = import.meta.env.VITE_KAKAO_REDIRECT_URI as string | undefined;
  if (envUri) return envUri;
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${window.location.pathname.replace(/\/?$/, '')}/kakao-callback`;
  }
  return '';
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('카카오 SDK 스크립트 로드에 실패했습니다.'));
    document.head.appendChild(script);
  });
}

function ensureKakaoReady(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('브라우저 환경에서만 사용할 수 있습니다.'));
  }
  if (!apiKey || apiKey.trim() === '') {
    return Promise.reject(new Error('VITE_KAKAO_JS_KEY가 설정되지 않았습니다.'));
  }
  return loadScript(KAKAO_SDK_URL).then(() => {
    const Kakao = window.Kakao;
    if (!Kakao) {
      throw new Error('카카오 SDK가 로드되지 않았습니다.');
    }
    if (!Kakao.isInitialized()) {
      Kakao.init(apiKey);
    }
    if (!Kakao.isInitialized()) {
      throw new Error('카카오 SDK 초기화에 실패했습니다.');
    }
  });
}

function mapMeResponseToKakaoUserInfo(res: KakaoMeResponse): KakaoUserInfo {
  const name =
    res.kakao_account?.profile?.nickname ??
    res.properties?.nickname ??
    '';
  const email = res.kakao_account?.email ?? '';
  const kakaoId = typeof res.id === 'number' ? String(res.id) : undefined;
  return { name, email, kakaoId };
}

export interface UseKakaoAuthReturn {
  loginWithKakao: () => Promise<KakaoUserInfo>;
  isLoading: boolean;
}

/**
 * 카카오 로그인(회원가입 플로우) 훅.
 * SDK 동적 로드 후 loginWithKakao()로 로그인하며, 프로필(닉네임 → name)과 이메일을 반환합니다.
 * 호출 측에서 setName/setEmail 등으로 폼에 반영하면 됩니다.
 */
export function useKakaoAuth(): UseKakaoAuthReturn {
  const [isLoading, setIsLoading] = useState(true);
  const sdkReadyRef = useRef(false);
  const { showToast } = useToast();

  useEffect(() => {
    const key = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;
    ensureKakaoReady(key ?? '')
      .then(() => {
        sdkReadyRef.current = true;
      })
      .catch(() => {
        sdkReadyRef.current = false;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loginWithKakao = useCallback((): Promise<KakaoUserInfo> => {
    const apiKey = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;
    if (!apiKey?.trim()) {
      const err = new Error('VITE_KAKAO_JS_KEY가 설정되지 않았습니다.');
      showToast(err.message, undefined, 'error');
      return Promise.reject(err);
    }

    if (!sdkReadyRef.current || !window.Kakao) {
      const err = new Error('카카오 SDK가 준비되지 않았습니다. 잠시 후 다시 시도해 주세요.');
      showToast(err.message, undefined, 'error');
      return Promise.reject(err);
    }

    setIsLoading(true);
    const redirectUri = getRedirectUri();
    const authUrl = `${KAKAO_AUTH_BASE}?client_id=${encodeURIComponent(apiKey)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=account_email,profile_nickname`;

    return new Promise<KakaoUserInfo>((resolve, reject) => {
      const width = 500;
      const height = 600;
      const left = Math.round((window.screen.width - width) / 2);
      const top = Math.round((window.screen.height - height) / 2);
      const popup = window.open(
        authUrl,
        POPUP_NAME,
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      if (!popup) {
        setIsLoading(false);
        const err = new Error('팝업이 차단되었습니다. 팝업 허용 후 다시 시도해 주세요.');
        showToast(err.message, undefined, 'error');
        reject(err);
        return;
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.source !== popup) return;
        const data = event.data as unknown;
        if (!data || typeof data !== 'object') return;

        if ('kakaoAccessToken' in data && typeof (data as { kakaoAccessToken: string }).kakaoAccessToken === 'string') {
          const token = (data as { kakaoAccessToken: string }).kakaoAccessToken;
          window.removeEventListener('message', handleMessage);
          window.Kakao?.Auth.setAccessToken(token);
          window.Kakao?.API.request({
            url: KAKAO_USER_ME_URL,
            data: { property_keys: ['kakao_account.email', 'kakao_account.profile'] },
          })
            .then((res) => {
              const info = mapMeResponseToKakaoUserInfo(res);
              if (!info.email) {
                showToast('이메일 동의가 필요합니다.', undefined, 'error');
                reject(new Error('이메일 동의가 필요합니다.'));
                return;
              }
              setIsLoading(false);
              resolve(info);
            })
            .catch((err) => {
              setIsLoading(false);
              const message = err?.message ?? '프로필 조회에 실패했습니다.';
              showToast(message, undefined, 'error');
              reject(err);
            });
          return;
        }

        if ('name' in data && 'email' in data) {
          const payload = data as { name: string; email: string };
          window.removeEventListener('message', handleMessage);
          setIsLoading(false);
          resolve({ name: payload.name ?? '', email: payload.email ?? '' });
        }
      };

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
          setIsLoading(false);
          reject(new Error('로그인 창이 닫혔습니다.'));
        }
      }, 300);

      window.addEventListener('message', handleMessage);
    });
  }, [showToast]);

  return { loginWithKakao, isLoading };
}
