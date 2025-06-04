/**
 * メンテナンス画面へ遷移する
 */
export default defineNuxtRouteMiddleware((to) => {
  const maintenanceMode = false

  if (!maintenanceMode && to.path === '/maintenance') {
    return navigateTo('/')
  }

  if (maintenanceMode && to.path !== '/maintenance') {
    return navigateTo('/maintenance')
  }
})
