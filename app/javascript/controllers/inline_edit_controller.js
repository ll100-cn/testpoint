import $ from 'jquery'
import { Controller } from "stimulus"

export default class extends Controller {
  replace() {
    const $element = $(this.element)
    this.originChildren = $($element.get(0).childNodes).detach()
    const html = $(this.element).data('template')
    $element.append(html)
    $(this.element).trigger('content:loaded')
  }

  restore() {
    const $element = $(this.element)
    $element.html(this.originChildren)
  }
}
