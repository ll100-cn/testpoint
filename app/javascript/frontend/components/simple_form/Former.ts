import { reactive } from "vue"
import Validations from "./Validations"

export default class Former<T> {
  validations = reactive(new Validations())
  submiting = false
  perform?: (event?: Event) => Promise<void>
  form: T

  constructor(form: T, callback?: (event?: Event) => Promise<void>) {
    this.form = form
    this.perform = callback
    this.submit = this.submit.bind(this)
  }

  async submit(event: Event) {
    this.validations.clear()
    this.submiting = true

    try {
      await this.perform?.(event)
    } catch(e) {
      if (this.validations.handleError(e)) {
        console.log(this.validations)
        return
      }

      throw e
    } finally {
      this.submiting = false
    }
  }

  static build<T>(form: T, callback?: () => Promise<void>) {
    return reactive(new Former(form, callback))
  }
}
