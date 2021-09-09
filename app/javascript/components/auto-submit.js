import $ from 'jquery'

$(document).on('content:loaded', function(event) {
  $(event.target).find('form.auto-submit').each(function() {
    $(this).on("change", function() {
      if (!$(this).data("auto-submitting")) {
        $(this).data("auto-submitting", 1)
        $(this).submit()
      }
    })
  })
})

$(document).on('ajax:error ajax:success', 'form.auto-submit', function(event) {
  $(this).removeData("auto-submitting")
})

