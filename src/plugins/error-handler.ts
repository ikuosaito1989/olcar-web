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
const report = async (error: Error) => {
  const runtimeConfig = useRuntimeConfig()
  await $fetch(runtimeConfig.slackHookUrl, {
    method: 'POST',
    body: {
      text: `${error.message}
        ${error.stack}`,
    },
  })
}
