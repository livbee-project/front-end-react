import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/presentation/layouts/AppShell'
import { CampaignCreatePage } from '@/presentation/pages/campaigns/create/CampaignCreatePage'
import { CampaignDetailPage } from '@/presentation/pages/campaigns/CampaignDetailPage'
import { CampaignsListPage } from '@/presentation/pages/campaigns/CampaignsListPage'
import { HomePage } from '@/presentation/pages/home/HomePage'
import { ModelCreatePage } from '@/presentation/pages/models/create/ModelCreatePage'
import { ModelDetailPage } from '@/presentation/pages/models/ModelDetailPage'
import { ModelsListPage } from '@/presentation/pages/models/ModelsListPage'
import { PlaceholderPage } from '@/presentation/pages/PlaceholderPage'

/** 앱 라우트 테이블 */
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell>
            <HomePage />
          </AppShell>
        }
      />
      <Route path="/models/create" element={<ModelCreatePage />} />
      <Route
        path="/models"
        element={
          <AppShell>
            <ModelsListPage />
          </AppShell>
        }
      />
      <Route
        path="/models/:id"
        element={
          <AppShell>
            <ModelDetailPage />
          </AppShell>
        }
      />
      <Route path="/campaigns/create" element={<CampaignCreatePage />} />
      <Route
        path="/campaigns"
        element={
          <AppShell>
            <CampaignsListPage />
          </AppShell>
        }
      />
      <Route
        path="/campaigns/:id"
        element={
          <AppShell>
            <CampaignDetailPage />
          </AppShell>
        }
      />
      <Route path="/hosts" element={<AppShell><PlaceholderPage title="쇼호스트" /></AppShell>} />
      <Route path="/events" element={<AppShell><PlaceholderPage title="이벤트" /></AppShell>} />
      <Route path="/news" element={<AppShell><PlaceholderPage title="뉴스" /></AppShell>} />
      <Route path="/clips" element={<AppShell><PlaceholderPage title="숏클립" /></AppShell>} />
      <Route path="/mypage" element={<AppShell><PlaceholderPage title="마이페이지" /></AppShell>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
