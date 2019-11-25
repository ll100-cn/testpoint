import $ from 'jquery'
import { Controller } from "stimulus"

export default class extends Controller {
  active(event) {
    const item = $(event.target)
    $(this.element).find(".active").not(item).removeClass('active')
    item.addClass('active')
  }
}
