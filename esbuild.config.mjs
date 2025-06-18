import { build } from 'esbuild';

const production = process.argv.includes('production');

build({
  entryPoints: ['main.ts'],
  bundle: true,
  outfile: 'main.js',
  format: 'cjs',
  sourcemap: !production,
  minify: production,
  target: 'es2016',
  external: ['obsidian']
}).catch(() => process.exit(1));
