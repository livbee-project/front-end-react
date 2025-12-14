import { ThemeProvider } from 'styled-components';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AppRouter from '@/app/Router';
import { theme } from '@/presentation/styles/theme';
import { GlobalStyle } from '@/presentation/styles/GlobalStyle';
import { GlobalErrorBoundary } from '@/presentation/components/error/GlobalErrorBoundary';
import { ToastProvider } from '@/presentation/contexts/ToastContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalErrorBoundary>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </GlobalErrorBoundary>
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
