import type { NuxtError } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = async (error) => {
    await report(error as Error)
  }
  nuxtApp.hook('vue:error', async (error) => {
    await report(error as Error)
  })
})

/**
 * slackに通知する
 *
 * @param error
 */
export const report = async (error: Error) => {
  if ((error as NuxtError)?.statusCode === 404) {
    return
  }
  const runtimeConfig = useRuntimeConfig()
  await $fetch(runtimeConfig.slackHookUrl, {
    method: 'POST',
    body: {
      text: `${error.message}
        ${error.stack}`,
    },
  })
}
