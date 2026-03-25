import { reactive } from "vue"

export default class SuspenseHelper {
  state: 'pending' | 'resolve' | 'fallback'

  constructor() {
    this.state = 'pending'
  }

  events() {
    return {
      onPending: () => {
        this.state = 'pending'
      },
      onResolve: () => {
        this.state = 'resolve'
      },
      onFallback: () => {
        this.state = 'fallback'
      }
    }
  }

  static build(...args: ConstructorParameters<typeof SuspenseHelper>) {
    const instance = reactive(new SuspenseHelper(...args))
    return instance as SuspenseHelper
  }
}
