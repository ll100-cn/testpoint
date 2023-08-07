import { App } from "vue"
import { Router } from "vue-router"

export interface AppContext {
  app: App<Element>
  router: Router
  handleErrors: ((err: any) => boolean | null)[]
}
