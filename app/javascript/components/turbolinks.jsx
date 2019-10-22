import $ from 'jquery';

require("turbolinks").start()


$(document).on('turbolinks:load', function(event) {
  const $element = $(event.target);
  $element.trigger('content:loading');
  $element.trigger('content:loaded');
});

if (Turbolinks.supported) {
  Turbolinks.start()
} else {
  $(function() {
    $(document).trigger('turbolinks:load')
  })
}
