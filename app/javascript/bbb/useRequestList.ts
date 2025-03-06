// SNIP: 4d42436ba7cc1fb8a3500e3b65f791af
import type { BaseRequest, RequestContext } from "./BaseRequest"
import { PerformerList, Performer, type Performable } from "./PerformerList"
import { getCurrentInstance, onBeforeUnmount } from "vue"
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router"

export class RequestList extends PerformerList {
  ctx: RequestContext

  constructor(ctx: RequestContext) {
    super()
    this.ctx = ctx
  }

  raw<R extends BaseRequest<any>>(request: R) {
    type T = Awaited<ReturnType<R['request']>>

    const that = this
    const requestable = {
      setup(callback) {
        request.setup(that.ctx, callback as any)
      },

      invoke(...args) {
        return new Promise((resolve, reject) => {
          const subscription = request.perform(...args).subscribe({
            next: data => resolve(data),
            error: err => reject(err),
          })

          that.subscriptions.push(subscription)
        })
      },
    } satisfies Performable<T>

    const performer = new Performer<T, R, Performable<T>>(requestable)
    this.performers.push(performer)
    return performer
  }

  add<K extends new (...args: any[]) => BaseRequest<any>>(Klass: K, ...args: ConstructorParameters<K>) {
    type T = Awaited<ReturnType<InstanceType<K>['request']>>
    const request = new Klass(...args)
    return this.raw(request) as Performer<T, InstanceType<K>, Performable<T>>
  }
}

export default function({ disposeOnRoute = true as boolean, disposeOnUnmount = true as boolean } = { }) {
  const proxy = getCurrentInstance()!.proxy!
  const reqs = new RequestList({ $axios: proxy.$axios })
  const route = useRoute()

  if (disposeOnRoute) {
    onBeforeRouteLeave(() => {
      reqs.reset()
    })

    onBeforeRouteUpdate(() => {
      reqs.reset()
    })
  }

  if (disposeOnUnmount) {
    onBeforeUnmount(() => {
      reqs.reset()
    })
  }

  return reqs
}
