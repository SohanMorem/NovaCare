import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.html'], // Ensure .html is recognized
  },
  optimizeDeps: {
    exclude: ['@mapbox/node-pre-gyp'],
  },
});
