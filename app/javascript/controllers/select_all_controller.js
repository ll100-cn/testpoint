import { Controller } from 'stimulus'
import $ from 'jquery'
import _ from 'lodash'

export default class extends Controller {
  static targets = ['handle', 'item', 'checkedItemsCount']

  items() {
    return _.filter(this['itemTargets'], ['disabled', false])
  }

  checkedItemsCount() {
    return _.filter(this.items(), 'checked').length
  }

  toggleAll() {
    $(this.items()).prop('checked', this['handleTarget'].checked)
    this.renderText()
  }

  toggle() {
    this['handleTarget'].checked = this.items().length === this.checkedItemsCount()
    this.renderText()
  }

  renderText() {
    if (this['hasCheckedItemsCountTarget']) {
      $(this['checkedItemsCountTarget']).html(this.checkedItemsCount())
    }
  }
}
