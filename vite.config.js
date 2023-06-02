import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  mode: 'development',
  publicDir: 'public', // relative to root
  envDir: '', // relative to root
  envPrefix: 'DODO_',
  logLevel: 'info',
  clearScreen: true,
  appType: 'spa',
  server: {
    host: '127.0.0.1',
    port: 3001,
    strictPort: true,
    https: false,
    cors: false,
    open: false,
    hmr: true
  },
  build: {
    outDir: '../dist',
    assetsDir: 'dodoBuild',
    emptyOutDir: true
  },
});
