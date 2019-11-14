import $ from 'jquery';

$(document).on('content:loaded', function() {
  $(event.target).find('[data-toggle="tooltip"]').click(function(event) {
    event.preventDefault();
  }).tooltip();
});
