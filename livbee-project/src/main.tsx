import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// 개발 모드에서도 StrictMode의 이중 마운트로 인한 API 중복 호출을 방지하기 위해
// StrictMode를 조건부로 활성화 (프로덕션에서는 StrictMode가 작동하지 않음)
const isDevelopment = import.meta.env.DEV;

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
