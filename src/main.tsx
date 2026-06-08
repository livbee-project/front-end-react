import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { env } from '@/shared/config/env'
import { GlobalStyles } from '@/presentation/styles/globalStyles'
import { theme } from '@/presentation/styles/theme'
import App from './App.tsx'

document.title = env.appTitle

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
