/**
 * メンテナンス画面へ遷移する
 */
export default defineNuxtRouteMiddleware((to) => {
  const maintenanceMode = false

  if (!maintenanceMode && to.path === '/maintenance') {
    return abortNavigation(createError({ statusCode: 404, statusMessage: 'Not Found' }))
  }

  if (maintenanceMode && to.path !== '/maintenance') {
    return navigateTo('/maintenance')
  }
})
