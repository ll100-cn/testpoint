import { Validator } from "$ui/simple_form"
import { reactive } from "vue"

export class Actioner {
  processing = false
  validations = new Validator()

  async perform<Args extends any[], Rst>(callback: (...args: Args) => Promise<Rst>, ...args: Args) {
    this.validations.clear()
    this.processing = true

    try {
      return await callback(...args)
    } catch (e) {
      this.validations.processError(e)
    } finally {
      this.processing = false
    }
  }

  static build() {
    return reactive(new Actioner())
  }
}
