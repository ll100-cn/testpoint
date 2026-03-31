import { defineNuxtModule } from 'nuxt/kit'

type ModuleOptions = {
  origin: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'force-dev-cdn',
  },
  defaults: {
    origin: '',
  },
  setup(options, nuxt) {
    if (!nuxt.options.dev) return

    const nuxtDevOrigin = options.origin.replace(/\/+$/, '')
    if (!nuxtDevOrigin) return

    nuxt.options.app.cdnURL = nuxtDevOrigin
    nuxt.options.runtimeConfig.app.cdnURL = nuxtDevOrigin
  },
})
