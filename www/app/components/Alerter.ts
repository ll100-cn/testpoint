import Validator from "$ui/simple_form/Validator"
import { reactive } from "vue"

export class Alerter {
  validator = new Validator()

  async perform<Args extends any[], Rst>(fn: (...args: Args) => Promise<Rst>, ...args: Args) {
    try {
      return await fn(...args)
    } catch (error) {
      if (this.validator.handleError(error)) {
        alert(this.validator.errorMessages([]).join("\n"))
        return
      }

      throw error
    }
  }

  static build() {
    return reactive(new Alerter())
  }
}