// SNIP: 4d42436ba7cc1fb8a3500e3b65f791af
import { KlassCache } from './KlassCache'
import { RxInterruptedError } from './RxSimple'
import type { BaseRequest } from './BaseRequest'
import type { Unsubscribable } from 'rxjs'
import { ref } from 'vue'

export default function() {
  const subscriptions = ref<Unsubscribable[]>([])
  const cache = new KlassCache<BaseRequest<any>>()

  return {
    cache,
    cleanup: () => {
      cache.clear()
      for (const subscription of subscriptions.value) { subscription.unsubscribe() }
      subscriptions.value = []
    },
    request: function<K extends new (...args: any[]) => BaseRequest<any>>(Klass: K, ...args: ConstructorParameters<K>) {
      return cache.build(Klass as any, () => {
        const request = new Klass(...args)

        request.onSubscribe = (observable) => {
          const subscription = observable.subscribe({
            error: (err) => {
              if (err instanceof RxInterruptedError) {
                // ignore continue request
              } else {
                cache.sweep(Klass, ...args)
              }
            },
          })

          subscriptions.value.push(subscription)
        }

        return request
      }, ...args) as InstanceType<K>
    }
  }
}
