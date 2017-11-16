import $ from 'jquery'
import './all.scss'

$(document).on('content:loaded', function(event) {
  $(event.target).on('click', '.remove-attachment', function(event) {
    const $currentTarget = $(event.currentTarget)
    const $attachment = $($currentTarget.data('target'))

    $attachment.hide()
    $attachment.find('.destroy-task-attachment').val("1")
  })
})
