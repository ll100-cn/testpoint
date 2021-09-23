import $ from 'jquery'
import 'bootstrap-select'
import 'bootstrap-select/dist/css/bootstrap-select.css'

$(document).on('content:loaded', function(event) {
  console.log(event.target)
  $(event.target).find('.selectpicker').selectpicker()
})