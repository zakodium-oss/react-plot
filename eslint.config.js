import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-config-zakodium/react';
import ts from 'eslint-config-zakodium/ts';
import unicorn from 'eslint-config-zakodium/unicorn';
import storybook from 'eslint-plugin-storybook';

export default defineConfig(
  globalIgnores([
    'lib',
    'node_modules',
    'playwright/.cache',
    'storybook-static',
  ]),
  ts,
  react,
  unicorn,
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
  ...storybook.configs['flat/recommended'],
);
