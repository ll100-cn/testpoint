
import { usePageStore, useSessionStore } from "@/store"
import { AppContext } from "@/types"
import _ from "lodash"

export default function({ app }: AppContext) {
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
    const project_id = _.toNumber(params.project_id)

    if (project_id == null) {
      return
    }

    await session.prepareProject(project_id, app.config.globalProperties)
  })
}
