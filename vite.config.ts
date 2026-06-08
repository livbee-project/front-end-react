import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), 'VITE_')
  const deployUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : fileEnv.VITE_DEPLOY_URL || ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_DEPLOY_URL': JSON.stringify(deployUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: 'localhost',
      port: 5173,
    },
  }
})
