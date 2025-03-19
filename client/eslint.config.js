import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import queryPlugin from '@tanstack/eslint-plugin-query';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      reactPlugin.configs.flat.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      reactPlugin,
      queryPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-param-reassign': 'error',

      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',

      // '@typescript-eslint/no-unused-vars': 'warn',
      // '@typescript-eslint/no-unsafe-assignment': 'warn',
      // '@typescript-eslint/no-unsafe-return': 'warn',
      // '@typescript-eslint/no-explicit-any': 'warn'

      // 'react/prop-types': ['error'],
      // 'react/require-default-props': 'warn',
      // 'react/default-props-match-prop-types': 'warn',
      // 'react/no-unused-prop-types': 'warn',
      // 'react/prefer-exact-props': 'warn',
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],

      ...reactHooks.configs.recommended.rules,
    },
  },
);
