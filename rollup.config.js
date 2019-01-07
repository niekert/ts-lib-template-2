import nodeResolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import commonJs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const basePlugins = [
  nodeResolve({
    extensions: ['.ts', '.tsx'],
  }),
  sourceMaps(),
  babel({
    extensions: ['.ts', '.tsx'],
  }),
  commonJs({
    ignoreGlobal: true,
    extensions: ['.js', '.ts', '.tsx'],
  }),
];

const baseConfig = {
  input: 'src/index.ts',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};

export default [
  {
    ...baseConfig,
    plugins: [...basePlugins, terser({ sourcemap: true })],
    output: [
      { file: `dist/${pkg.name}.es.min.js`, format: 'es' },
      { file: `dist/${pkg.name}.cjs.min.js`, format: 'cjs' },
    ],
  },
  {
    ...baseConfig,
    plugins: basePlugins,
    output: [
      { file: `dist/${pkg.name}.es.js`, format: 'es' },
      { file: `dist/${pkg.name}.cjs.js`, format: 'cjs' },
    ],
  },
];
