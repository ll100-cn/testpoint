import $ from 'jquery'

import ClipboardJS from 'clipboard'

$(document).on('content:loaded', function(event) {
  $(event.target).find('.clipboard').each(function() {
    $(this).click(function(event) {
      event.preventDefault()
    })
    new ClipboardJS(this, {
      text(trigger) {
        return trigger.href
      }
    })
  })
})
