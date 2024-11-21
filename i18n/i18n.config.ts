import ja from './locales/ja.json'
import en from './locales/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: ['en', 'ja'],
  messages: {
    ja,
    en,
  },
}))
