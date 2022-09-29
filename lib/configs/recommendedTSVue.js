module.exports = {
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 6,
    },
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
  plugins: ['bus-stuff', 'prettier', 'import'],
  extends: [
    'plugin:bus-stuff/@typescript-recommended',
    'plugin:bus-stuff/recommended-vue',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint',
  ],
  rules: {},
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
}
