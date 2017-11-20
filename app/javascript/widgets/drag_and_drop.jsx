import $ from 'jquery'

$(function() {
  $(document).find('#uploadAttachmentsModal').on('dragstart drag dragenter dragexit dragleave dragover dragend drop', function(event) {
    event.preventDefault()
    event.stopPropagation()
  }).on('dragenter dragover', function(event) {
    const $targetArea = $(event.currentTarget)
    $targetArea.find('#uploadAttachmentArea').removeClass('border-white bg-light').addClass('border-secondary')
  }).on('dragleave', function(event) {
    const $targetArea = $(event.currentTarget)
    $targetArea.find('#uploadAttachmentArea').removeClass('border-secondary').addClass('border-white bg-light')
  }).on('drop', function(event) {
    const $targetArea = $(event.currentTarget)
    $targetArea.find('#uploadAttachmentArea').removeClass('border-secondary').addClass('border-white bg-light')

    const requestParams = $targetArea.data()
    const files = event.originalEvent.dataTransfer.files

    if (files.length >= 1) {
      uploadAttachment($targetArea.find('#uploadAttachmentArea'), files[0], requestParams)
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
    target.before(respond)
  })
}
