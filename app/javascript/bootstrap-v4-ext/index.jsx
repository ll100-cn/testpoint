import $ from 'jquery'
import './all.scss'

function removeAttachment(event) {
  const $currentTarget = $(event.currentTarget)
  const $attachment = $($currentTarget.data('target'))

  $attachment.hide()
  $attachment.find('.destroy-task-attachment').val('1')
}

$(document).on('content:loaded', function(event) {
  $(event.target).on('click', '.remove-attachment', removeAttachment)
})
