import $ from 'jquery'
import { Controller } from "stimulus"
import { replaceMarkdownTaskList, renderMarkdown } from "../components/showdown"

export default class extends Controller {
  static targets = [ "input", "view"]

  connect() {
    this.buildView()
    this.renderView()
    this.bindEvents()
  }

  disconnect() {
    $(this.viewElement).remove()
  }

  toggleTaskList(event) {
    const inputElement = this.findInputElement()
    const checkbox = event.target
    const newMark = checkbox.checked ? "[x]" : "[ ]"
    const currentPosition = parseInt(checkbox.dataset.position)

    inputElement.value = replaceMarkdownTaskList(inputElement.value, function(mark, position) {
      return currentPosition == position ? newMark : mark
    })

    $(inputElement).trigger("change")
  }

  buildView() {
    const inputElement = this.findInputElement()
    const nextElement = $(inputElement).next()
    const view = $("<div>").get(0)
    $(view).insertAfter(inputElement)
    this.viewElement = view
  }

  findInputElement() {
    return this.element
  }

  renderView() {
    const inputElement = this.findInputElement()
    const options = { checkbox: { readonly: inputElement.readOnly }}
    this.viewElement.innerHTML = renderMarkdown(inputElement.value, options)
  }

  bindEvents() {
    $(this.viewElement).on("change.tasklist", "input[type=checkbox][data-position]", this.toggleTaskList.bind(this))
  }
}
