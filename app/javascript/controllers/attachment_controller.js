import $ from 'jquery'
import { Controller } from "stimulus"
import './attachment_style.scss'
import _ from 'lodash'

export default class extends Controller {
  static targets = [ 'container' ]
  connect() {
    $(this.element)
      .on('dragenter', this.enterHighlight.bind(this))
      .on('dragleave', this.leaveHighlight.bind(this))
      .on('drop dragover', function(event) {
        event.preventDefault()
        event.stopPropagation()
      })
      .on('drop', this.drop.bind(this))
  }
  enterHighlight() {
    $(this.element).addClass('highlight')
  }
  leaveHighlight() {
    $(this.element).removeClass('highlight')
  }
  drop(event) {
    this.leaveHighlight()
    const { files } = event.originalEvent.dataTransfer

    _.each(files, file => {
      this.upload(file)
    })
  }
  upload(file) {
    const url = $(this.element).data('url')
    const name = $(this.element).data('name')
    const formData = new FormData()
    formData.append(name, file)
    $(this.containerTarget).append(`${file.name}`)
    $.ajax({
      url,
      method: "POST",
      contentType: false,
      dataType: 'html',
      data: formData,
      enctype: 'multipart/form-data',
      processData: false
    }).done(function(respond) {
      $(this.element).before(respond)
    })
  }
}
