import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// 개발 모드에서도 StrictMode의 이중 마운트로 인한 API 중복 호출을 방지하기 위해
// StrictMode를 조건부로 활성화 (프로덕션에서는 StrictMode가 작동하지 않음)
const isDevelopment = import.meta.env.DEV;

// 개발 환경에서 전역 에러 핸들러 설정 (처리되지 않은 에러 캐치)
if (isDevelopment) {
  // 처리되지 않은 Promise rejection 캐치
  window.addEventListener('unhandledrejection', (event) => {
    console.group('🚨 [Unhandled Promise Rejection]');
    console.error('에러:', event.reason);
    if (event.reason instanceof Error) {
      console.error('에러 메시지:', event.reason.message);
      console.error('에러 스택:', event.reason.stack);
    }
    console.error('전체 이벤트:', event);
    console.groupEnd();
  });

  // 처리되지 않은 일반 에러 캐치
  window.addEventListener('error', (event) => {
    console.group('🚨 [Unhandled Error]');
    console.error('에러 메시지:', event.message);
    console.error('파일:', event.filename);
    console.error('라인:', event.lineno);
    console.error('컬럼:', event.colno);
    console.error('에러 객체:', event.error);
    if (event.error instanceof Error) {
      console.error('에러 스택:', event.error.stack);
    }
    console.error('전체 이벤트:', event);
    console.groupEnd();
  });
}

const root = createRoot(document.getElementById('root')!);

if (isDevelopment) {
  // 개발 모드: StrictMode 비활성화 (API 중복 호출 방지)
  root.render(<App />);
} else {
  // 프로덕션 모드: StrictMode 활성화 (프로덕션에서는 어차피 작동하지 않음)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
