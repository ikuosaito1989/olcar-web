import type { NuxtError } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = async (error) => {
    await report(error as Error)
  }
  nuxtApp.hook('vue:error', async (error) => {
    await report(error as Error)
  })

  nuxtApp.vueApp.config.warnHandler = async (msg, _, trace) => {
    const error: Error = {
      name: '',
      message: msg,
      stack: trace,
    }
    await report(error as Error)
  }

  if (import.meta.client) {
    window.addEventListener('error', async (event) => {
      await report(event.error as Error)
    })
  }
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
