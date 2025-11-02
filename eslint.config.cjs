// eslint.config.cjs
const js = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module', // tu peux mettre 'script' si tu n'utilises pas import/export
      globals: globals.node,
    },
    plugins: { js },
    ...js.configs.recommended,
    rules: {
      ...prettier.rules,
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];
