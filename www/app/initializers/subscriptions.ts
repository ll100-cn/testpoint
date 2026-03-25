import { Subscription } from "rxjs"
import { type App } from "vue"

export default function(app: App) {
  app.config.globalProperties.$subscriptions = []
  const router = app.config.globalProperties.$router

  router.beforeResolve((to, from) => {
    app.config.globalProperties.$subscriptions.reverse().forEach(subscription => {
      subscription.unsubscribe()
    })

    app.config.globalProperties.$subscriptions = []
  })
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $subscriptions: Subscription[]
  }
}
