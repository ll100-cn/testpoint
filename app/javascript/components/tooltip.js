import $ from 'jquery';
import { Tooltip } from 'bootstrap';

$(document).on('content:loaded', function() {
  $('[data-bs-toggle="tooltip"]').each(function() {
    new Tooltip(this);
  });
});
