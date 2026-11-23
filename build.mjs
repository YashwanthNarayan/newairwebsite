import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync } from 'fs';

const shared = {
  bundle: true,
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
};

await esbuild.build({
  ...shared,
  entryPoints: ['entry.tsx'],
  outfile: 'dist/bundle.js'
});

await esbuild.build({
  ...shared,
  entryPoints: ['src/admin/entry.tsx'],
  outbase: 'src/admin',
  outfile: 'dist/admin.js'
});

mkdirSync('dist', { recursive: true });
copyFileSync('index.html', 'dist/index.html');
copyFileSync('admin.html', 'dist/admin.html');
copyFileSync('src/photos/air-mark.png', 'dist/favicon.png');
console.log('dist/ ready');
