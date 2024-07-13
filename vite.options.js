import { resolve } from 'path';

export default {
  root: 'src',
  mode: 'development',
  publicDir: 'public', // relative to root
  build: {
    outDir: '../dist',
    assetsDir: 'options/assets', // place files in outDir/assetsDir -> dist/options
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        opt: resolve(__dirname, 'src/options/opt.html')
      }
    }
  },
  server: {
    host: '127.0.0.1',
    port: 9889,
    strictPort: true,
    https: false,
    cors: false,
    open: false,
    hmr: true
  }
};
