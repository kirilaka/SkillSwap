import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      src: resolve(__dirname, './src'),
      ui: resolve(__dirname, './src/shared/ui'),
      hooks: resolve(__dirname, './src/shared/hooks'),
      pages: resolve(__dirname, './src/pages'),
      features: resolve(__dirname, './src/features'),
      entities: resolve(__dirname, './src/entities'),
      shared: resolve(__dirname, './src/shared'),
      store: resolve(__dirname, './src/store/'),
      widgets: resolve(__dirname, './src/widgets/'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/app/styles/variables.scss" as *;`,
      },
    },
  },
  server: {
    open: true,
  },
});
