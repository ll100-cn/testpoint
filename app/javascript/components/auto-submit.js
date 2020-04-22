import $ from 'jquery'

$(document).on('content:loaded', function(event) {
  $(event.target).find('form.auto-submit').each(function() {
    $(this).on("change", function() {
      $(this).submit()
    })
  })
})
