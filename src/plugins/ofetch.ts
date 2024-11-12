/* eslint-disable require-jsdoc */
import { ofetch } from 'ofetch'
import { report } from './error-handler'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtPlugin((_nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    async onRequestError({ error }) {
      await report(error!)
    },
    async onResponseError({ error }) {
      await report(error!)
    },
  })
})
