import { reactive } from "vue"
import Validations from "./Validations"

export default class Former<T> {
  validations = reactive(new Validations())
  submiting = false
  perform?: (...args: any[]) => Promise<void>
  form: T

  constructor(form: T, callback?: (...args: any[]) => Promise<void>) {
    this.form = form
    this.perform = callback
    this.submit = this.submit.bind(this)
  }

  async submit(...args: any[]) {
    this.validations.clear()
    this.submiting = true

    try {
      await this.perform?.(...args)
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
