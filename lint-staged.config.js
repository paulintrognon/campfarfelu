module.exports = {
  // Run type-check on changes to Front's TypeScript files
  'api/**/*.ts?(x)': () => 'yarn type-check:api',
  // Run type-check on changes to Front's TypeScript files
  'front/**/*.ts?(x)': () => 'yarn type-check:front',
  // Run type-check on changes to BO's TypeScript files
  'bo/**/*.ts?(x)': () => 'yarn type-check:bo',
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': (filenames) => `yarn lint ${filenames.join(' ')}`,
}
