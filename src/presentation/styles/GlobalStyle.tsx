import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NexonLv2Gothic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic Light.woff') format('woff');
    font-weight: 300;
    font-display: fallback;
  }

  @font-face {
    font-family: 'NexonLv2Gothic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff') format('woff');
    font-weight: 400;
    font-display: fallback;
  }

  @font-face {
    font-family: 'NexonLv2Gothic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic Bold.woff') format('woff');
    font-weight: 700;
    font-display: fallback;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    min-height: 100%;
    font-size: 16px;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.family};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.foreground};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    min-height: 100dvh;
    padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
    overscroll-behavior-y: none;
  }

  #root {
    min-height: 100%;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: ${({ theme }) => theme.fonts.family};
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

