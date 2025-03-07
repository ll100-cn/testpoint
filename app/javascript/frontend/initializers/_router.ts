import { setupLayouts } from 'virtual:meta-layouts'
import { type App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const routes_with_layout = setupLayouts(routes)


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_RUBY_BASE ?? "/"),
  routes: routes_with_layout
})

export default function(app: App) {
  app.use(router)
}
