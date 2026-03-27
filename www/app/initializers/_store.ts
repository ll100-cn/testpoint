import { createPinia } from "pinia"
import { type App } from "vue"

const pinia = createPinia()

export default function(app: App) {
  app.use(pinia)
  app.config.globalProperties.$pinia = pinia
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $pinia: typeof pinia
  }
}