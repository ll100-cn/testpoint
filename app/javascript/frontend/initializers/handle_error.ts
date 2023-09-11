import { useSessionStore } from '@/store'
import { ErrorAccessDenied, ErrorUnauthorized } from '@/requests'
import { AppContext } from '@/types'
import { type Router } from 'vue-router'

function handleError(err, ctx: AppContext) {
  const router = ctx.router as Router
  const store = useSessionStore()

  store.error = err

  if (err instanceof ErrorAccessDenied) {
    router.push({
      path: "/error",
      query: {
        status: 403,
      },
    })
  } else if (err instanceof ErrorUnauthorized) {
    router.push({
      path: "/error",
      query: {
        status: 401,
      },
    })
  } else {
    if (import.meta.env.MODE !== 'development') {
      router.push({
        path: "/error",
      })
    }
  }

  console.error(err)
}

export default function(ctx: AppContext) {
  ctx.router.onError((error) => {
    handleError(error, ctx)
  })

  ctx.app.config.errorHandler = (error, vm, info) => {
    handleError(error, ctx)
  }
}
