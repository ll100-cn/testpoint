import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:meta-layouts'
import { routes } from 'vue-router/auto/routes'
import { AppContext } from "@/types"

const routes_with_layout = setupLayouts(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_RAILS_RELATIVE_URL_ROOT ?? "/"),
  routes: routes_with_layout
})

export default function(ctx: AppContext) {
  ctx.app.use(router)
  ctx.router = router
}
