import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  mode: 'development',
  envPrefix: 'DODO_',
  // publicDir: '', // relative to root
  build: {
    outDir: '../dist',
    assetsDir: 'dodoApp/assets',
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        act: resolve(__dirname, 'src/dodoApp/index.html')
      }
    }
  },
  server: {
    host: '127.0.0.1',
    port: 9887,
    strictPort: true,
    https: false,
    cors: false,
    open: false,
    hmr: true
  }
});
