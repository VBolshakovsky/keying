import { defineConfig } from 'tsup';

export default defineConfig(options => ({
    entry: ['src/index.ts'],
    outDir: 'dist',
    format: ['cjs', 'esm'],
    target: 'esnext', //'es2020'
    sourcemap: true,
    clean: true,
    dts: true,
    splitting: true,
    minify: !options.watch,
    //external: ['axios'],
  }));
  