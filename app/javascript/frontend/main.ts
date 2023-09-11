import { createApp } from 'vue'
import { AppContext } from "@/types"

const ctx = { handleErrors: [] } as AppContext
const app = ctx.app = createApp({})

app.component("AppTemplate", {
  errorCaptured: (err, vm, info) => {
    for (const handleErrors of ctx.handleErrors) {
      if (handleErrors(err) === false) {
        return false
      }
    }
  },
  template: `
    <router-view v-slot="{ Component }">
      <component :is="Component">
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData"><slot :name="name" v-bind="slotData" /></template>
      </component>
    </router-view>
  `,
})

import * as initializers from "./initializers"
for (const key in initializers) {
  const initializer = initializers[key as keyof typeof initializers]
  initializer(ctx)
}

app.mount('#app')