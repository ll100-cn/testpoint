import { defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule<{
  origin: string
}>({
  meta: { name: 'force-dev-cdn' },
  setup(options, nuxt) {
    if (!nuxt.options.dev) return
    nuxt.options.runtimeConfig.app.cdnURL = options.origin
  }
})
