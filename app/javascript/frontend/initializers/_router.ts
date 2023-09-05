import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
import { AppContext } from "@/types"

const router = createRouter({
  history: createWebHistory(process.env.RAILS_RELATIVE_URL_ROOT),
  routes: [
    {
      path: "/",
      component: import("@/layouts/default.vue"),
      children: routes
    },
  ]
})

export default function(ctx: AppContext) {
  ctx.app.use(router)
  ctx.router = router
}
