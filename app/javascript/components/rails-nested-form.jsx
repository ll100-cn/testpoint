import $ from 'jquery';

$(document).on('content:loaded', function(event) {
  $(event.target).find('form').submit(function(event) {
    const railsEevent = $.Event(event)
    railsEevent.type = 'submit.rails'
    return $(this).trigger(railsEevent)
  })
})
