import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
;
// add Prettier support
import prettierConfig from 'eslint-plugin-prettier/recommended';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig, // extend ESLint with Prettier config
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: { // add Prettier rules
      'prettier/prettier': [
        'error',
        {
          semi: true,
          trailingComma: "es5",
          singleQuote: false,
          printWidth: 100,
          tabWidth: 2,
          endOfLine: "auto"
        }],
    },
  },
]);
