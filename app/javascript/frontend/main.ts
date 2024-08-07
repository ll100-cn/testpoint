import '$vendor/ui/main.css'

// import '../bootstrap-ext'
import '../widgets/fontawesome'
// import '../widgets/treeview'
import '../widgets/fancybox'
import '../widgets/stimulus'
import '../widgets/old'
import '../widgets/styles'
import '../widgets/bootstrap-select'

import '@vue-flow/core/dist/style.css';
// import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css'

import { createApp } from 'vue'
import App from "./App.vue"

const app = createApp(App)

import * as initializers from "./initializers"

for (const key in initializers) {
  const initializer = initializers[key as keyof typeof initializers]
  initializer(app)
}

app.mount('#app')
