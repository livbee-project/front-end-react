import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/presentation/styles/theme';
import { GlobalStyle } from '../src/presentation/styles/GlobalStyle';
import React from 'react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Guides',
          'Auth',
          'Cards',
          'Design System',
          'Detail',
          'Forms',
          'Layouts',
          'Navigation',
          'Sections',
          'UI Components',
        ],
      },
      // Overview를 기본 진입 페이지로 설정
      initialGlobals: {
        viewMode: 'docs',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
