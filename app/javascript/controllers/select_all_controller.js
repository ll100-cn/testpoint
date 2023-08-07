import { Controller } from 'stimulus'
import _ from 'lodash'

export default class extends Controller {
  static targets = ['handle', 'item']

  items() {
    return _.filter(this['itemTargets'], ['disabled', false])
  }

  checkedItemsCount() {
    return _.filter(this.items(), 'checked').length
  }

  toggleAll(event) {
    event.preventDefault()

    for (const item of this.items()) {
      if (item.checked != this['handleTarget'].checked) {
        setTimeout(() => {
          item.click()
        }, 0)
      }
    }

  }

  toggle() {
    this['handleTarget'].checked = this.items().length === this.checkedItemsCount()
  }
}
