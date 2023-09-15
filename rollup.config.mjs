import fs from 'node:fs';
import { resolve, basename } from 'node:path';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';

const configs = [];

const externals = [];

const iifeGlobals = {};

const postcssCommon = {
  plugins: [
    url({
      url: 'inline',
      maxSize: 100,
      fallback: 'copy'
    })
  ]
};

const packages = fs
  .readdirSync('packages', { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => resolve('packages', d.name));

for (const packagePath of packages) {
  const output = [];
  const packageName = basename(packagePath);
  const iifeName = `-${packageName}`.replace(/-./g, s => s[1].toUpperCase());

  const postcssPlugin = [
    postcss({
      extract: resolve(packagePath, `dist/${packageName}.css`),
      ...postcssCommon
    })
  ];

  output.push({
    file: resolve(packagePath, `dist/${packageName}.mjs`),
    format: 'es'
  });

  output.push({
    file: resolve(packagePath, `dist/${packageName}.cjs`),
    format: 'cjs'
  });

  output.push({
    file: resolve(packagePath, `dist/${packageName}.iife.js`),
    format: 'iife',
    name: iifeName,
    extend: true,
    globals: iifeGlobals
  });

  output.push({
    file: resolve(packagePath, `dist/${packageName}.iife.min.js`),
    format: 'iife',
    name: iifeName,
    extend: true,
    globals: iifeGlobals,
    plugins: [terser()]
  });

  configs.push({
    input: resolve(packagePath, 'src', 'index.js'),
    output,
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'bundled' }),
      ...postcssPlugin
    ],
    external: externals
  });
}

export default configs;
