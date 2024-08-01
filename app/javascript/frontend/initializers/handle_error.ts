import { usePageStore } from '@/store'
import { type App } from 'vue'

export default function(app: App) {
  const router = app.config.globalProperties.$router

  router.onError((err) => {
    const store = usePageStore()
    store.errors.push(err)

    if (import.meta.hot) {
      import.meta.hot.on("vite:afterUpdate", () => {
        store.clear()
      })
    }

    console.error(err)
  })
}
