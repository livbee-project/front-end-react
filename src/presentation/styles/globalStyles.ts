import { createGlobalStyle } from 'styled-components'
import { theme } from '@/presentation/styles/theme'

/** 앱 전역 리셋·기본 타이포그래피 */
export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    background: ${theme.colors.backgroundSubtle};
    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100svh;
  }

  button, input, textarea, select {
    font-family: inherit;
  }

  a { color: inherit; text-decoration: none; }
`
