import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    passWithNoTests: true,
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/setupTests.ts', 'src/**/*.d.ts', 'src/**/*.stories.*'],
      thresholds: {
        statements: 70,
      },
    },
  },
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
});
