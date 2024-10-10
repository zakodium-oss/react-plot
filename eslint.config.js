import react from 'eslint-config-zakodium/react';
import ts from 'eslint-config-zakodium/ts';
import unicorn from 'eslint-config-zakodium/unicorn';

export default [
  {
    ignores: [
      'lib',
      'lib-esm',
      'node_modules',
      'playwright/.cache',
      'storybook-static',
    ],
  },
  ...ts,
  ...react,
  ...unicorn,
  {
    rules: {
      '@typescript-eslint/no-dynamic-delete': 'off',
      'import/namespace': 'off',
    },
  },
  {
    files: ['tests/**/*.test.tsx'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  },
];
