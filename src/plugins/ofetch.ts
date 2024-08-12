/* eslint-disable require-jsdoc */
import { ofetch } from 'ofetch'
import { report } from './error-handler'

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
    async onRequestError({ error }) {
      await report(error!)
      loader.value = false
    },
    async onResponseError({ error }) {
      await report(error!)
      loader.value = false
    },
  })
})
