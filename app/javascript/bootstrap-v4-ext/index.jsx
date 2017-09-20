import $ from 'jquery'
import './all.scss'

$(document).on('content:loaded', function(event) {
  $(event.target).on('click', '.card-collapsed', function(event) {
    const target = $(this).data('target')
    if (event.target.nodeName !== 'A') {
      event.preventDefault()
      event.stopPropagation()
      $(target).collapse('toggle')
    }
  })
})
