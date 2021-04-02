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

  plugins: ['eslint-plugin-import', '@typescript-eslint', 'prettier'],

  // We extends eslint recommended rules
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],

  rules: {
    // Import order rules
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    // Enforce prettier rules
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
        // No unused variables
        '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],

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
