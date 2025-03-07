// SNIP: 4d42436ba7cc1fb8a3500e3b65f791af
import _ from "lodash"
import { defer, Subscription, type Observer, type Subscribable, type Unsubscribable } from "rxjs"
import { RxSimple } from "./RxSimple"

export abstract class DisposableRequest<T> {
  aborter = new AbortController()
  loading = true
  requestId = _.uniqueId('request-')

  simple!: RxSimple<T>
  activeSubscriptions = 0
  onSubscribe?: (observable: Subscribable<T>) => void

  abstract request(): Promise<T>

  subscribe(observer: Partial<Observer<T>>): Unsubscribable {
    this.activeSubscriptions += 1

    if (this.simple == null) {
      this.simple = new RxSimple<T>()
      this.onSubscribe?.(this)
      defer(() => this.request()).subscribe(this.simple)
    }

    const subscription = this.simple.subscribe(observer)

    return new Subscription(() => {
      subscription.unsubscribe()
      this.activeSubscriptions -= 1

      if (this.activeSubscriptions <= 0) {
        this.cancel()
      }
    })
  }

  abstract perform(data?: any): Subscribable<T>

  cancel() {
    if (!this.loading) {
      return
    }

    this.loading = false
    this.aborter.abort()
  }
}
