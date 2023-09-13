
import { useSessionStore } from "@/store/session"
import { AppContext } from "@/types"

export default function({ app }: AppContext) {
  const router = app.config.globalProperties.$router

  router.beforeEach(async (to, from, next) => {
    const session = useSessionStore(app.config.globalProperties.$pinia)
    await session.prepare(app.config.globalProperties)

    if (to.meta.auth !== false && session.account == null) {
      next("/login")
    } else {
      next()
    }
  })
}