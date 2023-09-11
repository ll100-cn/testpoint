import { AppContext } from "@/types";
import { Subscription } from "rxjs";
import { CanceledError } from "axios"

export default function({ app, router, handleErrors}: AppContext) {
  app.config.globalProperties.$subscriptions = []

  handleErrors.push(function(err) {
    if (err instanceof CanceledError) {
      return false
    }
  })

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
