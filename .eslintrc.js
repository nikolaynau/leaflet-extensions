module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  }
};
