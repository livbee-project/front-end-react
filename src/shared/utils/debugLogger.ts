/**
 * 디버깅 로그 유틸리티
 * 개발 환경에서만 동작하는 디버깅 로그를 제공합니다.
 */

interface DebugLogData {
  location: string;
  message: string;
  data?: Record<string, unknown>;
  timestamp: number;
  sessionId?: string;
  runId?: string;
  hypothesisId?: string;
}

/**
 * 디버깅 로그를 전송합니다.
 * 개발 환경에서만 동작하며, 프로덕션에서는 무시됩니다.
 * 
 * @param data - 로그 데이터
 */
export function sendDebugLog(data: DebugLogData): void {
  // 프로덕션 환경에서는 디버깅 로그를 전송하지 않음
  if (import.meta.env.PROD) {
    return;
  }

  // 환경 변수로 디버깅 로그 활성화 여부 확인
  const debugLogEnabled = import.meta.env.VITE_DEBUG_LOG_ENABLED === 'true';
  const debugLogEndpoint = import.meta.env.VITE_DEBUG_LOG_ENDPOINT;

  if (!debugLogEnabled || !debugLogEndpoint) {
    return;
  }

  // 비동기로 전송 (에러가 발생해도 앱에 영향을 주지 않음)
  fetch(debugLogEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => {
    // 에러 발생 시 무시 (디버깅 로그는 앱 동작에 영향을 주지 않아야 함)
  });
}

