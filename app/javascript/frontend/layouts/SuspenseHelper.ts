import { RxInterruptedError } from "@/lib/RxSimple"
import { reactive } from "vue"

export default class SuspenseHelper {
  state: 'pending' | 'resolve' | 'fallback'
  revisions = new Map<string, number>()
  pageId: () => string

  constructor(pageId: () => string) {
    this.state = 'pending'
    this.pageId = pageId
  }

  pageRevision(pageId: string) {
    return this.revisions.get(pageId) ?? 0
  }

  key() {
    const id = this.pageId()
    const revision = this.pageRevision(id)
    return JSON.stringify({ pageId: id, pageRevision: revision })
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

  handleError(err: unknown) {
    const currentId = this.pageId()

    setTimeout(() => {
      const newValue = this.pageRevision(currentId) + 1
      this.revisions.set(currentId, newValue)
    }, 0)

    if (err instanceof RxInterruptedError) {
      return false
    }
  }

  static build(...args: ConstructorParameters<typeof SuspenseHelper>) {
    const instance = reactive(new SuspenseHelper(...args))
    return instance as SuspenseHelper
  }
}
