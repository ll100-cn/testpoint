import { createRouter, createWebHistory } from "vue-router"
import autoRoutes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'
import _ from 'lodash'
import { AppContext } from "@/types"

const RouterLayout = createRouterLayout((layout) => {
  return import(`@/layouts/${layout}.vue`)
})


const routes = _(autoRoutes).filter(route => {
  return !route.path.match(/[A-Z]+/)
}).map(route => {
  const item = _.clone(route)
  item.path = route.path.replace(/[?]$/, '')
  return item
}).value()

// import DefaultLayout from '@/layouts/default.vue'

console.log(routes)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: RouterLayout,
      children: routes
    },
    // {
    //   path: '/:path(.*)*',
    //   component: DefaultLayout,
    //   props: { default: true },
    // },
  ]
})


export default function(ctx: AppContext) {
  ctx.app.use(router)
  ctx.router = router
}
