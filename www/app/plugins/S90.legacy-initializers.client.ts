type InitializerModule = {
  default?: (app: any) => void
}

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp as any

  const modules = import.meta.glob('../initializers/*.ts', { eager: true }) as Record<string, InitializerModule>
  const files = Object.keys(modules).sort((left, right) => {
    return initializerOrder(left) - initializerOrder(right) || left.localeCompare(right)
  })

  for (const file of files) {
    if (file.endsWith('/_router.ts')) {
      continue
    }

    const initializer = modules[file].default
    initializer?.(app)
  }
})

function initializerOrder(file: string) {
  if (file.endsWith('/_store.ts')) return 0
  if (file.endsWith('/S01_axios.ts')) return 10
  if (file.endsWith('/S02_tanstack_query.ts')) return 20
  if (file.endsWith('/primevue.ts')) return 30
  if (file.endsWith('/auth.ts')) return 40
  if (file.endsWith('/handle_error.ts')) return 50
  if (file.endsWith('/subscriptions.ts')) return 60
  if (file.endsWith('/title.ts')) return 70
  return 100
}
