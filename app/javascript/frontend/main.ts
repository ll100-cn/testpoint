import '$vendor/ui/main.css'

import '../vendor/fontawesome'
import '../vendor/fancybox'
import '../vendor/stimulus'
import '../vendor/old'

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
