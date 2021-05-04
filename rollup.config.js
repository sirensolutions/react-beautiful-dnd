/* eslint-disable flowtype/require-valid-file-annotation */

import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import pkg from './package.json';

const input = './src/index.js';
const extensions = ['.js', '.jsx'];

// Treat as externals all not relative and not absolute paths
// e.g. 'react'
const excludeAllExternals = id => !id.startsWith('.') && !id.startsWith('/');

const getBabelOptions = ({ useESModules }) => ({
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime', { corejs: 2, useESModules }]],
});

export default [
  // CommonJS (cjs) build
  // - Keeping console.log statements
  // - All external packages are not bundled
  {
    input,
    output: { file: pkg.main, format: 'cjs' },
    external: excludeAllExternals,
    plugins: [
      json(),
      resolve({ extensions }),
      babel(getBabelOptions({ useESModules: false })),
    ],
  }
];
