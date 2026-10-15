import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// npm run build          → dist/            the website (GitHub Pages). Relative paths, so it works under /placement-bible/.
// npm run build:artifact → dist-artifact/   one script with React left out, inlined by scripts/make-page.mjs into
//                                           artifact/placement-bible.html for the claude.ai version.
export default defineConfig(({ mode }) =>
  mode === 'artifact'
    ? {
        plugins: [react()],
        define: { 'process.env.NODE_ENV': '"production"' },
        build: {
          outDir: 'dist-artifact',
          emptyOutDir: true,
          cssCodeSplit: false,
          lib: { entry: 'src/main.tsx', name: 'PlacementBible', formats: ['iife'], fileName: () => 'app.js' },
          rollupOptions: {
            external: ['react', 'react-dom', 'react-dom/client'],
            output: { globals: { react: 'React', 'react-dom': 'ReactDOM', 'react-dom/client': 'ReactDOM' }, assetFileNames: 'app.[ext]' },
          },
        },
      }
    : {
        plugins: [react()],
        base: './',
        server: { port: 5173, host: true },
      },
);
