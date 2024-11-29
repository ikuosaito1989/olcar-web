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
  const runtimeConfig = useRuntimeConfig()
  try {
    if ((error as NuxtError)?.statusCode === 404) {
      return
    }

    await $fetch(runtimeConfig.slackHookUrl, {
      method: 'POST',
      body: {
        text: `${error.message}
          ${error.stack}`,
      },
    })
  } catch {
    await $fetch(runtimeConfig.slackHookUrl, {
      method: 'POST',
      body: {
        text: 'エラーハンドリングでエラーになった',
      },
    })
  }
}
