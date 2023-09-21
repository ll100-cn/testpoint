import { reactive } from "vue"
import { Validations } from "./simple_form"

export class Actioner<T extends any[]> {
  confirm_text = "确定操作？"
  processing = false
  validations = reactive(new Validations())

  async perform(callback: () => Promise<void>) {
    if (!confirm(this.confirm_text)) {
      return
    }

    this.validations.clear()
    this.processing = true

    try {
      await callback()
    } catch(e) {
      if (this.validations.handleError(e)) {
        return
      }

      throw e
    } finally {
      this.processing = false
    }
  }

  static build<T extends any[]>(props: Partial<Pick<Actioner<T>, 'confirm_text'>> = {}) {
    const result = reactive(new Actioner())
    Object.assign(result, props)
    return result
  }
}
