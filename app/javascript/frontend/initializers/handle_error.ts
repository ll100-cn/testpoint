import { usePageStore } from '@/store'
import { AppContext } from '@/types'

function handleError(err, ctx: AppContext) {
  const store = usePageStore()
  store.errors.push(err)

  if (import.meta.hot) {
    import.meta.hot.on("vite:afterUpdate", () => {
      store.clear()
    })
  }

  console.error(err)
}

export default function(ctx: AppContext) {
  // ctx.router.onError((error) => {
  //   handleError(error, ctx)
  // })

  // ctx.app.config.errorHandler = (error, vm, info) => {
  //   handleError(error, ctx)
  // }
}
