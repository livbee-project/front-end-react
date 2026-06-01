import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

/**
 * 카카오 로그인 팝업 리다이렉트 콜백 페이지.
 * URL의 code를 카카오 토큰 엔드포인트로 보내 access_token을 받고,
 * opener에 postMessage 후 창을 닫습니다.
 * 백엔드에 별도 /auth/kakao/* 엔드포인트가 없는 구조를 전제로 합니다.
 */
const KakaoCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string>('로그인 처리 중...');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const opener = window.opener;

    if (!opener) {
      setMessage('잘못된 접근입니다. 회원가입 페이지에서 다시 시도해 주세요.');
      setError(true);
      return;
    }

    if (!code) {
      setMessage('인가 코드를 받지 못했습니다. 다시 시도해 주세요.');
      setError(true);
      try {
        opener.postMessage({ type: 'kakao_error', error: 'no_code' }, window.location.origin);
      } catch {
        // ignore
      }
      return;
    }

    const redirectUri =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}`
        : '';

    const clientId =
      (import.meta.env.VITE_KAKAO_REST_KEY as string | undefined) ??
      (import.meta.env.VITE_KAKAO_JS_KEY as string | undefined) ??
      '';

    if (!clientId) {
      const errMsg = '카카오 클라이언트 키가 설정되지 않았습니다.';
      setMessage(errMsg);
      setError(true);
      try {
        opener.postMessage({ type: 'kakao_error', error: 'no_client_id' }, window.location.origin);
      } catch {
        // ignore
      }
      return;
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
    });

    fetch(KAKAO_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: body.toString(),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text().catch(() => '');
          throw new Error(
            errorText || '카카오 토큰 발급에 실패했습니다. 잠시 후 다시 시도해 주세요.'
          );
        }
        return res.json() as Promise<{ access_token?: string }>;
      })
      .then((data) => {
        const token = data?.access_token;
        if (token) {
          opener.postMessage({ kakaoAccessToken: token }, window.location.origin);
        } else {
          opener.postMessage(
            { type: 'kakao_error', error: 'no_access_token' },
            window.location.origin
          );
        }
        window.close();
      })
      .catch((err) => {
        const errMessage =
          err instanceof Error
            ? err.message
            : '카카오 로그인 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.';
        setMessage(errMessage);
        setError(true);
        try {
          opener.postMessage(
            { type: 'kakao_error', error: (err as Error)?.message ?? 'exchange_failed' },
            window.location.origin
          );
        } catch {
          // ignore
        }
      });
  }, [searchParams]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 24,
        fontFamily: 'system-ui, sans-serif',
        color: error ? '#c00' : '#333',
      }}
    >
      <p>{message}</p>
      {error && (
        <button
          type="button"
          onClick={() => window.close()}
          style={{ marginTop: 16, padding: '8px 16px', cursor: 'pointer' }}
        >
          창 닫기
        </button>
      )}
    </div>
  );
};

export default KakaoCallbackPage;
