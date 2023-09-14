import { AppContext } from "@/types";
import { Subscription } from "rxjs";

export default function({ app, router}: AppContext) {
  app.config.globalProperties.$subscriptions = []

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
