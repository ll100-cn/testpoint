import '$presets/theme/main.css'

import '$vendor/fontawesome'
import '$vendor/fancybox'

import '@vue-flow/core/dist/style.css';
// import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css'
import './assets/style.css'

import { createApp } from 'vue'
import App from "./App.vue"

const app = createApp(App)

const initializers = import.meta.glob('./initializers/*.ts', { eager: true })
for (const initializer of Object.values(initializers)) {
  (initializer as any).default(app)
}

app.mount('#app')
