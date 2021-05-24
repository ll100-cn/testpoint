import $ from 'jquery';

document.addEventListener('show.bs.modal', function(event) {
  const $trigger = $(event.relatedTarget);
  const url = $trigger.data('url');
  if (url) {
    const $modal = $(event.target);
    $modal.find('.modal-content').load(url, function() {
      $modal.trigger('content:loading');
      $modal.trigger('content:loaded');
    });
  }
});
