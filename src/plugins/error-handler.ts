/* eslint-disable @typescript-eslint/no-unused-vars */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // console.error('nuxtApp.vueApp.config.errorHandler')
  }

  // Also possible
  nuxtApp.hook('vue:error', (error, instance, info) => {
    // console.error('nuxtApp.hook')
  })
})
