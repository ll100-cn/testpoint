import { useSessionStore } from '@/store/session'

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()
  const session = useSessionStore()

  await session.prepare(nuxtApp.vueApp.config.globalProperties)

  if (session.account == null) {
    return navigateTo('/login', { replace: true })
  }

  return navigateTo('/dashboard/issues', { replace: true })
})
