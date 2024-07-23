
import { usePageStore, useSessionStore } from "@/store"
import _ from "lodash"
import { App } from "vue"

export default function(app: App) {
  const router = app.config.globalProperties.$router
  const session = useSessionStore(app.config.globalProperties.$pinia)
  const page = usePageStore(app.config.globalProperties.$pinia)

  router.beforeEach(async (to, from, next) => {
    await session.prepare(app.config.globalProperties)
    page.clear()

    if (to.meta.auth !== false && session.account == null) {
      next("/login")
    } else {
      next()
    }
  })

  router.beforeEach(async (to, from) => {
    const params = to.params as any

    if (params.project_id == null) {
      return
    }

    if (to.meta.profile === false) {
      return
    }

    const project_id = _.toNumber(params.project_id)
    await session.prepareProject(project_id, app.config.globalProperties)
  })
}
