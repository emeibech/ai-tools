import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        theme_color: '#08333b',
        background_color: '#08333b',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        short_name: 'vite test',
        description: 'testing vite pwa',
        name: 'vite test',
        icons: [
          {
            src: '/192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
