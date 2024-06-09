/* eslint-disable require-jsdoc */
import { ofetch } from 'ofetch'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtPlugin((_nuxtApp) => {
  const loader = useLoader()
  globalThis.$fetch = ofetch.create({
    async onRequest() {
      loader.value = true
    },
    async onResponse() {
      loader.value = false
    },
    async onRequestError() {
      // @todo
      loader.value = false
    },
    async onResponseError() {
      loader.value = false
    },
  })
})
