import { Validator } from "$ui/simple_form"
import { reactive } from "vue"

export class Actioner {
  confirm_text = "确定操作？"
  processing = false
  validations = reactive(new Validator())

  async confirm(text: boolean | string) {
    if (text === false) {
      return true
    }

    const confirm_text = text === true ? this.confirm_text : this.confirm_text
    return confirm(confirm_text)
  }

  async perform(callback: () => Promise<void>, config: { confirm_text: boolean | string } = { confirm_text: true }) {
    if (!await this.confirm(config.confirm_text)) {
      return
    }

    this.validations.clear()
    this.processing = true

    try {
      await callback()
    } catch (e) {
      this.validations.processError(e)
    } finally {
      this.processing = false
    }
  }

  static build<M>(props: Partial<Pick<Actioner, 'confirm_text'>> = {}) {
    const result = reactive(new Actioner())
    Object.assign(result, props)
    return result as Actioner & M
  }
}
