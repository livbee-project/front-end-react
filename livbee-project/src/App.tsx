import { ThemeProvider } from 'styled-components';
import AppRouter from './app/Router';
import { theme } from '@/presentation/styles/theme';
import { GlobalStyle } from '@/presentation/styles/GlobalStyle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
