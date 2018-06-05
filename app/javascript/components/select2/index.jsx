import $ from 'jquery'

import 'select2'
import 'select2/dist/css/select2.css'
import './select2.scss'

$(document).on('content:loaded', function() {
  $('.select2-field').select2()
})
