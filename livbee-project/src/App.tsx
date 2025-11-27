import { ThemeProvider } from 'styled-components';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AppRouter from './app/Router';
import { theme } from '@/presentation/styles/theme';
import { GlobalStyle } from '@/presentation/styles/GlobalStyle';
import { GlobalErrorBoundary } from '@/presentation/components/error/GlobalErrorBoundary';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalErrorBoundary>
        <AppRouter />
      </GlobalErrorBoundary>
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
