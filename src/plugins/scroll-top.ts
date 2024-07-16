// ref. https://github.com/nuxt/nuxt/discussions/16223#discussioncomment-1933574
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    window.scrollTo(0, 0)
  })
})
