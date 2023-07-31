import { createApp, ref } from 'vue'
import router from './router'
import axios from '@/lib/axios'
import store from './store'

const app = createApp({
  template: "<RouterView></RouterView>",
  errorCaptured: (err, vm, info) => {
    if (err instanceof CanceledError) {
      return false
    }
  }
})

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $axios: typeof axios
  }
}
app.config.globalProperties.$axios = axios


import { Subscription } from "rxjs"
import { CanceledError } from "axios"
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $subscriptions: Subscription[]
  }
}
app.config.globalProperties.$subscriptions = []

router.beforeResolve((to, from) => {
  app.config.globalProperties.$subscriptions.reverse().forEach(subscription => {
    subscription.unsubscribe()
  })

  app.config.globalProperties.$subscriptions = []
})

app.use(router)
app.use(store)

app.mount('#app')