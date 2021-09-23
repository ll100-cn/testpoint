import $ from 'jquery'
import 'bootstrap-select'
import 'bootstrap-select/dist/css/bootstrap-select.css'

$(document).on('content:loaded', function(event) {
  $(event.target).find('.selectpicker').selectpicker()
})

$(document).on('turbolinks:before-cache', function(event) {
  $('.selectpicker').selectpicker('destroy').addClass("selectpicker")
})