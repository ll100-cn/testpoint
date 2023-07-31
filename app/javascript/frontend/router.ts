import { createRouter, createWebHistory } from "vue-router"
import autoRoutes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'
import * as _ from 'lodash'

const RouterLayout = createRouterLayout((layout) => {
  return import(`./layouts/${layout}.vue`)
})

const routes = autoRoutes.map(route => {
  const item = _.clone(route)
  item.path = route.path.replace(/[?]$/, '')
  return item
})

const base = process.env.RAILS_RELATIVE_URL_ROOT || '/'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: base,
    component: RouterLayout,
    children: routes
  }]
})

console.log(routes)

export default router