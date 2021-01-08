import { Controller } from 'stimulus'
import $ from 'jquery'

export default class extends Controller {
  static targets = ['area']

  add(e) {
    e.preventDefault()

    const $target = $(e.target)
    const template = $target.data('template')

    // console.log(template)
    // console.log(this.areaTarget)
    const timestamp = new Date().getTime()

    const html = template.replace(new RegExp('TS', 'gm'), timestamp)
    $(this.areaTarget).append(html)
    // $tbody.children().last().trigger('content:loaded')
  }

  remove(e) {
    e.preventDefault()

    const target = $(e.target).data('target')
    console.log($(e.target))
    console.log($(e.target).closest(target))
    $(e.target).closest(target).remove()
  }
}
