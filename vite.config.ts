import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';

const githubPagesEntry = [
  'video', 'song', 'wishes', 'meet', 'arts', 'fanfic',
  'signatures', 'fans', 'archives', 'prize', 'credit',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: githubPagesEntry.map(r => ({
        src: 'docs/index.html',
        dest: r,
      }))
    })
  ],
  build: {
    outDir: './docs',
  },
})
