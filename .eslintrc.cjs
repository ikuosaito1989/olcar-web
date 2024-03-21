module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['@typescript-eslint', 'tailwindcss'],
  // ref. https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  // add your custom rules here
  rules: {
    'no-undef': 'off',
    'no-var': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
}
