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
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/prettier',
    'plugin:bus-stuff/recommended',
  ],
  rules: {
    'bus-stuff/no-index-only-key': 'error',
    'no-dupe-keys': 'error',
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': [
      'warn',
      {
        properties: 'never',
      },
    ],
    'vue/comma-dangle': ['warn', 'only-multiline'],
    'vue/component-name-in-template-casing': 'error',
    'vue/custom-event-name-casing': [
      'error',
      'kebab-case',
      {
        ignores: [],
      },
    ],
    'vue/dot-location': ['error', 'property'],
    'vue/eqeqeq': 'error',
    'vue/key-spacing': 'error',
    'vue/keyword-spacing': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-properties': 'error',
    'vue/no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/no-deprecated-scope-attribute': 'error',
    'vue/no-empty-pattern': 'error',
    'vue/no-static-inline-styles': [
      'error',
      {
        allowBinding: true,
      },
    ],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/padding-line-between-blocks': ['warn', 'always'],
    'vue/prefer-separate-static-class': 'warn',
    'vue/prefer-template': 'error',
    'vue/prefer-true-attribute-shorthand': 'warn',
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': 'error',
    'vue/v-on-function-call': 'error',
    'vue/require-v-for-key': 'error',
    'vue/no-v-html': 'off',
    'vue/valid-v-slot': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
}
