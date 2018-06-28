import $ from 'jquery'

import 'select2'
import 'select2/dist/css/select2.css'
import './select2.scss'

$(document).on('content:loaded', function(event) {
  $(event.target).find('.select2-field').each(function() {
    $(this).select2()
  })
})
