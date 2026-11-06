import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync } from 'fs';

await esbuild.build({
  entryPoints: ['entry.tsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.woff2': 'file'
  },
  assetNames: '[name]-[hash]',
  jsx: 'automatic',
  minify: true,
  target: 'es2020',
  logLevel: 'info'
});

mkdirSync('dist', { recursive: true });
copyFileSync('index.html', 'dist/index.html');
copyFileSync('src/photos/air-mark.png', 'dist/favicon.png');
console.log('dist/ ready');
