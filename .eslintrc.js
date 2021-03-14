// .eslintrc.js
module.exports = {
  root: true,
  env: { node: true, es6: true },

  // to enable features such as async/await
  parserOptions: {
    ecmaVersion: 2018,
  },

  // We want to lint .prettierrc.js (ignored by default by eslint)
  ignorePatterns: ['!.prettierrc.js'],

  // We extends eslint recommended rules
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  // Enforce prettier rules
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },

  overrides: [
    /**
     * TypeScript Files
     */
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        // Why would you want unused vars?
        '@typescript-eslint/no-unused-vars': ['error'],

        // We require return types on functions only where really useful
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
      },
    },

    /**
     * React Files
     */
    {
      files: ['**/*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: { react: { version: 'detect' } },
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      rules: {
        // We will use TypeScript's types for component props instead
        'react/prop-types': 'off',

        // No need to import React when using Next.js
        'react/react-in-jsx-scope': 'off',
      },
    },

    /**
     * Test files
     */
    {
      files: ['**/*.spec.ts', '**/*.test.ts'],
      env: { jest: true },
    },
  ],
}
