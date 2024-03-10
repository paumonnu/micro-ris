import dotenv from 'dotenv';
dotenv.config({ path: `.env` });

import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const environment = process.env.NODE_ENV;
const terserPlugin = environment === 'production' ? terser() : null;

export default [
  {
    input: 'src/server.ts',
    cache: false,
    watch: {
      include: ['src/**', 'tests/**'],
      exclude: /node_modules/,
    },
    external: [/node_modules/],
    output: {
      file: './dist/server.js',
      format: 'es',
      sourcemap: environment !== 'production',
    },
    plugins: [nodeResolve(), typescript(), terserPlugin],
  },
];
