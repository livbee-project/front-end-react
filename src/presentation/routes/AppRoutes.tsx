import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/presentation/layouts/AppShell'
import { PlaceholderPage } from '@/presentation/pages/PlaceholderPage'

/** 앱 라우트 테이블 (인프라 스캐폴딩) */
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell>
            <PlaceholderPage title="LIVBEE" />
          </AppShell>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
