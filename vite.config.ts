import { defineConfig } from 'vite';
import type { ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
import { spawn } from 'child_process';

// 외부 브라우저를 여는 Vite 플러그인
const openExternalBrowser = () => {
  return {
    name: 'open-external-browser',
    configureServer(server: ViteDevServer) {
      server.httpServer?.once('listening', () => {
        setTimeout(() => {
          const address = server.httpServer?.address();
          let port = 5173;
          
          if (address && typeof address === 'object') {
            port = address.port;
          } else if (typeof address === 'string') {
            // Unix socket인 경우
            return;
          }
          
          const serverUrl = `http://localhost:${port}`;
          
          // 플랫폼별 외부 기본 브라우저로 열기
          const isWindows = process.platform === 'win32';
          const isMacOS = process.platform === 'darwin';
          
          try {
            if (isWindows) {
              const child = spawn('cmd.exe', ['/c', 'start', '""', serverUrl], {
                detached: true,
                stdio: 'ignore',
                shell: false,
              });
              child.unref();
            } else if (isMacOS) {
              spawn('open', [serverUrl], {
                detached: true,
                stdio: 'ignore',
              }).unref();
            } else {
              // Linux
              spawn('xdg-open', [serverUrl], {
                detached: true,
                stdio: 'ignore',
              }).unref();
            }
          } catch (error) {
            console.error('브라우저를 열 수 없습니다:', error);
          }
        }, 500);
      });
    },
  };
};

export default defineConfig({
  plugins: [react(), openExternalBrowser()],
  /* Vite 절대 경로 설정 */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'localhost', // IPv4만 사용하도록 설정
    port: 5173,
    open: false, // 기본 브라우저 열기 비활성화 (하이퍼링크 클릭 시 내부 브라우저로 열리는 것 방지)
    hmr: {
      overlay: true, // 에러 오버레이 활성화
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router';
          }
          if (id.includes('node_modules/styled-components')) {
            return 'styled';
          }
        },
      },
    },
  },
});
