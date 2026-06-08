import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { env } from '@/shared/config/env'
import './index.css'
import App from './App.tsx'

document.title = env.appTitle

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
