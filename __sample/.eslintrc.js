module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    // "sourceType": "module"
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['dist', 'out', '.eslintrc*', 'webpack.config.js'],
  rules: {
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
  },
};
