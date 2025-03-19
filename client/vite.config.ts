import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  plugins: [
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json',
      },
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {},
  server: {
    port: 8882,
  },
});
