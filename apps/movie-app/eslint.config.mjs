import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    ignores: ['webpack.config.js', 'node_modules/', 'dist/'],
  },
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-extra-boolean-cast': 'off',
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: false, prefix: '@', rootDir: 'src' },
      ],
      'arrow-body-style': ['error', 'as-needed'],
    },
  },
];
