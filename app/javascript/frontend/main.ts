import { createApp } from 'vue'
import { AppContext } from "@/types"
import AppTemplate from "@/components/AppTemplate.vue"

const ctx = {} as AppContext
const app = ctx.app = createApp({})

app.component("AppTemplate", AppTemplate)

import * as initializers from "./initializers"
for (const key in initializers) {
  const initializer = initializers[key as keyof typeof initializers]
  initializer(ctx)
}

app.mount('#app')
