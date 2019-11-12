import '@fancyapps/fancybox/dist/jquery.fancybox.css'
import '@fancyapps/fancybox/dist/jquery.fancybox.js'

$(document).on('beforeClose.fb', (_e, _instance, _slide) => {
  $(".fancybox-container").remove();
  return true;
});
