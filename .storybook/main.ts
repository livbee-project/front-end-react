import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'node:url';

const config: StorybookConfig = {
  "stories": [
    // Overview를 먼저 로드하여 기본 진입 페이지로 설정
    "../src/presentation/stories/Overview.stories.tsx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-a11y"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  async viteFinal(config) {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(dirname, '../src'),
        },
      },
    });
  },
};
export default config;