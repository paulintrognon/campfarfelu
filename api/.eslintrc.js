module.exports = {
  extends: '../.eslintrc.js',

  overrides: [
    /**
     * Controller Files
     */
    {
      files: ['**/*.controller.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'jsdoc/require-jsdoc': 'off',
      },
    },
  ],
}
