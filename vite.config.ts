import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/card/', // vite build --base=/card/
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-icon-180.png', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'card',
        short_name: 'card',
        start_url: './card',
        theme_color: '#1976d2',
        background_color: '#fafafa',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
      },
      workbox: {
        // defining cached files formats
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
      }
    })
  ],
})
