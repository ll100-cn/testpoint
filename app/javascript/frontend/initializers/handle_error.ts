import { usePageStore } from '@/store'
import { AppContext } from '@/types'

export default function(ctx: AppContext) {
  ctx.router.onError((err) => {
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
