import $ from 'jquery'

import 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/l10n'

import ConfirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
import 'flatpickr/dist/plugins/confirmDate/confirmDate.css'

import SelectTodayPlugin from './selectToday'
import './selectToday.scss'

$(document).on('content:loaded', function(event) {
  $(event.target).find('.datetime-picker').each(function() {
    $(this).flatpickr({
      enableTime: true,
      wrap: true,
      allowInput: true,
      plugins: [new SelectTodayPlugin(), new ConfirmDatePlugin()]
    })
  })
})
