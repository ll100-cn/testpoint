import type { App } from 'vue'
import type { AxiosInstance } from 'axios'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'

interface MyMeta extends Record<string, unknown> {
  axios: AxiosInstance
}

declare module '@tanstack/vue-query' {
  interface Register {
    queryMeta: MyMeta
    mutationMeta: MyMeta
  }
}

export default function(app: App) {
  const options = {
    queryClientConfig: {
      defaultOptions: {
        mutations: {
          meta: {
            axios: app.config.globalProperties.$axios
          }
        },
        queries: {
          retry: false,
          staleTime: 10 * 60 * 1000,
          gcTime: 30 * 60 * 1000,
          meta: {
            axios: app.config.globalProperties.$axios
          }
        }
      }
    }
  } satisfies VueQueryPluginOptions

  app.use(VueQueryPlugin, options)
};

