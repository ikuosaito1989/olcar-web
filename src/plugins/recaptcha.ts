// ref. https://github.com/nuxt/nuxt/discussions/16223#discussioncomment-1933574
import { useRecaptchaProvider } from 'vue-recaptcha'
export default defineNuxtPlugin(() => {
  useRecaptchaProvider()
})
