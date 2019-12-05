import $ from 'jquery'
import { Controller } from "stimulus"

export default class extends Controller {
  active(event) {
    const folderItem = $(event.target)
    $(this.element).find(".active").not(folderItem).removeClass("active")
    folderItem.addClass("active")

    event.target.blur()
  }
}
