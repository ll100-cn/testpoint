// import '$vendor/ui/main.css'

import '../bootstrap-ext'
import '../widgets/fontawesome'
import '../widgets/treeview'
import '../widgets/fancybox'
import '../widgets/stimulus'
import '../widgets/old'
import '../widgets/styles'
import '../widgets/bootstrap-select'



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
