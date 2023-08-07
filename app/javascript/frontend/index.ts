import { createApp } from 'vue'
import { AppContext } from "@/types"

const ctx = { handleErrors: [] } as AppContext
const app = ctx.app = createApp({})

app.component("app-template", {
  template: `
    <router-view v-slot="{ Component }">
      <component :is="Component">
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData"><slot :name="name" v-bind="slotData" /></template>
      </component>
    </router-view>
  `,
  errorCaptured: (err, vm, info) => {
    for (const handleErrors of ctx.handleErrors) {
      if (handleErrors(err) === false) {
        return false
      }
    }
  },
})

const context = require.context("@/initializers/", false, /initializers\/.+\.ts$/)
for (const path of context.keys()) {
  context(path).default(ctx)
}

app.mount('#app')
