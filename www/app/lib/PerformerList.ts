// SNIP: 4d42436ba7cc1fb8a3500e3b65f791af
import { type Unsubscribable } from "rxjs"
import { ref, type Ref } from "vue"

export interface Performable<T> {
  setup<R>(callback?: (that: R) => void): void
  invoke(...args: any[]): Promise<T>
}

export class Performer<T, R, W extends Performable<T>> {
  request!: W
  result!: Ref<T>
  performed = false
  performCallbacks = [] as (() => void)[]

  constructor(requestable: W) {
    this.request = requestable
    this.result = ref(undefined!)
  }

  setup(callback?: (that: R) => void) {
    this.request.setup(callback)
    return this
  }

  wait(): Ref<T> {
    return this.result
  }

  waitFor(ref: Ref<T | null> | Ref<T>) {
    if (this.performed) {
      ref.value = this.result.value
    } else {
      this.performCallbacks.push(() => {
        ref.value = this.result.value
      })
    }
    return this
  }

  async perform(...args: Parameters<W['invoke']>) {
    if (this.performed) {
      return this.result.value
    }

    this.performed = true
    this.result.value = await this.request.invoke(...args)
    for (const callback of this.performCallbacks) {
      callback()
    }
    this.performCallbacks = []
    return this.result.value
  }
}

export class PerformerList {
  subscriptions: Unsubscribable[] = []
  performers: Performer<any, any, any>[] = []

  async performAll() {
    const promises = this.performers.map(it => it.perform())
    this.performers = []
    await Promise.all(promises)
  }

  reset() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe()
    }
    this.subscriptions = []
    this.performers = []
  }
}
