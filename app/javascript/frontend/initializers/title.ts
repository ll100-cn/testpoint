
import { usePageStore } from "@/store"
import { App, watch } from "vue"

export default function(app: App) {
  const router = app.config.globalProperties.$router
  const page = usePageStore(app.config.globalProperties.$pinia)

  watch(page.meta, (meta) => {
    document.title = meta.title ?? 'TestPoint'
  })

  router.beforeEach((to, from) => {
    page.meta.title = to.meta.title?.toString() ?? null
  })
}
