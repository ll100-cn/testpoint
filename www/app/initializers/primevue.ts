import PrimeVue from 'primevue/config'
import { type App } from 'vue'

export default function(app: App) {
  app.use(PrimeVue, {
    unstyled: true,
  })
}

