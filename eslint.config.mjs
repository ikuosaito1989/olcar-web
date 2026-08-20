import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginJsdoc from 'eslint-plugin-jsdoc'
import pluginVue from 'eslint-plugin-vue'
import pluginTailwindcss from 'eslint-plugin-tailwindcss'
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import vueParser from 'vue-eslint-parser'

export default [
  {
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**', 'app/utils/**', 'public/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  pluginTailwindcss.configs.recommended,
  pluginPrettierRecommended,
  {
    plugins: {
      jsdoc: pluginJsdoc,
    },
    languageOptions: {
      // ref. https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    settings: {
      tailwindcss: {
        cssConfigPath: './app/css/tailwind.css',
      },
    },
    // add your custom rules here
    rules: {
      'no-undef': 'off',
      'no-var': 'error',
      'no-console': 'warn',
      'prefer-const': 'error',
      // eslint 本体から require-jsdoc が削除されたため eslint-plugin-jsdoc で代替
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            // eslint 本体の require-jsdoc と挙動を揃えるため
            // 変数宣言に代入されたアロー関数のみを対象にする
            ArrowFunctionExpression: false,
            FunctionExpression: true,
          },
          contexts: ['VariableDeclarator > ArrowFunctionExpression'],
        },
      ],
      'vue/multi-word-component-names': 'off',
      // eslint-plugin-vue v10 で component-tags-order は block-order に統合
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/define-macros-order': ['error'],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'prefer-template': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'max-lines': ['error', 300],
    },
  },
]
