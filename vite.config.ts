import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // plugins: [
  //   react(),
  //   tsconfigPaths(),
  //   tailwindcss(),
  //   svgr({
  //     svgrOptions: {
  //       exportType: 'named',
  //       ref: true,
  //       svgo: false,
  //       titleProp: true,
  //     },
  //     include: ['**/*.svg'],
  //   }),
  // ],
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: ['**/*.svg'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
