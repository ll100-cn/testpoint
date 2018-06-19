import $ from 'jquery'
import { Controller } from "stimulus"
import './attachment_style.scss'
import _ from 'lodash'
import numbro from 'numbro'

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
      .on('drop', this.uploadByDrop.bind(this))
  }
  enterHighlight() {
    $(this.element).addClass('highlight')
  }
  leaveHighlight() {
    $(this.element).removeClass('highlight')
  }
  uploadByDrop(event) {
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

    const item = this.buildUploadItem(file)

    const progress = item.find('.upload-progress')
    const cancel = item.find('.upload-cancel')

    cancel.click(function(event) {
      event.preventDefault()
      if (item.xhr) {
        item.xhr.abort()
      }
      item.remove()
    })

    this.ajax({
      url: url,
      data: formData,
      beforeSend(xhr) {
        item.xhr = xhr
      },
      progress(event) {
        const percent = event.loaded / event.total
        progress.css("width", numbro(percent).format({output: "percent"}))
        item.find('.upload-size').text(numbro(percent * file.size).format({ output: "byte", base: "binary", mantissa: 2 }))
      },
      complete() {
        item.xhr = null
      },
      success(respond) {
        item.html(respond)
        item.trigger('content:loaded')
      },
      error(xhr) {
        item.html(xhr.responseText)
      }
    })
  }

  buildUploadItem(file) {
    let html = $(this.element).data('template')
    html = html.replace('${file_name}', file.name)
    html = html.replace('${file_size}', numbro(file.size).format({ output: "byte", base: "binary", mantissa: 2 }))

    const item = $(html)
    if (file.type.split('/')[0] === 'image') {
      item.find('.upload-image').loadImage(file)
    }

    item.appendTo(this.containerTarget)
    return item
  }

  ajax(settings) {
    const options = Object.assign({
      method: "POST",
      contentType: false,
      dataType: 'html',
      enctype: 'multipart/form-data',
      processData: false,
      xhr() {
        const xhr = $.ajaxSettings.xhr()
        xhr.upload.addEventListener("progress", this.progress.bind(this), false)
        return xhr
      }
    }, settings)
    $.ajax(options)
  }

  uploadByInput(event){
    const files = event.target.files
    _.each(files, file => {
      this.upload(file)
    })
    $(event.target).val('')
  }
}
