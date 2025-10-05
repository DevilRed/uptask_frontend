import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default [
  globalIgnores(['dist']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.strict,      // Enable for stricter linting.
  // ...tseslint.configs.stylistic,   // Enable for code style rules.
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  prettier,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: 2022, sourceType: "module" },
    },
    plugins: {},
    rules: {
      // Custom TS rules
      "@typescript-eslint/no-non-null-assertion": "off",
    }
  },
  {
    ignores: ["node_modules/**","build/**"],
  },
]