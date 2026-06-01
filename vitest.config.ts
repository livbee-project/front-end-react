import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// 유닛 테스트: *.test.ts만 실행, Storybook 플러그인 없이 happy-dom 사용
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  test: {
    name: 'unit',
    include: ['**/*.test.ts'],
    environment: 'happy-dom',
  },
});
