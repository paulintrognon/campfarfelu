// .eslintrc.js
module.exports = {
  extends: '../.eslintrc.js',

  env: { browser: true, node: true, es6: true },

  overrides: [
    {
      files: ['**/*.tsx'],
      extends: ['plugin:jsx-a11y/recommended'],
      rules: {
        // This rule is not compatible with Next.js's <Link /> components
        'jsx-a11y/anchor-is-valid': 'off',
      },
    },
  ],
}
