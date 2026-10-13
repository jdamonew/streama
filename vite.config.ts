import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  base: '/streama/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@design-system': path.resolve(__dirname, './src/design-system'),
    },
  },
  server: {
    port: 5173,
    allowedHosts: [
      'streama.queendom.dev'
    ]
  },
});
