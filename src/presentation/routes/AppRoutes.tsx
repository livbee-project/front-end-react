import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/presentation/layouts/AppShell'
import { CampaignCreatePage } from '@/presentation/pages/campaigns/create/CampaignCreatePage'
import { CampaignDetailPage } from '@/presentation/pages/campaigns/CampaignDetailPage'
import { CampaignsListPage } from '@/presentation/pages/campaigns/CampaignsListPage'
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
            <PlaceholderPage title="LIVBEE" />
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
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
