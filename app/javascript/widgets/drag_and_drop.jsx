import $ from 'jquery'

$(function() {
  $(document).find('#uploadAttachmentsModal').on('dragstart drag dragenter dragexit dragleave dragover dragend drop', function(event) {
    event.preventDefault()
    event.stopPropagation()
  }).on('dragenter dragover', function(event) {
    const $targetArea = $(event.currentTarget)
    $targetArea.find('#dropArea').removeClass("border-secondary").addClass("border-success")
  }).on('dragleave', function(event) {
    const $targetArea = $(event.currentTarget)
    $targetArea.find('#dropArea').removeClass("border-success").addClass("border-secondary")
  }).on('drop', function(event) {
    const $targetArea = $(event.currentTarget)
    $targetArea.find('#dropArea').removeClass("border-success").addClass("border-secondary")

    const requestParams = $targetArea.data()
    const files = event.originalEvent.dataTransfer.files

    if (files.length >= 1) {
      uploadAttachment($targetArea.find('.modal-body'), files[0], requestParams)
    }
  })
})

function uploadAttachment(target, file, { url, method }) {
  const formData = new FormData()
  formData.append('attachment[file]', file)

  $.ajax({
    url,
    method,
    dataType: 'html',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false
  }).done(function(respond) {
    target.append(respond)
  })
}
