import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/presentation/routes/AppRoutes'

/** 루트 앱 — 라우터 제공 */
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
