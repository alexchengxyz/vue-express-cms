/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'no-unresolved': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
        },
        ImportDeclaration: 'never',
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    semi: ['error', 'always'],
    'import/extensions': ['error', 'always', {
      js: 'never',
      ts: 'never',
      vue: 'never',
      cjs: 'never',
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
      alias: {
        map: [['@', './src']],
      },
    },
  },
};
